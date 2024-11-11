import pickle
import numpy as np

print("Loading financial model...")

try:
    with open('controllers/financial_model.pkl', 'rb') as model_file:
        rfc_model = pickle.load(model_file)
    print("financial_Model loaded successfully.")
except FileNotFoundError:
    print("Error: financial_model.pkl not found.")
except Exception as e:
    print(f"Error loading model: {e}")

# Mapping of prediction classes
class_mapping = {0: 'Bad', 1: 'Neutral', 2: 'Good'}

def predict_financial_category(data):
    print("Predicting financial category...")
    features = np.array([[ 
        data['age'], data['annual_income'], data['monthly_salary'], data['num_bank_accounts'], 
        data['num_credit_cards'], data['interest_rate'], data['num_loans'], data['delay_date'],
        data['delayed_payments'], data['changed_limit'], data['credit_inquiries'], data['outstanding_debt'], 
        data['credit_utilization'], data['credit_history_age'], data['emi_per_month'], 
        data['amt_month'], data['monthly_balance']
    ]])

    # Predict using the loaded model
    prediction = rfc_model.predict(features)
    predicted_category = class_mapping[prediction[0]]
    print(f"Prediction: {predicted_category}")
    return predicted_category
