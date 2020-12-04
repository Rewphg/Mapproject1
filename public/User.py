import datetime
import os
from os import name, path, remove
from os.path import join
import shutil
from flask.app import Flask
import pandas as pd
import csv
import random
from csv import writer
import json

def CheckProjectId(ProjId):
    with open("./static/Data/ProjectID.csv", "r") as F:
        F = csv.reader(F)
        for row in F:
            for field in row:
                if field == ProjId:
                    return CheckMetadata(ProjId)
        return False

def CheckMetadata(ProjectId):
    with open(os.path.join("ProjectContainer",ProjectId,"metadata.json"), 'r') as File:
        Data = json.load(File)
        if Data["Public"] == True:
            return True
        elif Data["Public"] == False:
            return False

def GetProjectName(ProjectID):
    with open(os.path.join("ProjectContainer",ProjectID,"metadata.json"), 'r') as File:
        Data = json.load(File)
        return Data["ProjectName"]

def GetProjectData(ProjectID):
    with open(os.path.join("ProjectContainer",ProjectID,"Data","mapdata.json"), 'r') as File:
        Data = json.load(File)
        Toilet = []
        for obj in Data["object"]: 
            print(obj["title"])    
            if obj["type"] == 'line':
                Toilet.append(obj)
        print(Toilet)
        return Toilet

# GetProjectData("0agbjP")