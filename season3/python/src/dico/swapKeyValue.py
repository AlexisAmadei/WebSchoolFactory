## Créer une fonction qui prend un dico d1 et renvoie un autre dico d2 qui correspond à d1 avec les valeurs et les clés inversées

d1 = {
    'name': 'Clark',
    'surname': 'Kent',
    'hobby': 'kill'
}

def swapKeyValue(dico1):
    return {v: k for k, v in dico1.items()}
# print(swapKeyValue(d1))

def swapKeyValue2(dico1):
    dico2 = {}
    for k, v in dico1.items():
        dico2[v] = k
    return dico2
# print(swapKeyValue2(d1))