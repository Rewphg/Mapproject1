import os
from os import name, path, remove
import shutil
import pandas as pd
import csv
from hashids import Hashids
import random
from csv import writer

UN = "Rew"

global metadata

def AudenticateUser(UN):
    Ans = CheckDB(UN) 
    return Ans

def CheckDB(UN):
    Data = pd.read_csv("./static/Data/ProjectID.csv")
    Data.info()
    AID = []
    Aname = []
    for A in Data.itertuples():
        if A.Username == UN:
            AID.append(A.PID)
            Aname.append(A.Name)
    return AID, Aname

def GenProjectID(U, Pname):
    Fn = GenID()
    append_list_as_row("./static/Data/ProjectID.csv", Fn, U, Pname)
    CreateFolder(Fn)

def append_list_as_row(file_name, list_of_elem, U,Pname):
    WD = U + "," + list_of_elem + "," + Pname
    with open(file_name, 'a+') as write_obj:
        csv_writer = writer(write_obj, delimiter=' ', quoting=csv.QUOTE_MINIMAL, dialect='excel')
        write_obj.write(WD)
        csv_writer.writerow([])

def CreateFolder(ID):
    IDpath = os.path.join('ProjectContainer', ID)
    Data = os.path.join(IDpath,"Data")
    Img = os.path.join(IDpath,"Img")
    Qr = os.path.join(IDpath,"QR")
    if os.path.exists(IDpath) == False:
        os.makedirs(IDpath)
        os.makedirs(Data)
        os.makedirs(Img)
        os.makedirs(Qr)

def GenID():
    ID = random.randrange(10000,99999)
    HID = Hashids(salt="this is my salt" , min_length=6)
    FN = HID.encode(ID)
    PATH = os.path.join('ProjectContainer', FN)
    if os.path.exists(PATH) == False:
        return HID.encode(ID)
    else:
        GenID()

def DeleteProject(ID):
    lines = list()
    with open('./static/Data/ProjectID.csv', 'r') as readFile:
        reader = csv.reader(readFile)
        for row in reader:
            lines.append(row)
            for field in row:
                if field == ID:
                    lines.remove(row)
    with open('./static/Data/ProjectID.csv', 'w') as writeFile:
        writer = csv.writer(writeFile)
        writer.writerows(lines)
    DeleteDIR(ID)

def DeleteDIR(ID):
    PATH = os.path.join('ProjectContainer', ID)
    if os.path.exists(PATH) == True:
        shutil.rmtree(PATH)

def SaveMetadata(Pname, MS, U, path):
    metadata = {}
    metadata['ProjectName'] = Pname
    metadata['Img'] = {
        "Src": path,
        "Name":"Background.png",
    }


# CheckDB(UN)
# GenProjectID(UN,"helloworld")
# DeleteProject("ABDj2G")
# DeleteDIR("ABDj2G")