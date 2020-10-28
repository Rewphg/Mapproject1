import csv
import pandas as pd
import os
import pandas

from pandas.core.indexes.datetimelike import DatetimelikeDelegateMixin
from werkzeug import datastructures

UN = "Rew"

def AudenticateUser(UN):
    CheckDB(UN)

def CheckDB(UN):
    Data = pd.read_csv("./static/Data/ProjectID.csv")
    for A in Data.itertuples():
        if A.Username == UN:
            print(A.ProjectID)
CheckDB(UN)