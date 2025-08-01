import os
import numpy as np

import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt

def generate_comparison_charts(stats1, stats2, fighter_names):
    """
    Generates and saves bar charts comparing two fighters' stats.

    Parameters:
    - stats1, stats2: dicts mapping metric keys to values for fighter1 and fighter2.
    - fighter_names: tuple/list of two fighter names, e.g. ("Fighter A", "Fighter B").

    Charts are saved in the 'static/charts' directory as PNG files, and the function returns
    a list of filepaths.
    """
    # Build output path
    output_dir = os.path.join(os.getcwd(), 'static', 'charts')
    os.makedirs(output_dir, exist_ok=True)

    # Define the charts
    charts = {
        'wins_losses': (['wins_total', 'losses_total'], ['Wins', 'Losses']),
        'knockdowns': (['kd'], ['Knockdowns']),
        'strikes': (['SLpM_total', 'SApM_total'], ['Strikes Landed / Min', 'Strikes Absorbed / Min']),
        'sig_str_acc': (['sig_str_acc_total'], ['Significant Strike Accuracy']),
        'td_acc': (['td_acc_total'], ['Takedown Accuracy']),
        'age': (['age'], ['Age']),
        'height': (['height'], ['Height (cm)']),
        'reach': (['reach'], ['Reach (cm)']),
    }

    generated_files = []
    for chart_name, (keys, labels) in charts.items():
        data1 = [stats1.get(key, 0) for key in keys]
        data2 = [stats2.get(key, 0) for key in keys]

        x = np.arange(len(labels))
        width = 0.35

        fig, ax = plt.subplots()
        ax.bar(x - width/2, data1, width, label=fighter_names[0])
        ax.bar(x + width/2, data2, width, label=fighter_names[1])

        ax.set_xticks(x)
        ax.set_xticklabels(labels)
        ax.set_ylabel('Value')
        ax.set_title(f"{fighter_names[0]} vs {fighter_names[1]}: {chart_name.replace('_', ' ').title()}")
        ax.legend()
        plt.tight_layout()

        filename = f"{chart_name}.png"
        filepath = os.path.join(output_dir, filename)
        fig.savefig(filepath)
        plt.close(fig)

        generated_files.append(filepath)

    return generated_files
