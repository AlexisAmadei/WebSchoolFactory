# Documentation Technique - UFC Fight Predictor

## 1. Vue d'ensemble

L'application **UFC Fight Predictor** est une interface web permettant de prédire le vainqueur d'un combat entre deux combattants UFC, en utilisant leurs statistiques historiques issues d'un fichier CSV.

Le projet repose sur une logique déterministe basée sur une formule pondérée des différences statistiques et une interface Flask pour l'affichage et la saisie utilisateur.

## 2. Structure des fichiers

### `fight_predictor.py`

Contient toute la logique de traitement des données :

* **`load_data()`** :

  * Charge un fichier CSV situé à `./ufc-dataset/large_dataset.csv`.
  * Utilise `pandas.read_csv` pour renvoyer un DataFrame contenant toutes les données historiques des combats UFC.

* **`_latest_stats(df, fighter)`** :

  * Recherche dans le DataFrame la dernière ligne où le combattant apparaît soit comme `r_fighter`, soit comme `b_fighter`.
  * En fonction du coin (`r` pour rouge, `b` pour bleu), extrait les valeurs suivantes : victoires, défaites, frappes significatives, défense, âge, taille, portée, etc.
  * Retourne un dictionnaire avec ces statistiques, prêtes à être comparées.

* **`predict_winner_formula(fighter_a, fighter_b)`** :

  * Charge le DataFrame avec `load_data()`.
  * Appelle `_latest_stats` pour obtenir les statistiques de chaque combattant.
  * Calcule la différence brute entre les valeurs de chaque statistique : `diff[stat] = a_stats[stat] - b_stats[stat]`.
  * Applique une **normalisation manuelle** à chaque différence à l'aide d'un dictionnaire `max_range`, qui fixe des plages maximales (par exemple : 30 pour `wins_total`, 0.5 pour `sig_str_acc_total`).
  * Applique une **pondération manuelle** à chaque statistique avec un dictionnaire `weights` (par exemple : +4.0 pour `kd`, -3.0 pour `SApM_total`, +1.0 pour `ctrl_sec`).
  * Le score total est la somme des produits : `score += weight * normalized_diff`.
  * Ce score est ensuite passé à une fonction sigmoïde : `prob_a = 1 / (1 + exp(-score))`.
  * Si la probabilité est supérieure ou égale à 0.5, le combattant A est prédit gagnant ; sinon, c’est le combattant B.

### `main.py`

Interface web construite avec Flask :

* Affiche une page d'accueil avec formulaire de sélection des combattants (`/`).
* Route `/predict_page` :

  * Récupère les noms des deux combattants via les paramètres GET.
  * Appelle `predict_winner_formula` et récupère les statistiques avec `_latest_stats`.
  * Affiche le vainqueur, la probabilité sous forme de graphique, et d'autres comparaisons statistiques via des graphiques générés.
  * Utilise `matplotlib` pour créer des images encodées en base64.

## 3. Source des données

Le fichier CSV source est situé à l'emplacement : `./ufc-dataset/large_dataset.csv`.
Ce fichier contient des enregistrements de combats passés, avec des statistiques détaillées pour les combattants dans les coins rouge (`r_`) et bleu (`b_`) :

* Dénominations comme `r_wins_total`, `b_sig_str_acc_total`, etc.
* Pour chaque combat, les statistiques sont doublées pour refléter les deux combattants.

L'extraction des données s'effectue donc en parcourant toutes les lignes et en prenant la dernière ligne associée au combattant donné, en utilisant la colonne `r_fighter` ou `b_fighter`.

## 4. Détail de l'algorithme de scoring

L'algorithme utilisé est purement déterministe, sans apprentissage automatique :

1. **Extraction des statistiques** :

   * Récupération de 16 attributs statistiques pour chaque combattant.

2. **Calcul de la différence brute** :

   * `diff[stat] = stat_A - stat_B` pour chaque statistique.

3. **Normalisation** :

   * Chaque différence est divisée par une plage maximale définie dans `max_range`.
   * Le résultat est borné entre -1.0 et 1.0.

4. **Application de poids** :

   * Chaque statistique est multipliée par un poids défini dans `weights`.
   * Les poids positifs favorisent un avantage, les négatifs pénalisent.

5. **Calcul du score global** :

   * `score = somme(weights[i] * norm_diff[i])`

6. **Conversion en probabilité** :

   * `prob = 1 / (1 + exp(-score))`, soit une fonction sigmoïde classique.

7. **Prédiction du vainqueur** :

   * Si `prob >= 0.5`, alors vainqueur = combattant A.
   * Sinon, vainqueur = combattant B.

## 5. Visualisation des résultats

Les résultats sont présentés via :

* Un graphique à barres montrant les probabilités de victoire.
* D'autres graphiques générés via la fonction `generate_comparison_charts`, comparant les statistiques clés entre les deux combattants.

Les images sont encodées en base64 pour être directement affichées dans le HTML.

## 6. Dépendances principales

* `pandas`, `numpy` : traitement des données.
* `matplotlib` : génération de graphiques.
* `flask` : serveur web.
* `scikit-learn`: machine learning