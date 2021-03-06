#!/bin/bash
set -u
set -e

echo "[*] Cleaning up temporary data directories"
rm -rf qdata
mkdir -p qdata/logs

echo "[*] Configuring node 8"
mkdir -p qdata/dd8/{keystore,geth}
cp permissioned-nodes.json qdata/dd8/static-nodes.json
cp raft/nodekey8 qdata/dd8/geth/nodekey
cp keys/key8 qdata/dd8/keystore
geth --datadir qdata/dd8 init genesis.json

#Initialise Tessera configuration
./tessera-init.sh