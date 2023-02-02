FROM docker.io/library/python:alpine3.17

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY pastel/ pastel/

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0", "pastel:app"]
