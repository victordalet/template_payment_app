FROM python:3.10-slim

COPY requirements.txt /requirements.txt

RUN pip install --no-cache-dir -r /requirements.txt

COPY ./ /

EXPOSE 4242

CMD python app.py ${STRIPE_API_KEY} ${EMAIL_ADDRESS} ${EMAIL_PASSWORD} ${EMAIL_TO_ALERT}