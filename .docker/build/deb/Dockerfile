FROM ubuntu:20.04

RUN apt update && apt -y install curl

RUN apt update && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - &&\
    apt -y install nodejs &&\
    npm install -g yarn

# Install build dependencies
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow

RUN apt update && apt -y install git dpkg fakeroot
