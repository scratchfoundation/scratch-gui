#!/bin/bash

# MUST run in folder "scratch-gui"

IMAGE=$1

if [ -z "$IMAGE" ]; then
  printf "Usage:
    build_image.sh [image]
Example:
    bash build_image.sh scratch_gui
"
	exit 0
fi

echo "Building docker image..."
docker build . -t "$IMAGE" --compress
docker save -o "$IMAGE".tar.gz "$IMAGE"
