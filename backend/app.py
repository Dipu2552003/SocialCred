from flask import Flask
from flask_cors import CORS  # Importing CORS
from routes import setup_routes

app = Flask(__name__)

# Enable CORS for all routes (or specific routes if needed)
CORS(app)

# Set up the routes by passing the app instance
setup_routes(app)

# Check if Flask app is set up correctly
print("Flask app is set up and ready to run on port 5000")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
