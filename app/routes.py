from flask import Blueprint, jsonify, request
from app.models import Progress, User
from app import db
from app.utils import generate_problem
from flask_login import login_required, current_user, login_user, logout_user

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return 'Welcome to Litlle Professor Game!'


# endpoint to register a new user
@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    
    # check if the username is already taken
    if db.session.query(User).filter_by(username=username).first():
        print('Register: Username already taken')
        return jsonify({'error': 'Username already taken'}), 400
    
    # create a new user and add it to the database
    new_user = User(username=username)
    db.session.add(new_user)
    db.session.commit()
    
    initial_progress = Progress(user_id=new_user.id)
    db.session.add(initial_progress)
    db.session.commit()
    
    print('Register: User created successfully {}'.format(new_user.id))
    return jsonify({'message': 'User created successfully', 'user_id': new_user.id}), 201


# Endpoint to login a user
@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    
    # check if the user exists
    user = db.session.query(User).filter_by(username=username).first()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    login_user(user)
    
    return jsonify({'message': 'User logged in successfully', 'user_id': user.id})


# Endpoint to logout a user
@bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'User logged out successfully'})


# Endpoint to get username of the current user
@bp.route('/user', methods=['GET'])
def get_user():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'Invalid user ID'}), 400
    
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'username': user.username})


# Endpoint to get the progress of the current user
@bp.route('/progress', methods=['GET'])
def get_progress():
    user_id = request.args.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'Invalid user ID'}), 400
    
    progress = db.session.get(Progress, user_id)
    
    if not progress:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'correct_answers': progress.correct_answers, 'incorrect_answers': progress.incorrect_answers, 'level': progress.level})


# endpoint to get a new math problem
@bp.route('/question', methods=['GET'])
def get_question():
    
    # get the user ID from the query string
    user_id = request.args.get('user_id')
    
    # check if the user ID is valid
    if not user_id:
        return jsonify({'error': 'Invalid user ID'}), 400
    
    # get the difficulty level from the Progress model
    progress = db.session.get(Progress, user_id)
    
    if not progress:
        return jsonify({'error': 'User not found'}), 404
    
    level = progress.level
    
    #check if the level is valid
    if not level:
        return jsonify({'error': 'Invalid user ID'}), 400
    
    problem, answer = generate_problem(level)
    
    # Store the problem in a session or return to the frontend
    return jsonify({'problem': problem, 'level': level})


# endpoint to submit the answer to a math problem
@bp.route('/answer', methods=['POST'])
def submit_answer():
    data = request.get_json()
    user_id = data.get('user_id')
    user_answer = data.get('answer')
    problem = data.get('problem')
    
    if not user_id or user_answer is None or not problem:
        return jsonify({'error': 'Invalid data'}), 400
    
    
    # check if the user ID is valid
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # evaluate the problem to get the correct answer
    correct_answer = eval(problem)
    
    # check if the user_answer is an integer
    try:
        user_answer = int(user_answer)
    except ValueError:
        return jsonify({'error': 'Invalid answer'}), 400
    
    # check if the user's answer is correct and update the Progress model
    if user_answer == correct_answer:
        progress = db.session.get(Progress, user_id)
        progress.correct_answers += 1
        
        # Update the level if the user has answered 10 questions correctly
        if progress.correct_answers % 10 == 0 and progress.correct_answers > 0:
            progress.level = min(4, progress.level + 1)
        
        db.session.commit()
        return jsonify({'message': 'Correct!', 'correct_answer': correct_answer})
    else:
        progress = db.session.get(Progress, user_id)
        progress.incorrect_answers += 1
        
        # Update the level if the user has answered 5 questions incorrectly
        if progress.incorrect_answers % 5 == 0 and progress.incorrect_answers > 0:
            progress.level = max(1, progress.level - 1)
        db.session.commit()
        return jsonify({'message': 'Incorrect!'})