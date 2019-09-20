#!/usr/bin/env bash

echo "[*] Initialising Tessera configuration"

currentDir=$(pwd)
 DDIR="${currentDir}/qdata/c8"
    mkdir -p ${DDIR}
    mkdir -p qdata/logs
    cp "keys/tm8.pub" "${DDIR}/tm.pub"
    cp "keys/tm8.key" "${DDIR}/tm.key"
    rm -f "${DDIR}/tm.ipc"

    #change tls to "strict" to enable it (don't forget to also change http -> https)
    cat <<EOF > ${DDIR}/tessera-config8.json
{
    "useWhiteList": false,
    "jdbc": {
        "username": "sa",
        "password": "",
        "url": "jdbc:h2:${DDIR}/db8;MODE=Oracle;TRACE_LEVEL_SYSTEM_OUT=0"
    },
    "server": {
        "port": 9008,
        "hostName": "http://localhost",
        "sslConfig": {
            "tls": "OFF",
            "generateKeyStoreIfNotExisted": true,
            "serverKeyStore": "${DDIR}/server8-keystore",
            "serverKeyStorePassword": "quorum",
            "serverTrustStore": "${DDIR}/server-truststore",
            "serverTrustStorePassword": "quorum",
            "serverTrustMode": "TOFU",
            "knownClientsFile": "${DDIR}/knownClients",
            "clientKeyStore": "${DDIR}/client8-keystore",
            "clientKeyStorePassword": "quorum",
            "clientTrustStore": "${DDIR}/client-truststore",
            "clientTrustStorePassword": "quorum",
            "clientTrustMode": "TOFU",
            "knownServersFile": "${DDIR}/knownServers"
        }
    },
      "peer": [

                  {
                      "url": "http://172.27.150.7:24001"
                  },
                  {
                      "url": "http://172.27.150.7:24002"
                  },
                  {
                      "url": "http://172.27.150.7:24003"
                  },
                  {
                      "url": "http://172.27.150.7:24004"
                  },
                  {
                      "url": "http://172.27.150.7:24005"
                  }
                  ,
                  {
                      "url": "http://172.27.150.7:24006"
                  }
                  ,
                  {
                      "url": "http://172.27.150.7:24007"
                  }
              ],
    "keys": {
        "passwords": [],
        "keyData": [
            {
                "privateKeyPath": "${DDIR}/tm.key",
                "publicKeyPath": "${DDIR}/tm.pub"
            }
        ]
    },
    "alwaysSendTo": [],
    "unixSocketFile": "${DDIR}/tm.ipc"
}
EOF
