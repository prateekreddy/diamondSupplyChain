# diamond-supply-chain

## How to run ?

Easiest way to run the application is using ganache-cli. Ganache-cli is a light weight Ethereum node for development purposes. Truffle is a development framework for running Ethereum based applications.

Both ganache and truffle can be installed globally using the following

`npm install -g ganache-cli truffle`

One installed you can run ganache using
`ganache-cli -d -l 99999999999999`

Then go into the contracts directory which is a truffle project and then run
`truffle compile`

This will compile the contracts taking into account the dependencies between them. Then we can deploy the contracts onto the Ethereum network we start with ganache using
`truffle deploy`

Make sure that a RPC port is accessible at `http://localhost:8545` . If you want to make changes to the RPC port then change the settings in the config.json file in config folder and also in truffle-config file.

Start the application server only after truffle deploy is completed as there are some configuration files updated after that. The application server can be run from the root folder by using
`node server.js`

There is a test script that can be run from tests folder. This script has example usage for all the end points and can be run using
`bash test.sh`

### Using Docker

A Dockerfile is also provided to run the application as a docker container. Blockchain node is not added as part of the docker container to make sure that they are independent of each other.

Docker image for the application can be created by going into the root directory and running
`docker build -t diamondsupplychain .`

Once the image is created, the image can be run to start the application server
`docker run -p 3000:3000 diamondsupplychain`

## API
API for the diamond supply chain server is avilable [here](./config/swagger.yaml)

The application server runs on 3000 port. So the application can be accessed at "http://localhost:3000".