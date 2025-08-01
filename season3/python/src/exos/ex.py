def add(x, y):
    return x+y

def mul(x, y):
    return x*y

def sub(x, y):
    return x-y

def fct(x, y, z):
    if z == 1:
        return add(x, y)
    elif z == 2:
        return mul(x, y)
    else:
        return sub(x, y)

print(fct(5, 5, 1))
print(fct(5, 5, 2))
print(fct(5, 5, 8))