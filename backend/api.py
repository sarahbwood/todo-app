import os
import psycopg2
from flask import Flask, render_template, request, url_for, redirect, jsonify

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
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('SELECT row_to_json(t) FROM (SELECT id, title, completed, created_at, user_id FROM todos) t') 
        todoList = cur.fetchall()
        
        return todoList
    
    except psycopg2.Error as e:
        return jsonify({'error' : 'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : 'An error occurred: {e}'}), 500

    finally:
        cur.close()
        conn.close()

@app.post('/api/todos')
def todo_post():
    title = request.form['title']
    completed = request.form['completed']
    user_id = request.form['user_id']

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('INSERT INTO todos (title, completed, created_at, user_id) VALUES (%s, %s, CURRENT_TIMESTAMP, %s)', (title, completed, user_id))
        conn.commit()
        return jsonify({'message': 'ToDo posted successfully.'}), 201
    
    except psycopg2.Error as e:
        return jsonify({'error' : 'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : 'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()
    
@app.patch('/api/todos/<id>')
def todo_patch(id):
    title = request.form['title']
    completed = request.form['completed']

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('UPDATE todos SET title = %s, completed = %s WHERE id = %s', (title, completed, id))
        conn.commit()
        return jsonify({'message': 'ToDo updated successfully.'}), 200
    
    except psycopg2.Error as e:
        return jsonify({'error' : 'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : 'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()

@app.delete('/api/todos/<id>')
def todo_delete(id):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('DELETE FROM todos WHERE id = %s', (id))
        conn.commit()
        return jsonify({'message': 'ToDo deleted successfully.'}), 200
    
    except psycopg2.Error as e:
        return jsonify({'error' : 'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : 'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()