def getInfo():
    f = open("user_data.txt",'r')
    Info = f.read()
    f.close()
    f = open("user_data.txt",'w')
    
