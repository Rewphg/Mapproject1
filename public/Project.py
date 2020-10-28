import os
from os import path 
import pandas as pd
import csv

from pandas.io.sql import DatabaseError
from hashids import Hashids
import random
from csv import writer

UN = "Rew"

def AudenticateUser(UN):
    CheckDB(UN) 

def CheckDB(UN):
    Data = pd.read_csv("./static/Data/ProjectID.csv")
    Data.info()
    for A in Data.itertuples():
        if A.Username == UN:
            print(A.PID)
        else:
            return 0

def GenProjectID(U):
    ID = random.randrange(10000,99999)
    HID = Hashids(salt="this is my salt" , min_length=16)
    Fn = HID.encode(ID)
    append_list_as_row("./static/Data/ProjectID.csv", Fn, U)
    CreateFolder(Fn)

def append_list_as_row(file_name, list_of_elem, U):
    WD = U + "," + list_of_elem
    with open(file_name, 'a+') as write_obj:
        csv_writer = writer(write_obj, delimiter=' ', quoting=csv.QUOTE_MINIMAL, dialect='excel')
        write_obj.write(WD)
        csv_writer.writerow([])

def CreateFolder(ID):
    IDpath = os.path.join('ProjectContainer', ID)
    Data = os.path.join(IDpath,"Data")
    Img = os.path.join(IDpath,"Img")
    Qr =  os.path.join(IDpath,"QR")
    if os.path.exists(IDpath) == False:
        os.makedirs(IDpath)
        os.makedirs(Data)
        os.makedirs(Img)
        os.makedirs(Qr)

CheckDB(UN)
GenProjectID(UN)