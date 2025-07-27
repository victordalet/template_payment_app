import sys
from flask import Flask, redirect, request
import stripe
from email_sender import (
    App as Email,
)  # Assuming you have an email module for sending emails

app = Flask(__name__)

stripe.api_key = sys.argv[1]


@app.route("/")
def index():
    price = int(request.args.get("price", 0))
    name = request.args.get("name", "Sample Product")
    return """
    <html>
    <head>
        <title>Checkout</title>
        <style>
            body {{ font-family: Arial, sans-serif; background: #f7fafc; }}
            .container {{ max-width: 400px; margin: 60px auto; background: #fff; padding: 32px; border-radius: 12px; box-shadow: 0 2px 8px #e2e8f0; }}
            h2 {{ text-align: center; color: #2d3748; }}
            label {{ display: block; margin-top: 16px; color: #4a5568; }}
            input[type="text"], input[type="email"], input[type="tel"] {{
                width: 100%; padding: 10px; margin-top: 6px; border: 1px solid #cbd5e0; border-radius: 6px;
            }}
            button {{
                width: 100%; margin-top: 24px; padding: 12px; background: #4299e1; color: #fff; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;
                transition: background 0.2s;
            }}
            button:hover {{ background: #2b6cb0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <form action="/payment" method="get">
                <input type="hidden" name="price" value="{price}">
                <input type="hidden" name="name" value="{name}">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required>
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
    </body>
    </html>
    """.format(
        name=name, price=price
    )


@app.route("/success", methods=["GET"])
def success():
    email = request.args.get("email")
    phone = request.args.get("phone")
    article = request.args.get("name", "Sample Product")
    price = request.args.get("price", 0)
    Email(
        sys.argv[2],
        sys.argv[3],
        "smtp.gmail.com",
        "/template.html",
        sys.argv[4],
        f"Payment for {article} of {price} USD",
        article,
        price,
        email,
        phone,
    )

    return """
    <html>
    <head>
        <title>Payment Successful</title>
        <style>
            body {{ font-family: Arial, sans-serif; background: #f7fafc; text-align: center; padding: 50px; }}
            h1 {{ color: #2d3748; }}
            p {{ color: #4a5568; }}
        </style>
    </head>
    <body>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
    </body>
    </html>
    """


@app.route("/payment", methods=["GET"])
def payment():
    price = int(request.args.get("price", 0))
    name = request.args.get("name", "Sample Product")
    email = request.args.get("email", "<EMAIL>")
    phone = request.args.get("phone", "")
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": name,
                    },
                    "unit_amount": price * 100,  # $20.00
                },
                "quantity": 1,
            }
        ],
        mode="payment",
        success_url="https://aliceploux.c2smr.frsuccess?email="
        + email
        + "&phone="
        + phone
        + "&name="
        + name
        + "&price="
        + str(price),
        cancel_url="https://aliceploux.c2smr.fr?name=" + name + "&price=" + str(price),
    )
    return redirect(session.url, code=303)


@app.route("/payment", methods=["POST"])
def payment_post():
    data = request.get_json()
    price = int(data.get("price", 2000))
    name = data.get("name", "Sample Product")
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": name,
                    },
                    "unit_amount": price * 100,
                },
                "quantity": 1,
            }
        ],
        mode="payment",
        success_url="https://yourdomain.com/success",
        cancel_url="https://yourdomain.com/cancel",
    )
    return redirect(session.url, code=303)


if __name__ == "__main__":
    app.run(port=80)
