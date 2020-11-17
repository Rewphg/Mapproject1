import datetime
from logging import info
import os
from os.path import join
from flask.app import Flask
import pandas as pd
import csv
from csv import writer
import json

RouteArr = []

class Route:
    def __init__(self,x,y,type):
        self.x = x
        self.y = y
        self.type = type

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
        if Data["Public"] == "true":
            return True
        elif Data["Public"] == "false":
            return False

def GetProjectName(ProjectID):
    with open(os.path.join("ProjectContainer",ProjectID,"metadata.json"), 'r') as File:
        Data = json.load(File)
        return Data["ProjectName"]

def GetProjectData(ProjectID):
    with open(os.path.join("ProjectContainer",ProjectID,"Data","mapdata.json"), 'r') as File:
        Data = json.load(File)
        BoothList = []
        info = []
        for obj in Data["object"]: 
            print(obj)
            try:
                if obj["src"] == "/static/Icons/toilet.png":
                    print("Toilet", obj)
                elif obj["src"] == "/static/Icons/pin.png":
                    BoothList.append(obj["title"])
                    info.append(obj["dis"])
                    print("Pin", BoothList)
                elif obj["src"] == "/static/Icons/info.png":
                    print("Info", obj)
            except:
                continue
        print(len(BoothList), BoothList, info)
        return len(BoothList), BoothList, info

GetProjectData("GM9vjG")