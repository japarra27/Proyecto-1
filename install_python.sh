#!/bin/bash

# clone the project
# git clone https://github.com/japarra27/Proyecto-1.git

# install packages
sudo apt-get -y update
sudo apt-get -y install virtualenv

# Configure python env
virtualenv -p python3 venv
sudo apt -y update
sudo apt -y upgrade
sudo apt -y install python3-pip

# Install redis
sudo apt-get install redis-server

# start redis
sudo service redis-server start

# install frontapp
sudo apt-get install -y python-software-properties
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash –
sudo apt install -y nodejs
sudo apt install -y npm
npm install tslib
sudo apt install -y build-essential

# Configure nfs
sudo apt install -y nfs-kernel-server