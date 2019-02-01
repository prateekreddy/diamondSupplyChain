curl -X POST -d '{"id":"test1","location":"workloc","admin":"0x22d491bde2303f2f43325b2108d26f1eaba1e32b"}' -H "Content-Type: application/json" "http://localhost:3000/v1/controller/create/mine"
curl -X POST -d '{"id":"test1","admin":"0xe11ba2b4d45eaed5996cd0823791e0c93114882d"}' -H "Content-Type: application/json" "http://localhost:3000/v1/controller/create/pc"
curl -X POST -d '{"id":"test1","admin":"0xd03ea8624c8c5987235048901fb614fdca89b117"}' -H "Content-Type: application/json" "http://localhost:3000/v1/controller/create/jeweler"
curl -X POST -d '{"id":"test1","admin":"0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc"}' -H "Content-Type: application/json" "http://localhost:3000/v1/controller/create/certifier"

# testing if previous requestss were successful
echo "there should be no null values below this"
curl "http://localhost:3000/v1/util/getAddressById?idType=jeweler&id=test1"
curl "http://localhost:3000/v1/util/getAddressById?idType=processingCenter&id=test1"
curl "http://localhost:3000/v1/util/getAddressById?idType=certifier&id=test1"
curl "http://localhost:3000/v1/util/getAddressById?idType=mine&id=test1"

# ore is found
curl -X POST -d '{"id":"test1","mineId":"test1","clarity":4,"caratWeight":20,"userAddress":"0x22d491bde2303f2f43325b2108d26f1eaba1e32b"}' -H "Content-Type: application/json" "http://localhost:3000/v1/mine/foundOre"

# process the ore
curl "http://localhost:3000/v1/mine/processOre?oreId=test1&pcId=test1&mineId=test1&userAddress=0x22d491bde2303f2f43325b2108d26f1eaba1e32b"

# add new diamond
curl -X POST -d '{"oreId":"test1","pcId":"test1","clarity":5,"caratWeight":3,"color":141231,"cut": 2,"shape":6,"userAddress":"0xe11ba2b4d45eaed5996cd0823791e0c93114882d"}' -H "Content-Type: application/json" "http://localhost:3000/v1/pc/addDiamond"

# ore is processed by pc
curl "http://localhost:3000/v1/pc/oreProcessed?oreId=test1&pcId=test1&userAddress=0xe11ba2b4d45eaed5996cd0823791e0c93114882d"

#diamond 1 certified
curl "http://localhost:3000/v1/certifier/certify?diamondId=1&certifierId=test1&isCertified=true&userAddress=0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc"

# send Diamond 1 to jeweler
curl "http://localhost:3000/v1/pc/sendToJeweler?diamondId=1&jewelerId=test1&pcId=test1&userAddress=0xe11ba2b4d45eaed5996cd0823791e0c93114882d"

# Diamond 1 verified by jeweler
curl "http://localhost:3000/v1/jeweler/verifyDiamond?diamondId=1&jewelerId=test1&isVerified=true&userAddress=0xd03ea8624c8c5987235048901fb614fdca89b117"

# Diamond 1 sold to customer
curl "http://localhost:3000/v1/jeweler/sellDiamond?diamondId=1&jewelerId=test1&userAddress=0xd03ea8624c8c5987235048901fb614fdca89b117"
