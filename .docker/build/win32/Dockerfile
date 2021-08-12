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
RUN apt update && apt -y install zip

RUN apt install gnupg ca-certificates &&\
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF &&\
    echo "deb https://download.mono-project.com/repo/ubuntu stable-focal main" | tee /etc/apt/sources.list.d/mono-official-stable.list &&\
    apt update &&\
    apt -y install wine mono-devel

RUN dpkg --add-architecture i386 && apt-get update && apt -y install wine32
