from phi.assistant import Assistant
from phi.llm.anthropic import Claude
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Verify API key is loaded
if not os.getenv("ANTHROPIC_API_KEY"):
    raise ValueError("ANTHROPIC_API_KEY not found in environment variables")

# Create an AI assistant
assistant = Assistant(
    name="Simple AI Agent",
    llm=Claude(
        model="claude-2.1",
        temperature=0.7,
    ),
    description="I am a helpful AI assistant that can answer questions and help with tasks.",
    instructions=[
        "Be friendly and helpful",
        "Provide clear and concise answers",
        "If you're not sure about something, say so",
    ],
)

# Function to chat with the assistant
def chat_with_assistant():
    print("🤖 AI Assistant: Hello! How can I help you today? (Type 'exit' to quit)")
    
    while True:
        user_input = input("👤 You: ")
        
        if user_input.lower() == 'exit':
            print("🤖 AI Assistant: Goodbye!")
            break
            
        # Get the response and handle the generator
        response_generator = assistant.chat(user_input)
        full_response = ""
        for response_chunk in response_generator:
            if hasattr(response_chunk, 'content'):
                full_response += response_chunk.content
            else:
                full_response += str(response_chunk)
        
        print(f"🤖 AI Assistant: {full_response}")

if __name__ == "__main__":
    chat_with_assistant() 