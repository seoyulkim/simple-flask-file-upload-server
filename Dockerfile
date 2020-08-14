From ubuntu:18.04
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
COPY . /familyRegister
WORKDIR /familyRegister
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python3"]
CMD ["app.py"]
