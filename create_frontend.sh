#!/bin/bash

# install packages
sudo apt-get -y update

# install frontapp
sudo apt-get install -y python-software-properties
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash –
sudo apt install -y nodejs
sudo apt install -y npm
npm install tslib
sudo apt install -y build-essential
