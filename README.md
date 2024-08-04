## NodeJs based Kafka consumer using SSL Certificate authentication
This is a sample code in `Node.js` to build a Kafka consumer application that uses SSL Certificate authentication.

### How to setup
- Have the CA Certificate, Client's SSL Key and Certificate in pem format
- In this sample application the pem files are assumed to be available under `src/ssl-certificates`

### Running the application
- clone the code and get into the folder `nodejs-kafka-ssl-consumer`
- execute the command `npm i` from a prompt
- execute the command `npm start`