import time
from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__, static_folder="../build", static_url_path='/')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/columns', methods=['GET', 'POST'])
def get_columns():
    file = request.data
    return jsonify(pd.read_excel(file).columns.values.tolist())
