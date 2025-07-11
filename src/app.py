import os
from flask import Flask, redirect, request
import stripe

app = Flask(__name__)

stripe.api_key = ''  # Replace with your Stripe secret key


@app.route('/create-checkout-session', methods=['GET'])
def create_checkout_session():
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': 'Sample Product',
                },
                'unit_amount': 2000,  # $20.00
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url='https://yourdomain.com/success',
        cancel_url='https://yourdomain.com/cancel',
    )
    return redirect(session.url, code=303)


if __name__ == '__main__':
    app.run(port=4242)
