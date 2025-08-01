def isMultOf3(nb):
    if nb % 3 == 0:
        return True
    else:
        return False

def isMultOf5(nb):
    if nb % 5 == 0:
        return True
    else:
        return False

def fizzbuzz(limit):
    for i in range(limit + 1):
        if isMultOf3(i) == True and isMultOf5(i) == False:
            print(str(i) + ' fizz')
        elif isMultOf5(i) == True and isMultOf3(i) == False:
            print(str(i) + ' buzz')
        elif isMultOf3(i) == True and isMultOf5(i) == True:
            print(str(i) + ' fizzbuzz')
        else:
            print(i)
    return i

fizzbuzz(100)