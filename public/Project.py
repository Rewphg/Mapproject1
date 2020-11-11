import datetime
import os
from os import name, path, remove
from os.path import join
import shutil
from flask.app import Flask
import pandas as pd
import csv

from pandas.core import indexing
from hashids import Hashids
import random
from csv import writer
import json

UN = "Rew"

def CheckDB(UN):
    Data = pd.read_csv("./static/Data/ProjectID.csv", error_bad_lines=False)
    Data.info()
    AID = []
    Aname = []
    for A in Data.itertuples():
        if A.Username == UN:
            AID.append(A.PID)
            Aname.append(A.Name)
    return AID, Aname

def CheckMetadata(AID):
    PB = []
    for ID in AID:
        with open(os.path.join("ProjectContainer",ID,"metadata.json"), 'r') as File:
            Data = json.load(File)
            if Data["Public"] == True:
                PB.append("true")
            elif Data["Public"] == False:
                PB.append("false")
    return PB

def GenProject(U, Pname):
    Fn = GenID()
    AddIdToCSV("./static/Data/ProjectID.csv", Fn, U, Pname)
    CreateFolder(Fn, U, Pname)

def AddIdToCSV(Fname, PID, U,Pname):
    WD = U + "," + PID + "," + Pname
    with open(Fname, 'a+') as write_obj:
        csv_writer = writer(write_obj, delimiter=' ', quoting=csv.QUOTE_MINIMAL, dialect='excel')
        write_obj.write(WD)
        csv_writer.writerow([])

def CreateFolder(ID, U, Pname):
    if os.path.exists('ProjectContainer') == True:
        IDpath = os.path.join('ProjectContainer', ID)
        Data = os.path.join(IDpath,"Data")
        Img = os.path.join(IDpath,"Img")
        Qr = os.path.join(IDpath,"QR")
        if os.path.exists(IDpath) == False:
            os.makedirs(IDpath)
            os.makedirs(Data)
            os.makedirs(Img)
            os.makedirs(Qr)
        SaveMetadata(Pname, U, IDpath)
    else:
        os.makedirs('ProjectContainer')
        CreateFolder(ID, U, Pname)

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

def SaveMetadata(Pname, U, path):
    metadata = {}
    metadata["ProjectName"] = Pname
    metadata["Img"] = {
        "Src": path,
        "Name":"Background.png",
    }
    metadata["owner"] = U
    metadata["Public"] = False
    metadata["CreateTime"] = datetime.datetime.now()
    CreateJson(metadata, path)

def CreateJson(Data, path):
    FilePath = os.path.join(path,"metadata.json")
    with open(FilePath, "w") as f:
        WD = json.dumps(Data, default = myconverter)
        print(WD)
        f.write(WD)

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()
        
def ChangePublic(PID,OnOff) :
    Data = ""
    with open(os.path.join("ProjectContainer",PID,"metadata.json"), 'r') as D:
        Data = json.load(D)
        Data["Public"] = OnOff
    with open(os.path.join("ProjectContainer",PID,"metadata.json"), 'w') as RD:
        WD = json.dumps(Data, default = myconverter)
        print(WD)
        RD.write(WD)


def ChangeName(New,ID):
    lines = list()
    with open('./static/Data/ProjectID.csv', 'r') as readFile:
        reader = csv.reader(readFile)
        for row in reader:
            lines.append(row)
            for field in row:
                if field == ID:
                    lines[lines.index(row)][2] = New
    with open('./static/Data/ProjectID.csv', 'w') as writeFile:
        writer = csv.writer(writeFile)
        writer.writerows(lines)
        
# CheckDB(UN)
# ChangeName("Test2","AW6Dj0")
# GenProject(UN,"helloworld")
# DeleteProject("ABDj2G")
# DeleteDIR("ABDj2G")