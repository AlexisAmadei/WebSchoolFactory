# Créer une list qui va remplacer les valeurs impaires pas 72 et les valeurs paires par -5

list1 = [1, 1, 2, 2, 3, 3, 4, 4]
list2 = [72 if i % 2 != 0 else -5 for i in list1]
print(list2)