FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
COPY .env .env
COPY app.py app.py
COPY wsgi.py wsgi.py
RUN pip3 install -r requirements.txt
COPY . .

EXPOSE 5000
CMD [ "gunicorn", "-w", "4", "--bind", "0.0.0.0:5000", "wsgi"]