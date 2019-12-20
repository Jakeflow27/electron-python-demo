import random

presents = ["an xbox","a nintendo64","some jimmy johns","my two front teeth"]
random.shuffle(presents)

for present in presents:
    print("All I want for Chistmas is " + present + "\n")