from controllers.financial_model_controller import predict_financial_category
from controllers.sentiment_analysis_controller import analyze_sentiment
from flask import Blueprint, request, jsonify

# Set up a Blueprint for the API routes
api = Blueprint('api', __name__)

# Route for financial prediction
@api.route('/predict_financial', methods=['POST'])
def predict_financial():
    print("Received request for financial prediction")
    data = request.json  # Expecting JSON input from the React app
    prediction = predict_financial_category(data)
    print(f"Prediction result: {prediction}")
    return jsonify({'prediction': prediction})

# Route for sentiment analysis
@api.route('/analyze_sentiment', methods=['POST'])
def analyze():
    print("Received request for sentiment analysis")
    file = request.files.get('file')
    dropdown_value = request.form.get('dropdown')
    if dropdown_value is None:
        print("dropdown is none")
        return jsonify({"error": "Dropdown value is missing"}), 400
    result = analyze_sentiment(file, dropdown_value)
    print(f"Sentiment analysis result: {result}")
    return jsonify(result)

def setup_routes(app):
    app.register_blueprint(api, url_prefix='/api')
    print("Routes are set up successfully.")
