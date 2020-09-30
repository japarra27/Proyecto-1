#!/bin/bash

# install packages
sudo apt-get -y update

# configure postgresql
sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl

# configure virtualenv
sudo apt-get -y install virtualenv

# Configure python env
virtualenv -p python3 venv
sudo apt -y update
sudo apt -y upgrade
sudo apt -y install python3-pip
