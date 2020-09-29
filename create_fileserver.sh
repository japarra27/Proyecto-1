#!/bin/bash

# update server
sudo apt-get update

# Configure nfs
sudo apt install -y nfs-kernel-server

# Create folders fileserver
sudo mkdir -p /mnt/fileserver/
sudo mkdir -p /mnt/fileserver/designs_library/
sudo mkdir -p /mnt/fileserver/designs_library/source/
sudo mkdir -p /mnt/fileserver/designs_library/converted/
sudo mkdir -p /mnt/fileserver/designs_library/processing/

# Assign permission
# Follow the tutorial https://vitux.com/install-nfs-server-and-client-on-ubuntu/
sudo chown nobody:nogroup /mnt/fileserver
sudo chmod 777 /mnt/fileserver