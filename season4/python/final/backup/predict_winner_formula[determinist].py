import numpy as np

def predict_winner_formula(fighter_a: str, fighter_b: str) -> tuple[str, float]:
    """Predict the probable winner between two MMA fighters using a handcrafted, fully
    deterministic formula.

    The algorithm proceeds in five main stages:

    1. **Data retrieval** – Load statistics dataframe with and extract each fighter's *latest* aggregated statistics
       using ``latest_stats``.
    2. **Raw difference** – Calculate the difference (``fighter_a`` - ``fighter_b``)
       for every stats in the statistics dictionary.
    3. **Normalization** – Divide each raw difference by a *maximum range* value
       representing a realistic span for that feature (e.g. 30 career wins,
       6 significant strikes landed per minute).  This clamps every
       normalised value to the interval ``[-1, 1]``.  Normalisation keeps all
       features on the same scale so that a weight of ``2.0`` always means *two
       units* of relative importance.
    4. **Weighted score** – Multiply every normalised difference by a weight
       reflecting the feature's subjective influence on fight outcome, then
       add all weighted terms to produce a single *score*.
    5. **Logistic mapping** – Feed the score into a math formula
       ``1 / (1 + e^{-x})`` to obtain a probability
       ``prob_a`` that fighter A wins.  A score of 0 -> 0.5; positive scores
       increase the probability, negative scores decrease it.

    Parameters
    ----------
    fighter_a : str
        Name (or unique identifier) of the first fighter.
    fighter_b : str
        Name (or unique identifier) of the second fighter.

    Returns
    -------
    tuple[str, float]
        * ``winner`` – the fighter predicted to win.
        * ``prob_a`` – probability estimate that *fighter A* wins (∈ [0, 1]).

    Notes
    -----
    * **Positive vs. negative weights** – Offensive metrics (e.g. significant
      strikes landed) carry *positive* weights, while liabilities such as
      significant strikes absorbed, losses, or older age carry *negative*
      weights.
    * **Adjust constants to calibrate** – Change ``max_range`` to reflect the
      empirical spread of your dataset, and tweak ``weights`` to emphasise or
      de-emphasise specific skills.
    """

    df = load_data()
    a_stats = latest_stats(df, fighter_a)
    b_stats = latest_stats(df, fighter_b)

    # Compute raw feature differences (A minus B)
    diff = {k: a_stats[k] - b_stats[k] for k in a_stats}

    # Normalisation set-up – hard-coded realistic max ranges
    #    (values are approximations based on historical UFC data)
    max_range = {
        "wins_total": 30,    # Career victories (0 – ~30)
        "losses_total": 30,  # Career defeats (0 – ~30)
        "kd": 5,            # Knockdowns per 15 min (0 – ~5)
        "SLpM_total": 6,    # Significant Landed per Minute (0 – ~6)
        "SApM_total": 6,    # Sig. Absorbed per Minute (0 – ~6)
        "sig_str_acc_total": 0.5,  # Accuracy (0 – 0.5 absolute diff)
        "str_def_total": 0.5,       # Striking defence (0 – 0.5)
        "td_avg": 4,        # Takedowns per 15 min (0 – ~4)
        "td_acc_total": 0.8,  # TD accuracy (0 – 0.8)
        "td_def_total": 0.8,  # TD defence (0 – 0.8)
        "sub_avg": 2,       # Submission attempts per 15 min (0 – ~2)
        "ctrl_sec": 120,    # Control seconds per round (0 – 120)
        "age": 15,          # Age difference expected (-7 – +7)
        "reach": 30,        # Reach difference in cm (-15 – +15)
        "height": 30,       # Height difference in cm (-15 – +15)
    }

    # Subjective feature weights – positive helps A, negative hurts
    weights = {
        "kd": 4.0,
        "SLpM_total": 3.0,
        "SApM_total": -3.0,
        "sig_str_acc_total": 2.0,
        "str_def_total": 2.0,
        "td_avg": 2.0,
        "td_acc_total": 1.5,
        "td_def_total": 1.5,
        "sub_avg": 1.0,
        "ctrl_sec": 1.0,
        "wins_total": 1.0,
        "losses_total": -1.0,
        "age": -1.0,
        "reach": 0.5,
        "height": 0.2,
    }

    # Accumulate weighted, normalised differences into a scalar score
    score = 0.0
    for feature, raw_diff in diff.items():
        max_r = max_range.get(feature)
        weight = weights.get(feature, 0.0)

        # Skip features that either lack a range or have zero weight
        if max_r is None or weight == 0.0:
            continue

        # Clamp (normalise) the feature diff to [-1, 1]
        norm_diff = np.clip(raw_diff / max_r, -1.0, 1.0)

        # Contribution of this feature to the global score
        score += weight * norm_diff

    # Convert score → probability via logistic function
    prob_a = 1.0 / (1.0 + np.exp(-score))  # sigmoid

    winner = fighter_a if prob_a >= 0.5 else fighter_b

    return winner, prob_a
