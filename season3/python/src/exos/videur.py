import re

def ifAdult(age):
    if age >= 18:
        return True
    else:
        return False

def comeIn():
    ifSon = input("Are you the son of the boss? (yes/no) ")
    if re.match(ifSon, 'yes', re.IGNORECASE):
        print("Welcome in !")
        return
    elif (int(input("how old are you ? ")) >= 18):
        print("Welcome in !")
    else:
        print("You are too young to come in.")

comeIn()