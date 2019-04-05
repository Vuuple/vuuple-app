#!/bin/bash
set -u
set -e

  DDIR="qdata/c8"
    mkdir -p $DDIR
    mkdir -p qdata/logs
    cp "keys/tm8.pub" "$DDIR/tm.pub"
    cp "keys/tm8.key" "$DDIR/tm.key"
    rm -f "$DDIR/tm.ipc"
    CMD="constellation-node --url=https://127.0.0.1:9008/ --port=9008 --workdir=$DDIR --socket=tm.ipc --publickeys=tm.pub --privatekeys=tm.key --othernodes=https://3.18.34.201:21000/"
    echo "$CMD >> qdata/logs/constellation8.log 2>&1 &"
    $CMD >> "qdata/logs/constellation8.log" 2>&1 &

DOWN=true
while $DOWN; do
    sleep 0.1
    DOWN=false
 	if [ ! -S "qdata/c8/tm.ipc" ]; then
            DOWN=true
	fi
done
