# créer une fonction qui prend un dico et renvoie une liste qui joint key value

d1 = {
    'name': 'Clark',
    'surname': 'Kent',
    'hobby': 'kill'
}

def dictToList(dico):
    res = []
    for key, value in dico.items():
        res.append(key)
        res.append(value)
    return res
print(dictToList(d1))