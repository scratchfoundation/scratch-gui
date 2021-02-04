#!/bin/bash

# MUST run in folder "scratch-gui"

IMAGE=$1
TARGET=$2
USERNAME=$3
PORT=$4
FLAG=$5
if [ -z "$IMAGE" ] || [ -z "$TARGET" ] || [ -z "$USERNAME" ] || [ -z "$PORT" ]; then
  printf "Usage:
    deploy.sh image ip user_name port [cp-only]
Example:
    bash deploy.sh scratch_gui 192.168.31.222 kxconsole 8601:8601 [cp-only]
"
	exit 0
fi

if [ ! -f "$IMAGE.tar.gz" ];
then
    echo "Building docker image..."
    docker build . -t "$IMAGE" --compress
    docker save -o "$IMAGE".tar.gz "$IMAGE"
fi

echo "12345678" | ssh -tt $USERNAME@$TARGET '
[ ! -d /opt/soft/'"$IMAGE"' ] && sudo mkdir -p /opt/soft/'"$IMAGE"' && sudo chown -R '$USERNAME':'$USERNAME' /opt'

echo "scp -p -C ./"$IMAGE".tar.gz $USERNAME@$TARGET:/opt/soft/'"$IMAGE"'"
scp -p -C ./"$IMAGE".tar.gz $USERNAME@$TARGET:/opt/soft/$IMAGE

if [ -n "$FLAG" ] && [ "$FLAG" == "cp-only" ] ; then
    echo "Skip restarting ScratchGUI, exit"
    exit 0
fi

echo "Starting ScratchGUI..."
echo "12345678" | ssh -tt $USERNAME@$TARGET '
cd /opt/soft/'"$IMAGE"';
sudo docker container stop $(sudo docker container ls -aq -f "ancestor='"$IMAGE"'");
sudo docker load --input '"$IMAGE"'.tar.gz;
sudo docker run -d -p '"$PORT"' '"$IMAGE"';
sudo docker container rm $(sudo docker container ls -aq -f "status=exited");
sudo docker rmi $(sudo docker images -f "dangling=true" -q --no-trunc);
'
