# fight_predictor.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

DATA_PATH = "./ufc-dataset/large_dataset.csv"

feature_names = [
    "r_wins_total", "r_losses_total", "r_kd", "r_SLpM_total", "r_SApM_total",
    "r_sig_str_acc_total", "r_str_def_total", "r_td_avg", "r_td_acc_total",
    "r_td_def_total", "r_sub_avg", "r_ctrl_sec", "r_age", "r_reach", "r_height",
    "b_wins_total", "b_losses_total", "b_kd", "b_SLpM_total", "b_SApM_total",
    "b_sig_str_acc_total", "b_str_def_total", "b_td_avg", "b_td_acc_total",
    "b_td_def_total", "b_sub_avg", "b_ctrl_sec", "b_age", "b_reach", "b_height"
]

def load_data() -> pd.DataFrame:
    """
    Loads the dataset from a CSV file.
    Returns:
        df: DataFrame containing fight and fighter statistics.
    """
    return pd.read_csv(DATA_PATH)

def latest_stats(df: pd.DataFrame, fighter: str) -> dict:
    """
    Retrieves the latest statistics for a given fighter from the DataFrame.
    Args:
        df: DataFrame containing fight and fighter statistics.
        fighter: Name of the fighter (either 'Red' or 'Blue' corner).
    Returns:
        stats: Dictionary containing the latest statistics for the fighter.
    Raises:
        ValueError: If the fighter is not found in the DataFrame.
    """
    mask_r = df["r_fighter"] == fighter
    mask_b = df["b_fighter"] == fighter
    if not mask_r.any() and not mask_b.any():
        raise ValueError(f"Fighter '{fighter}' not found")

    row = df.loc[mask_r].iloc[-1] if mask_r.any() else df.loc[mask_b].iloc[-1]
    pfx = "r" if mask_r.any() else "b"

    fields = {
        "wins_total":        f"{pfx}_wins_total",
        "losses_total":      f"{pfx}_losses_total",
        "kd":                f"{pfx}_kd",
        "SLpM_total":        f"{pfx}_SLpM_total",
        "SApM_total":        f"{pfx}_SApM_total",
        "sig_str_acc_total": f"{pfx}_sig_str_acc_total",
        "str_def_total":     f"{pfx}_str_def_total",
        "td_avg":            f"{pfx}_td_avg",
        "td_acc_total":      f"{pfx}_td_acc_total",
        "td_def_total":      f"{pfx}_td_def_total",
        "sub_avg":           f"{pfx}_sub_avg",
        "ctrl_sec":          f"{pfx}_ctrl_sec",
        "age":               f"{pfx}_age",
        "reach":             f"{pfx}_reach",
        "height":            f"{pfx}_height",
    }

    stats = {key: row[col] for key, col in fields.items()}
    return stats

def prepare_dataset(df: pd.DataFrame) -> tuple:
    """
    Prepares the dataset for training.
    Args:
        df: DataFrame containing fight and fighter statistics.
    Returns:
        X: Features DataFrame.
        y: Target Series (winner).
    """
    df_clean = df.dropna(subset=feature_names + ["winner"])
    X = df_clean[feature_names]
    y = df_clean["winner"].apply(lambda w: 1 if w == "Red" else 0)
    return X, y

def train_model(df: pd.DataFrame):
    """
    Trains a Random Forest model on the dataset.
    Args:
        df: DataFrame containing fight and fighter statistics.
        Returns:
        model: Trained RandomForestClassifier.
        scaler: Fitted StandardScaler for feature normalization.
    """
    X, y = prepare_dataset(df)
    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_train)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_scaled, y_train)

    return model, scaler

def predict_winner_ml(model, scaler, df, fighter_a: str, fighter_b: str) -> tuple[str, float]:
    """
    Predicts the winner between two fighters using a trained machine learning model.

    Args:
        model: Trained scikit-learn classifier (e.g., RandomForestClassifier).
        scaler: Fitted StandardScaler for feature normalization.
        df: DataFrame containing fight and fighter statistics.
        fighter_a (str): Name of the first fighter (treated as 'Red' corner).
        fighter_b (str): Name of the second fighter (treated as 'Blue' corner).

    Returns:
        tuple[str, float]: Predicted winner's name and probability of fighter_a ('Red') winning.
    """
    a_stats = latest_stats(df, fighter_a)
    b_stats = latest_stats(df, fighter_b)

    features = []
    for key in [
        "wins_total", "losses_total", "kd", "SLpM_total", "SApM_total",
        "sig_str_acc_total", "str_def_total", "td_avg", "td_acc_total",
        "td_def_total", "sub_avg", "ctrl_sec", "age", "reach", "height"
    ]:
        features.append(a_stats[key])
    for key in [
        "wins_total", "losses_total", "kd", "SLpM_total", "SApM_total",
        "sig_str_acc_total", "str_def_total", "td_avg", "td_acc_total",
        "td_def_total", "sub_avg", "ctrl_sec", "age", "reach", "height"
    ]:
        features.append(b_stats[key])

    X_input_df = pd.DataFrame([features], columns=feature_names)
    X_input_scaled = scaler.transform(X_input_df)
    prob_red = model.predict_proba(X_input_scaled)[0][1]
    winner = fighter_a if prob_red >= 0.5 else fighter_b
    return winner, float(prob_red)
