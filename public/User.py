import datetime
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
        Toilet = []
        for obj in Data["object"]: 
            print(obj['src'])
        print(RouteArr)
        return Toilet

# GetProjectData("0agbjP")