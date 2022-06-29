FROM ubuntu:20.04

RUN apt-get update && apt-get -y install curl

RUN apt-get update && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - &&\
    apt-get -y install nodejs &&\
    npm install -g yarn

# Install build dependencies
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow

RUN apt-get update && apt-get -y install git dpkg fakeroot zip build-essential

RUN apt-get install gnupg ca-certificates &&\
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF &&\
    echo "deb https://download.mono-project.com/repo/ubuntu stable-focal main" | tee /etc/apt/sources.list.d/mono-official-stable.list &&\
    apt-get update &&\
    apt-get -y install wine mono-devel

RUN dpkg --add-architecture i386 && apt-get update && apt-get -y install wine32 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
