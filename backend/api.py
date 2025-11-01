import time
import os
import psycopg2
from flask import Flask, render_template

app = Flask(__name__)

def connect_to_db():
    conn = psycopg2.connect(
        host="localhost",
        database="todo_db",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD']
    )

    return conn

@app.get('/api/todos')
def get_todos():
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute('SELECT row_to_json(t) FROM (SELECT id, title, completed, created_at, user_id FROM todos) t') 
    todoList = cur.fetchall()
    cur.close()
    conn.close()
    return todoList

# @app.post('/api/todos')
#     def todo_post():
#         conn = connect_to_db()
#         cur = conn.cursor()
#         cur.execute()

#         return {todoList=todoList}
