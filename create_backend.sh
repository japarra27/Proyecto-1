#!/bin/bash

# install packages
sudo apt-get -y update
sudo apt-get -y install virtualenv

# Configure python env
virtualenv -p python3 venv
sudo apt -y update
sudo apt -y upgrade
sudo apt -y install python3-pip
