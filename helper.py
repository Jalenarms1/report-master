import pyodbc
import pandas as pd
import openpyxl
import os
from uuid import uuid4
import numpy as np
from dotenv import load_dotenv
load_dotenv()


server = os.environ.get('DB_SERVER')
dbname = os.environ.get('DB_NAME')
driver = os.environ.get('DB_DRIVER')

conn = pyodbc.connect(
    f'DRIVER={driver};SERVER={server};DATABASE={dbname};Trusted_Connection=yes')

cursor = conn.cursor()


def get_excel_sheets_data(file_path):
    xls = pd.ExcelFile(file_path)
    excel_objects = []

    for sheet_name in xls.sheet_names:
        df = xls.parse(sheet_name)
        # Replace NaN and NaT with None
        df.replace({np.nan: None}, inplace=True)
        columns = df.columns.tolist()
        data = df.to_dict(orient='records')

        sheet_data = {
            'sheet_name': sheet_name,
            'columns': columns,
            'data': data
        }

        excel_objects.append(sheet_data)

    return excel_objects


def get_my_files(user_id):

    cursor.execute("select * from Files where user_id = ?", user_id)

    data = cursor.fetchall()
    if data != None:

        file_objects = []

        for row in data:
            file_path = os.path.join(row[2], row[1])

            file_data = get_excel_sheets_data(file_path)

            file_obj = {
                'file_id': row[0],
                'file_name': row[1],
                'file_data': file_data
            }

            file_objects.append(file_obj)

        return file_objects


def get_user_id(username):
    cursor.execute("select * from Users where win_username = ?", username)

    resp = cursor.fetchone()
    if resp == None:
        user_id = str(uuid4())

        cursor.execute(
            "insert into Users (id, win_username) values (?, ?)", user_id, username)

        cursor.commit()
    else:
        user_id = resp.id

    return user_id
