# Bored in class so let's make a simple number guessing game

import random
import sys

# clear terminal
print("\033[H\033[J")

randomNombre = random.randint(1, 50)
for i in range(0, 5):
    while True:
        try:
            userGuess = input('Guess a number between 1 and 50: ')
            userGuess = int(userGuess)
            break
        except ValueError:
            print("That's not a number! Please try again.")
    if (userGuess < 1 or userGuess > 50):
        print('Please guess a number between 1 and 50')
        continue
    if (userGuess == randomNombre):
        print('You guessed right!')
        sys.exit()
    if (userGuess > randomNombre):
        print('Too high')
    else:
        print('Too low')
print('The number was: ', randomNombre)