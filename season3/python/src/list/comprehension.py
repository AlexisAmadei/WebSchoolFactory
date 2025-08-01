# Ecrire la liste de tous les cubes de nombres imapir entre 100 et 1 (décroissant)

# solution 1
print([i**3 for i in range(100, 0, -1) if i % 2 != 0])

# solution 2
print([i**3 for i in range(99, 0, -2)])