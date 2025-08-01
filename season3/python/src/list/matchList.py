# créer un fonction qui prend 2 listes en paramêtre et renvoie la liste des éléments en commun

list1 = [1,2,3,4,5,6,7,8,9]
list2 = [5,8,9,10,44]

def intersetion(l1, l2):
    return [i for i in l1 if i in l2]

print(intersetion(list1, list2))