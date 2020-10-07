#!/bin/sh

if [ -z "$1" ]; then
  echo "A version number must be supplied"
  exit 1
fi

if [ ! -e ".env" ]; then
  echo ".env file does not exist! please create one"
  exit 1
fi

if [ -z `command -v unzip` ]; then
  echo "unzip not installed, installing now"
  sudo apt-get install unzip
fi

echo "Deploying version $1"

cd ~

echo "Cleaning current deployment"

sudo rm -r ~/ENKEL
sudo rm -r ~/STRUDEL

ENKEL_URL="https://github.com/BrownKnight/STRUDEL/releases/download/$1/ENKEL.zip"
STRUDEL_URL="https://github.com/BrownKnight/STRUDEL/releases/download/$1/STRUDEL.zip"

echo "Downloading ENKEL from $ENKEL_URL"
wget -q $ENKEL_URL

echo "Downloading STRUDEL from $STRUDEL_URL"
wget -q $STRUDEL_URL

echo "Unzipping ENKEL"
unzip ENKEL.zip

echo "Unzipping STRUDEL"
unzip STRUDEL.zip

echo "Downloading ENKEL dependencies"
cd ~/ENKEL
npm install --production
cd ~

echo "Generating new keys for ENKEL"
cd ~
ssh-keygen -t rsa -b 4096 -m PEM -f auth -N ""
rm auth.pub
openssl rsa -in auth -pubout -outform PEM -out auth.pub
mv auth ENKEL/auth

echo "Copying env file to ENKEL"
cd ~
cp .env ENKEL/.env

echo "Restarting ENKEL service"
sudo systemctl restart enkel.service

echo "Cleaning up"
sudo rm ENKEL.zip
sudo rm STRUDEL.zip

echo "Done!"
