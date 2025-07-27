import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class App:
    def __init__(
        self,
        email: str = None,
        password: str = None,
        smtp: str = None,
        html_file: str = None,
        email_to_send: str = None,
        subject: str = None,
        product: str = None,
        price: int = 0,
        email_client: str = "",
        phone: str = None,
    ):
        self.email: str = email
        self.password: str = password
        self.smtp: str = smtp
        self.html_file: str = html_file
        self.email_to_send: str = email_to_send
        self.subject: str = subject
        self.product = product
        self.price = price
        self.email_client = email_client
        self.phone_client = phone

        self.server = self.init_email_context()
        self.send_email(self.email_to_send)

    def init_email_context(self):
        context = ssl.create_default_context()
        server = smtplib.SMTP(self.smtp, 587)
        server.starttls(context=context)
        server.login(self.email, self.password)
        return server

    def send_email(self, email):
        with open(self.html_file, "r") as file:
            html = file.read()
        html = html.format(
            article=self.product,
            price=self.price,
            email_client=self.email_client,
            phone_client=self.phone_client,
        )
        msg = MIMEMultipart("alternative")
        msg["Subject"] = self.subject
        msg["From"] = self.email
        msg["To"] = email
        part = MIMEText(html, "html")
        msg.attach(part)
        self.server.sendmail(self.email, email, msg.as_string())
