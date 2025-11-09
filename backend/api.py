import os
import psycopg2
from flask import Flask, render_template, request, url_for, redirect, jsonify
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

def connect_to_db():
    conn = psycopg2.connect(
        host="localhost",
        database="todo_db",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD']
    )

    return conn

@app.post('/api/register')
def register_user():
    username = request.form['username']
    password = request.form['password']
    
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('INSERT INTO users (username, password) VALUES (%s, %s)', (username.lower(), password_hash))
        conn.commit()
        return jsonify({'message': 'User registered successfully.'}), 201
    
    except psycopg2.Error as e:
        return jsonify({'error' : f'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : f'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()

@app.post('/api/login')
def login_user():
    username = request.form['username']
    password = request.form['password']

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        
        # check if there is a user with this username in the db
        cur.execute('SELECT row_to_json(u) FROM (SELECT id, username, password FROM users WHERE username = %s) u', (username.lower(),)) 
               

        if cur.rowcount == 0: 
            return jsonify({'message': 'User not found'}), 404
        else: 
            user = cur.fetchone()[0] 
            isCorrectPassword = bcrypt.check_password_hash(user['password'], password)

            if isCorrectPassword:
                return jsonify({'message': 'Logged in successfully.'}), 200
            else:
                return jsonify({'message': 'Incorrect password.'}), 401

    except psycopg2.Error as e:
        return jsonify({'error' : f'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : f'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()

@app.get('/api/todos')
def get_todos():
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('SELECT row_to_json(t) FROM (SELECT id, title, completed, created_at, user_id FROM todos) t') 
        todoList = cur.fetchall()
        
        return todoList
    
    except psycopg2.Error as e:
        return jsonify({'error' : f'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : f'An error occurred: {e}'}), 500

    finally:
        cur.close()
        conn.close()

@app.post('/api/todos')
def post_post():
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
        return jsonify({'error' : f'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : f'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()
    
@app.patch('/api/todos/<id>')
def patch_todo(id):
    title = request.form['title']
    completed = request.form['completed']

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('UPDATE todos SET title = %s, completed = %s WHERE id = %s', (title, completed, id))
        conn.commit()
        return jsonify({'message': 'ToDo updated successfully.'}), 200
    
    except psycopg2.Error as e:
        return jsonify({'error' : f'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : f'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()

@app.delete('/api/todos/<id>')
def delete_todo(id):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('DELETE FROM todos WHERE id = %s', (id))
        conn.commit()
        return jsonify({'message': 'ToDo deleted successfully.'}), 200
    
    except psycopg2.Error as e:
        return jsonify({'error' : f'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : f'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()