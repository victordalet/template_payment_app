import sys
from flask import Flask, redirect, request
import stripe

app = Flask(__name__)

stripe.api_key = sys.argv[1] # Replace with your Stripe secret key


@app.route('/payment', methods=['GET'])
def payment():
    price = int(request.args.get('price', 2000))
    name = request.args.get('name', 'Sample Product')
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': name,
                },
                'unit_amount': price * 100,  # $20.00
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url='https://yourdomain.com/success',
        cancel_url='https://yourdomain.com/cancel',
    )
    return redirect(session.url, code=303)


@app.route('/payment', methods=['POST'])
def payment_post():
    data = request.get_json()
    price = int(data.get('price', 2000))
    name = data.get('name', 'Sample Product')
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': name,
                },
                'unit_amount': price * 100,
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
