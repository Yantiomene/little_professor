import random

# Difficulty levels configuration
difficulty_levels = {
    1: {'min': 0, 'max': 10, 'operations': ['+'] },
    2: {'min': 0, 'max': 20, 'operations': ['+', '-'] },
    3: {'min': 0, 'max': 50, 'operations': ['+', '-', '*'] },
    4: {'min': 0, 'max': 100, 'operations': ['+', '-', '*', '/'] },
}


# Utility function to generate a math problem
def generate_problem(level):
    config = difficulty_levels[level]
    num1 = random.randint(config['min'], config['max'])
    num2 = random.randint(config['min'], config['max'])
    operation = random.choice(config['operations'])
    
    #avoid division by zero
    if operation == '/' and num2 == 0:
        num2 = random.randint(1, config['max'])
        
    # check that the result is an integer for division
    if operation == '/' and num1 % num2 != 0:
        num1 = num2 * random.randint(1, 10)
        
    # check if the result is negative for subtraction
    if operation == '-' and num1 < num2:
        num1, num2 = num2, num1
        
    
    problem = f'{num1} {operation} {num2}'
    
    return problem, eval(problem)

