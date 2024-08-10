import unittest
from app import create_app, db

class RoutesTestCase(unittest.TestCase):
    
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app.config['WTF_CSRF_ENABLED'] = False
        self.client = self.app.test_client(use_cookies=True)
        
        with self.app.app_context():
            db.create_all()
            
    
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
            
    
    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'Welcome to Litlle Professor Game!')
        
    def test_register_user(self):
        response = self.client.post('/register', json={'username': 'test_user'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json, {'message': 'User created successfully', 'user_id': 1})
        
        response = self.client.post('/register', json={'username': 'test_user'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Username already taken'})
        
    def test_login_user(self):
        response = self.client.post('/register', json={'username': 'test_user'})
        self.assertEqual(response.status_code, 201)
        
        response = self.client.post('/login', json={'username': 'test_user'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'User logged in successfully', 'user_id': 1})
        
        response = self.client.post('/login', json={'username': 'unknown_user'})
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {'error': 'User not found'})
        
    '''def test_logout_user(self):
        response = self.client.post('/register', json={'username': 'test_user'})
        self.assertEqual(response.status_code, 201)
        
        response = self.client.post('/login', json={'username': 'test_user'})
        self.assertEqual(response.status_code, 200)
        
        
        with self.client as client:
            with client.session_transaction() as sess:
                assert '_user_id' in sess
        
        response = self.client.post('/logout', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'User logged out successfully'})'''
        
        
    def test_get_question(self):
        response = self.client.get('/question')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Invalid user ID'})
        
        response = self.client.post('/register', json={'username': 'test_user'})
        self.assertEqual(response.status_code, 201)
        
        response = self.client.get('/question?user_id=1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json.keys(), {'problem', 'level'})
        
        response = self.client.get('/question?user_id=2')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {'error': 'User not found'})
        
        response = self.client.get('/question')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Invalid user ID'})
        
    def test_submit_answer(self):
        response = self.client.post('/answer', json={'user_id': 1, 'answer': 10})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Invalid data'})
        
        response = self.client.post('/register', json={'username': 'test_user'})
        self.assertEqual(response.status_code, 201)
        
        response = self.client.get('/question?user_id=1')
        self.assertEqual(response.status_code, 200)
        problem = response.json['problem']
        answer = eval(problem)
        
        response = self.client.post('/answer', json={'user_id': 1, 'problem':problem, 'answer': answer})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Correct!', 'correct_answer': answer})
        
        response = self.client.post('/answer', json={'user_id': 1, 'problem':problem, 'answer': 0})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Incorrect!'})
        
        response = self.client.post('/answer', json={'user_id': 2, 'problem':problem, 'answer': answer})
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {'error': 'User not found'})
        
        response = self.client.post('/answer', json={'user_id': 1, 'problem':problem, 'answer': 'answer'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Invalid answer'})
        
        
if __name__ == '__main__':
    unittest.main()