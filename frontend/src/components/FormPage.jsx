import { useState } from "react";
import axios from "axios";

const FormPage = () => {
  const [formData, setFormData] = useState({
    age: "",
    annual_income: "",
    monthly_salary: "",
    num_bank_accounts: "",
    num_credit_cards: "",
    interest_rate: "",
    num_loans: "",
    delay_date: "",
    delayed_payments: "",
    changed_limit: "",
    credit_inquiries: "",
    outstanding_debt: "",
    credit_utilization: "",
    credit_history_age: "",
    emi_per_month: "",
    amt_month: "",
    monthly_balance: "",
  });

  const [prediction, setPrediction] = useState(null);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the POST request with the form data
      const response = await axios.post(
        "http://127.0.0.1:5000/api/predict_financial",
        formData
      );
      const predictionValue = response.data.prediction;

      // Map the prediction to cache value
      let cacheValue = null;
      if (predictionValue === "Good") {
        cacheValue = 3;
      } else if (predictionValue === "Neutral") {
        cacheValue = 2;
      } else if (predictionValue === "Bad") {
        cacheValue = 1;
      }

      // Store the prediction value in localStorage
      if (cacheValue !== null) {
        localStorage.setItem("financialPrediction", cacheValue);
      }

      // Store the form data and prediction in the user object in localStorage
      const user = { ...formData, prediction: predictionValue };
      localStorage.setItem("user", JSON.stringify(user));

      // Set the prediction state to show
      setPrediction(predictionValue);
    } catch (error) {
      console.error("Error during prediction", error);
    }
  };

  return (
    <div>
      <h1>Financial Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Annual Income:</label>
          <input
            type="number"
            name="annual_income"
            value={formData.annual_income}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Monthly Salary:</label>
          <input
            type="number"
            name="monthly_salary"
            value={formData.monthly_salary}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Number of Bank Accounts:</label>
          <input
            type="number"
            name="num_bank_accounts"
            value={formData.num_bank_accounts}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Number of Credit Cards:</label>
          <input
            type="number"
            name="num_credit_cards"
            value={formData.num_credit_cards}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Interest Rate:</label>
          <input
            type="number"
            name="interest_rate"
            value={formData.interest_rate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Number of Loans:</label>
          <input
            type="number"
            name="num_loans"
            value={formData.num_loans}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Delay Date (in days):</label>
          <input
            type="number"
            name="delay_date"
            value={formData.delay_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Delayed Payments:</label>
          <input
            type="number"
            name="delayed_payments"
            value={formData.delayed_payments}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Changed Limit (0 or 1):</label>
          <input
            type="number"
            name="changed_limit"
            value={formData.changed_limit}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Credit Inquiries:</label>
          <input
            type="number"
            name="credit_inquiries"
            value={formData.credit_inquiries}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Outstanding Debt:</label>
          <input
            type="number"
            name="outstanding_debt"
            value={formData.outstanding_debt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Credit Utilization (%):</label>
          <input
            type="number"
            name="credit_utilization"
            value={formData.credit_utilization}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Credit History Age (in years):</label>
          <input
            type="number"
            name="credit_history_age"
            value={formData.credit_history_age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>EMI per Month:</label>
          <input
            type="number"
            name="emi_per_month"
            value={formData.emi_per_month}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Amount per Month:</label>
          <input
            type="number"
            name="amt_month"
            value={formData.amt_month}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Monthly Balance:</label>
          <input
            type="number"
            name="monthly_balance"
            value={formData.monthly_balance}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Predict Financial Category</button>
      </form>

      {prediction && <h2>Prediction: {prediction}</h2>}
    </div>
  );
};

export default FormPage;
