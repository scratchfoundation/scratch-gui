#!/usr/bin/env python3
import sys
from base64 import b64encode

try:
    fname = sys.argv[1]
except IndexError:
    print("Supply file to Base 64 encode as command line argument")
    sys.exit(-1)

with open(fname, 'r') as f:
    print('data:image/svg+xml;base64,',b64encode(f.read().encode('ascii')).decode('utf-8'), sep='')
