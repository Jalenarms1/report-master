import helper
import win32api
import os
import pyodbc
import pandas as pd
from flask import Flask, render_template, request, jsonify, Response
from uuid import uuid4
from dotenv import load_dotenv
load_dotenv()

file_storage_root = os.getcwd()

server = os.environ.get('DB_SERVER')
dbname = os.environ.get('DB_NAME')
driver = os.environ.get('DB_DRIVER')

conn = pyodbc.connect(
    f'DRIVER={driver};SERVER={server};DATABASE={dbname};Trusted_Connection=yes')

cursor = conn.cursor()

app = Flask(__name__, static_folder='static')

app.config['TEMPLATES_AUTO_RELOAD'] = True

username = win32api.GetUserName()

user_id = helper.get_user_id(username)


@app.route("/")
def home():
    return render_template("index.html", username=username)


@app.route("/my-files", methods=['GET'])
def get_my_files():
    user_files = helper.get_my_files(user_id)

    return jsonify(user_files)


@app.route('/upload', methods=['POST'])
def upload_file():

    folder_path = os.path.join(file_storage_root, user_id)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    file = request.files['file']
    if file:
        file_path = os.path.join(folder_path, file.filename)
        if not os.path.exists(file_path):
            cursor.execute(
                "insert into Files (id, file_name, user_id) values (?,?,?)", str(uuid4()), file.filename, user_id)

            cursor.commit()

        file.save(file_path)
        return jsonify(helper.get_my_files(user_id))

    return 'No file provided', 400


if __name__ == "__main__":
    app.run()
