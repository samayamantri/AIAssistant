from flask import Flask, request, jsonify
from flask_cors import CORS
from assistant import assistant

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return jsonify({"message": "AI Chat Backend is running"})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
            
        # Get the response and handle the generator
        response_generator = assistant.chat(user_message)
        full_response = ""
        for response_chunk in response_generator:
            if hasattr(response_chunk, 'content'):
                full_response += response_chunk.content
            else:
                full_response += str(response_chunk)
        
        return jsonify({'response': full_response})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 