#Client App
FROM johnpapa/angular-cli as client-app
LABEL authors="Eman Herawy"
WORKDIR /usr/src/app
COPY ["package.json",  "./"]
RUN apk add --no-cache git
RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

RUN npm install
COPY . .
RUN npm run electron:linux
