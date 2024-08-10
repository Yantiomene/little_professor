from flask import Blueprint, jsonify, request
from app.models import Progress
from app import db
from app.utils import generate_problem

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return 'Welcome to Litlle Professor Game!'


# endpoint to get a new math problem
@bp.route('/question', methods=['GET'])
def get_question():
    
    # get the user ID from the query string
    user_id = request.args.get('user_id')
    
    # check if the user ID is valid
    if not user_id:
        return jsonify({'error': 'Invalid user ID'}), 400
    
    # get the difficulty level from the Progress model
    level = db.session.query(Progress).get(user_id).level
    
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
    
    # evaluate the problem to get the correct answer
    correct_answer = eval(problem)
    
    # check if the user_answer is an integer
    try:
        user_answer = int(user_answer)
    except ValueError:
        return jsonify({'error': 'Invalid answer'}), 400
    
    # check if the user's answer is correct and update the Progress model
    if user_answer == correct_answer:
        progress = db.session.query(Progress).get(user_id)
        progress.correct_answers += 1
        
        # Update the level if the user has answered 10 questions correctly
        if progress.correct_answers % 10 == 0 and progress.correct_answers > 0:
            progress.level += 1
        
        db.session.commit()
        return jsonify({'message': 'Correct!', 'correct_answer': correct_answer})
    else:
        progress = db.session.query(Progress).get(user_id)
        progress.incorrect_answers += 1
        
        # Update the level if the user has answered 5 questions incorrectly
        if progress.incorrect_answers % 5 == 0 and progress.incorrect_answers > 0:
            progress.level = max(1, progress.level - 1)
        db.session.commit()
        return jsonify({'message': 'Incorrect!'})