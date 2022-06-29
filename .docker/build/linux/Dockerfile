FROM ubuntu:20.04

RUN apt-get update && apt-get -y install curl

RUN apt-get update && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - &&\
    apt-get -y install nodejs &&\
    npm install -g yarn

# Install build dependencies
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow

RUN apt-get update && apt-get -y install git dpkg fakeroot rpm zip build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
