import os
import psycopg2
from flask import Flask, render_template, request, url_for, redirect, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
jwt = JWTManager(app)

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
        cur.execute('INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id, username', (username.lower(), password_hash))
        result = cur.fetchone()
        conn.commit()

        user = {
            'id': result[0],
            'username': result[1],
        }
        
        access_token = create_access_token(identity=str(user['id']), additional_claims={'username': user['username']})
        
        data = {
            'message': 'User registered successfully.',
            'user_id': user['id'],
            'username': user['username'],   
            'access_token': access_token,
        }
        
        return jsonify(data), 201
    
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
            # validate password using Bcrypt
            user = cur.fetchone()[0] 
            isCorrectPassword = bcrypt.check_password_hash(user['password'], password)

            if isCorrectPassword:
                access_token = create_access_token(identity=str(user['id']), additional_claims={'username': user['username']})

                data = {
                    'message': 'Logged in successfully.',
                    'user_id':  user['id'],
                    'username': user['username'],
                    'access_token': access_token,
                }

                return jsonify(data), 200
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
@jwt_required()
def get_todos():
    validated_user_id = get_jwt_identity()

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('SELECT row_to_json(t) FROM (SELECT id, title, completed, created_at, user_id FROM todos WHERE user_id = %s ORDER BY created_at ASC ) t', (validated_user_id,)) 
        todoList = cur.fetchall()
        
        return jsonify(todoList), 200
    
    except psycopg2.Error as e:
        return jsonify({'error' : f'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : f'An error occurred: {e}'}), 500

    finally:
        cur.close()
        conn.close()

@app.post('/api/todos')
def post_():
    title = request.form['title']
    user_id = request.form['user_id']

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('INSERT INTO todos (title, completed, created_at, user_id) VALUES (%s, FALSE, CURRENT_TIMESTAMP, %s)', (title, user_id))
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
        cur.execute('DELETE FROM todos WHERE id = %s', (id,))
        conn.commit()
        return jsonify({'message': 'ToDo deleted successfully.'}), 200
    
    except psycopg2.Error as e:
        return jsonify({'error' : f'A database error occurred: {e}'}), 500
    
    except Exception as e:
        return jsonify({'error' : f'An error occurred: {e}'}), 500
    
    finally:
        cur.close()
        conn.close()