
import os 
import json

def user(ID):
    if os.path.exists('ProjectContainer') == True:
        userpath = os.path.join('ProjectContainer',ID)
        if os.path.exists(userpath) == True:
            data=open ('metadata.json','r')
            user_data = data.read()
            obj= json.loads(user_data)
            print(obj)
# user("0aMr40")
           
                































# def getInfo():
    # f = open("user_data.txt",'r')
    # Info = f.read()
    # f.close()
    # f = open("user_data.txt",'w')

# import pandas as pd
# import csv
# import os
# import pandas

# with open ('user_data.csv', mode='w') as file:
#     writer.writerow


#  def getInfo():
    #  user_data = pd.read_csv('user.csv')
    # f = open("user_data.txt",'r')
    # Info = f.read()
    # f.close()
    # f = open("user_data.txt",'w')
