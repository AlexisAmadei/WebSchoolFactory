def withFor():
    list = [1, 2, 3, 4, 5]
    i = len(list)
    for i in range(i - 1, -1, -1):
        print(list[i])

def withWhile():
    list = [1, 2, 3, 4, 5]
    i = len(list)
    while i > 0:
        i -= 1
        print(list[i])

# withFor()
# withWhile()
