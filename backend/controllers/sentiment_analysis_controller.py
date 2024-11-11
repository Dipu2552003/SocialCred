import pandas as pd
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax
import random

print("Loading sentiment analysis model...")

tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
print("Sentiment analysis Model loaded successfully.")

def get_sentiment(text):
    print("Processing sentiment...")
    chunk_size = 512
    tokens = tokenizer.tokenize(text)
    chunks = [tokens[i:i + chunk_size] for i in range(0, len(tokens), chunk_size)]
    total_scores = {'roberta_neg': 0, 'roberta_neu': 0, 'roberta_pos': 0}
    
    for chunk in chunks:
        chunk_text = tokenizer.convert_tokens_to_string(chunk)
        encoded_text = tokenizer(chunk_text, return_tensors='pt', truncation=True, padding=True, max_length=512)
        output = model(**encoded_text)
        scores = softmax(output[0][0].detach().numpy())
        
        total_scores['roberta_neg'] += scores[0]
        total_scores['roberta_neu'] += scores[1]
        total_scores['roberta_pos'] += scores[2]
    
    total_score_sum = sum(total_scores.values())
    normalized_scores = {key: score / total_score_sum for key, score in total_scores.items()}
    print(f"Sentiment scores: {normalized_scores}")
    return normalized_scores

def analyze_sentiment(file, dropdown_value):
    print(f"Analyzing sentiment for file: {file.filename}")
    df = pd.read_csv(file)
    combined_text = ' '.join(df.astype(str).apply(' '.join, axis=1))
    sentiment = get_sentiment(combined_text)

    # Determine the result based on sentiment scores
    if sentiment['roberta_pos'] > sentiment['roberta_neg'] and sentiment['roberta_pos'] > sentiment['roberta_neu']:
        label, score = 'POSITIVE', sentiment['roberta_pos']
        credit_score = assign_credit_score(dropdown_value, positive=True)
    elif sentiment['roberta_neg'] > sentiment['roberta_pos'] and sentiment['roberta_neg'] > sentiment['roberta_neu']:
        label, score = 'NEGATIVE', sentiment['roberta_neg']
        credit_score = assign_credit_score(dropdown_value, positive=False)
    else:
        label, score = 'NEUTRAL', sentiment['roberta_neu']
        credit_score = assign_credit_score(dropdown_value, neutral=True)

    print(f"Sentiment analysis result: {label}, {score}, Credit score: {credit_score}")
    return {'label': label, 'score': score, 'credit_score': credit_score}

def assign_credit_score(dropdown_value, positive=False, neutral=False):
    """
    Function to assign a credit score based on the dropdown value and sentiment.
    The dropdown_value is used as an integer multiplier for the credit score calculation.
    """
    dropdown_value = int(dropdown_value)  # Ensure dropdown_value is treated as an integer
    
    if positive:
        # Calculate credit score for positive sentiment
        return random.randint(550 + 150 * 1, 700 + 150 * dropdown_value)
    elif neutral:
        # Calculate credit score for neutral sentiment
        return random.randint(550 + 100 * 2, 650 + 100 * dropdown_value)
    else:
        # Calculate credit score for negative sentiment
        return random.randint(300 + 100 * 3, 400 + 100 * dropdown_value)
