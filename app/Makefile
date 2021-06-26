install:
	pip install --upgrade pip &&\
		pip install -r requirements.txt

build:
	docker build -t flask-app .
run-docker:
	docker run -e ENV_FILE_LOCATION="./.env" -i -d -p 5000:5000 flask-app
format:
	black *.py

lint:
	pylint --disable=R,C *.py

test:
	python -m pytest -vv --cov=test_hello.py

run:
	python -m flask run --host=0.0.0.0