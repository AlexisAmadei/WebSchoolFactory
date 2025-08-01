from flask import Flask, request, render_template_string, jsonify
import io, base64

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from fight_predictor import (
    load_data,
    latest_stats,
    train_model,
    predict_winner_ml
)
from charts import generate_comparison_charts

app = Flask(__name__)

df_model = load_data()
model, scaler = train_model(df_model)

@app.route('/')
def home():
    """
    Home page with a form to select two fighters for prediction.
    Returns:
        str: HTML content for the home page.
    """
    df = df_model
    fighters = sorted(set(df['r_fighter']).union(df['b_fighter']))
    options = "\n".join(f"<option value=\"{f}\">" for f in fighters)

    return render_template_string(f"""
    <h1>UFC Fight Predictor</h1>
    <form action='/predict_page' method='get'>
      <label>Fighter A:<br>
        <input list='fighters' name='fighter_a' required>
      </label><br><br>
      <label>Fighter B:<br>
        <input list='fighters' name='fighter_b' required>
      </label><br><br>
      <datalist id='fighters'>
        {options}
      </datalist>
      <button type='submit'>Predict</button>
    </form>
    """)

@app.route('/predict_page')
def predict_page():
    """
    Prediction page that displays the prediction results and charts.
    Returns:
        str: HTML content for the prediction page.
    """
    a = request.args.get('fighter_a', '').strip()
    b = request.args.get('fighter_b', '').strip()
    if not a or not b:
        return ("<p style='color:red'>Both fighters required.</p>"
                "<p><a href='/'>Back</a></p>"), 400

    try:
        winner, prob = predict_winner_ml(model, scaler, df_model, a, b)
        sa = latest_stats(df_model, a)
        sb = latest_stats(df_model, b)
    except Exception as e:
        return (f"<p style='color:red'>{e}</p>"
                "<p><a href='/'>Back</a></p>"), 400

    def fig_to_img(fig):
        buf = io.BytesIO()
        fig.tight_layout()
        fig.savefig(buf, format='png')
        buf.seek(0)
        img = base64.b64encode(buf.read()).decode('utf-8')
        plt.close(fig)
        return img

    # Win probability bar
    fig1, ax1 = plt.subplots()
    ax1.bar([a, b], [prob, 1 - prob], color=['#1f77b4', '#ff7f0e'])
    ax1.set_ylim(0, 1)
    ax1.set_ylabel('Win Probability')
    img1 = fig_to_img(fig1)

    # Additional stat charts
    chart_files = generate_comparison_charts(sa, sb, (a, b))
    additional_imgs = []
    for path in chart_files:
        with open(path, "rb") as imgf:
            b64 = base64.b64encode(imgf.read()).decode("utf-8")
        additional_imgs.append(b64)

    template = """
      <h1>Prediction:{{ winner }}</h1>
      <h2>Win Probability</h2>
        <img src="data:image/png;base64,{{ img1 }}"><br>
      <h2>Other Stat Comparisons</h2>
      {% for img in additional_imgs %}
        <div style="display:inline-block; margin:10px;">
          <img src="data:image/png;base64,{{ img }}" style="max-width:400px;"><br>
        </div>
      {% endfor %}
      <p><a href='/'>← Back</a></p>
    """

    return render_template_string(
        template,
        winner=winner,
        win_prob=f"{prob:.1%}",
        fighter=a,
        img1=img1,
        additional_imgs=additional_imgs
    )

if __name__ == "__main__":
    app.run()
