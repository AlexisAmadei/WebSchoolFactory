'''
Créer une fonction qui prend une liste et renvoie un dictionnaire un dico dont les clés sont les éléments de la liste
et les valeurs sont le nombre de fois où l'élément apparaît dans la liste
'''
l1 = ['a', 'b', 'c', 'a', 'b', 'a', 'c', 'd']
def countOccurences(list):
    dico = {}
    for item in list:
        if item in dico:
            dico[item] += 1
        else:
            dico[item] = 1
    return dico
print(countOccurences(l1))