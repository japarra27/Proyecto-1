#!/bin/bash

# clone the project
# git clone https://github.com/Jesus-2129/Proyecto-1.git

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
sudo npm install

# move folders
# sudo mv Proyecto-1/ ~
# sudo mv venv/ ~