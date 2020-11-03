
import os 
import json

def user(ID):
    if os.path.exists('ProjectContainer') == True:
        userpath = os.path.join('ProjectContainer',ID)
        print("ASD")
        if os.path.exists(userpath) == True:
            data=open (os.path.join(userpath, "metadata.json"),'r')
            user_data = data.read()
            obj= json.loads(user_data)
            if obj['Public'] == True:
                print("Ready",obj)
user("0aMr40")


    

























