"use strict";
const path = require("path");
const PROTO_PATH = path.join("proto", "messages.proto");
const fs = require("fs");
const process = require("process");
const grpc = require("grpc");
// const protoLoader = require('@grpc/proto-loader');
// const serviceDef = protoLoader.loadSync(PROTO_PATH);
const serviceDef = grpc.load(PROTO_PATH);

const PORT = 9000;
/*
  const cacert = fs.readFileSync("certs/ca.crt"),
    cert = fs.readFileSync("certs/client.crt"),
    key = fs.readFileSync("certs/client.key"),
    kvpair = {
      private_key: key,
      cert_chain: cert
    };
  const creds = grpc.credentials.createSsl(cacert, key, cert);
*/
const creds = grpc.credentials.createInsecure();
const client = new serviceDef.EmployeeService(`DESKTOP-AON6DU0:${PORT}`, creds);

const option = parseInt(process.argv[2], 10);

switch (option) {
  case 1:
    sendMetadata(client);
    break;

  case 2:
    getByBadgeNumber(client);
    break;

  case 3:
    getAll(client);
    break;

  case 4:
    addPhoto(client);
  break;

  case 5:
    saveAll(client);
  break;
  default:
    break;
}

function saveAll(client) {
  const employees = [
    {
      id: 1,
      badgeNumber: 2080,
      firstName: "Umar",
      lastName: "Javed",
      vacationAccruralRate: 2.5,
      vacationAccrued: 25,
    },
    {
      id: 2,
      badgeNumber: 7538,
      firstName: "Ali",
      lastName: "Naeem",
      vacationAccruralRate: 1.5,
      vacationAccrued: 20,
    },
  ];

  const call = client.saveAll();
  call.on('data', function(emp) {
    console.log(emp.employee);
  });
  employees.forEach(function(emp) {
    call.write({employee: emp});
  });
  call.end();
}

function addPhoto(client) {
  const md = new grpc.Metadata();
  md.add('badgenumber', '2080');

  const call = client.addPhoto(md, function(err, result) {
    console.log(result);
  });

  const stream = fs.createReadStream('img/panguins.jpg');
  stream.on('data', function(chunk) {
    call.write({data: chunk});
  });
  stream.on('end', function() {
    call.end();
  })
}

function getAll(client) {
  const call = client.getAll({});

  call.on("data", function(data) {
    console.log(data.employee);
  });
}

function sendMetadata(client) {
  const md = new grpc.Metadata();
  md.add("username", "learning");
  md.add("password", "learning1");

  client.getByBadgeNumber({}, md, function() {});
}

function getByBadgeNumber(client) {
  client.getByBadgeNumber({ badgeNumber: 2080 }, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(response.employee);
    }
  });
}
