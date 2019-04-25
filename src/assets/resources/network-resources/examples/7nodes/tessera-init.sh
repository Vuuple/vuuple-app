#!/usr/bin/env bash

echo "[*] Initialising Tessera configuration"

currentDir=$(pwd)

    DDIR="${currentDir}/qdata/c"
    mkdir -p ${DDIR}
    mkdir -p qdata/logs
    cp "keys/tm1.pub" "${DDIR}/tm.pub"
    cp "keys/tm1.key" "${DDIR}/tm.key"
    rm -f "${DDIR}/tm.ipc"

    #change tls to "strict" to enable it (don't forget to also change http -> https)
    cat <<EOF > ${DDIR}/tessera-config.json
{
    "useWhiteList": false,
    "jdbc": {
        "username": "sa",
        "password": "",
        "url": "jdbc:h2:${DDIR}/db;MODE=Oracle;TRACE_LEVEL_SYSTEM_OUT=0",
        "autoCreateTables": true
    },
    "server": {
        "port": 9000,
        "hostName": "http://0.0.0.0",
        "sslConfig": {
            "tls": "OFF",
            "generateKeyStoreIfNotExisted": true,
            "serverKeyStore": "${DDIR}/server-keystore",
            "serverKeyStorePassword": "quorum",
            "serverTrustStore": "${DDIR}/server-truststore",
            "serverTrustStorePassword": "quorum",
            "serverTrustMode": "TOFU",
            "knownClientsFile": "${DDIR}/knownClients",
            "clientKeyStore": "${DDIR}/client-keystore",
            "clientKeyStorePassword": "quorum",
            "clientTrustStore": "${DDIR}/client-truststore",
            "clientTrustStorePassword": "quorum",
            "clientTrustMode": "TOFU",
            "knownServersFile": "${DDIR}/knownServers"
        }
    },
      "peer": [
               {
                   "url": "http://3.14.2.131:9000"
               },
               {
                   "url": "http://3.18.34.201:9000"
               },
               {
                   "url": "http://3.18.204.171:9000"
               },
               {
                   "url": "http://3.19.116.28:9000"
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

    cat <<EOF > ${DDIR}/tessera-config-enhanced.json
{
    "useWhiteList": false,
    "jdbc": {
        "username": "sa",
        "password": "",
        "url": "jdbc:h2:${DDIR}/db;MODE=Oracle;TRACE_LEVEL_SYSTEM_OUT=0",
        "autoCreateTables": true
    },
    "serverConfigs":[
        {
            "app":"ThirdParty",
            "enabled": true,
            "serverSocket":{
                "type":"INET",
                "port": 9080,
                "hostName": "http://0.0.0.0"
            },
            "communicationType" : "REST"
        },
        {
            "app":"Q2T",
            "enabled": true,
            "serverSocket":{
                "type":"UNIX",
                "path":"${DDIR}/tm.ipc"
            },
            "communicationType" : "UNIX_SOCKET"
        },
        {
            "app":"P2P",
            "enabled": true,
            "serverSocket":{
                "type":"INET",
                "port": 9000,
                "hostName": "http://0.0.0.0"
            },
            "sslConfig": {
                "tls": "OFF",
                "generateKeyStoreIfNotExisted": true,
                "serverKeyStore": "${DDIR}/server-keystore",
                "serverKeyStorePassword": "quorum",
                "serverTrustStore": "${DDIR}/server-truststore",
                "serverTrustStorePassword": "quorum",
                "serverTrustMode": "TOFU",
                "knownClientsFile": "${DDIR}/knownClients",
                "clientKeyStore": "${DDIR}/client-keystore",
                "clientKeyStorePassword": "quorum",
                "clientTrustStore": "${DDIR}/client-truststore",
                "clientTrustStorePassword": "quorum",
                "clientTrustMode": "TOFU",
                "knownServersFile": "${DDIR}/knownServers"
            },
            "communicationType" : "REST"
        }
    ],
   "peer": [
               {
                   "url": "http://3.14.2.131:9000"
               },
               {
                   "url": "http://3.18.34.201:9000"
               },
               {
                   "url": "http://3.18.204.171:9000"
               },
               {
                   "url": "http://3.19.116.28:9000"
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
    "alwaysSendTo": []
}
EOF

cat <<EOF > ${DDIR}/tessera-config-09.json
{
    "useWhiteList": false,
    "jdbc": {
        "username": "sa",
        "password": "",
        "url": "jdbc:h2:${DDIR}/db;MODE=Oracle;TRACE_LEVEL_SYSTEM_OUT=0",
        "autoCreateTables": true
    },
    "serverConfigs":[
        {
            "app":"ThirdParty",
            "enabled": true,
            "serverAddress": "http://0.0.0.0:9080",
            "communicationType" : "REST"
        },
        {
            "app":"Q2T",
            "enabled": true,
             "serverAddress":"unix:${DDIR}/tm.ipc",
            "communicationType" : "REST"
        },
        {
            "app":"P2P",
            "enabled": true,
            "serverAddress":"http://3.14.2.131:9000",
            "sslConfig": {
                "tls": "OFF",
                "generateKeyStoreIfNotExisted": true,
                "serverKeyStore": "${DDIR}/server-keystore",
                "serverKeyStorePassword": "quorum",
                "serverTrustStore": "${DDIR}/server-truststore",
                "serverTrustStorePassword": "quorum",
                "serverTrustMode": "TOFU",
                "knownClientsFile": "${DDIR}/knownClients",
                "clientKeyStore": "${DDIR}/client-keystore",
                "clientKeyStorePassword": "quorum",
                "clientTrustStore": "${DDIR}/client-truststore",
                "clientTrustStorePassword": "quorum",
                "clientTrustMode": "TOFU",
                "knownServersFile": "${DDIR}/knownServers"
            },
            "communicationType" : "REST"
        }
    ],
    "peer": [
               {
                   "url": "http://3.14.2.131:9000"
               },
               {
                   "url": "http://3.18.34.201:9000"
               },
               {
                   "url": "http://3.18.204.171:9000"
               },
               {
                   "url": "http://3.19.116.28:9000"
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
    "alwaysSendTo": []
}
EOF

