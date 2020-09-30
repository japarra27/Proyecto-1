#!/bin/bash

# install packages
sudo apt-get -y update

# install frontapp
sudo apt-get install -y python-software-properties
sudo apt install curl
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash –
npm install -g @angular/cli
sudo apt install -y nodejs
sudo apt install -y npm
npm install tslib
sudo apt install -y build-essential
