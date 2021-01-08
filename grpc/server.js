"use strict";
const fs = require("fs");
const path = require("path");
const PROTO_PATH = path.join("proto", "messages.proto");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const serviceDef = protoLoader.loadSync(PROTO_PATH);
const PORT = 9000;
/*
  const cacert = fs.readFileSync("certs/ca.crt"),
    cert = fs.readFileSync("certs/server.crt"),
    key = fs.readFileSync("certs/server.key"),
    kvpair = {
      private_key: key,
      cert_chain: cert
    };

  const creds = grpc.ServerCredentials.createSsl(cacert, [kvpair]);
*/
const creds = grpc.ServerCredentials.createInsecure();
const server = new grpc.Server();
const employees = require("./employees");
// server.addProtoService(serviceDef.EmployeeService.service, {
//   getByBadgeNumber: getByBadgeNumber,
//   getAll: getAll,
//   addPhoto: addPhoto,
//   saveAll: saveAll,
//   save: save
// });
server.addService(serviceDef.EmployeeService, {
  getByBadgeNumber: getByBadgeNumber,
  getAll: getAll,
  addPhoto: addPhoto,
  saveAll: saveAll,
  save: save
});
server.bind(`0.0.0.0:${PORT}`, creds);
console.log(`Starting server on port ${PORT}`);
server.start();

function getByBadgeNumber(call, callback) {
  const md = call.metadata.getMap();
  for (let key in md) {
    console.log(key, md[key]);
  }
  const badgeNumber = call.request.badgeNumber;
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].badgeNumber === badgeNumber) {
      callback(null, { employee: employees[i] });
      return;
    }
  }
  callback("error");
}

function getAll(call) {
  employees.forEach(function(emp) {
    call.write({ employee: emp });
  });
  call.end();
}

function addPhoto(call, callback) {
  const md = call.metadata.getMap();
  for (let key in md) {
    console.log(key, md[key]);
  }
  let result = new Buffer(0);
  call.on("data", function(data) {
    // result = Buffer.concat([result, data.data]);
    result = Buffer.concat([result, data.data]);
    console.log(`Message received with size ${data.data.length}`);
  });
  call.on("end", function() {
    callback(null, { isOk: true });
    console.log(`Total file size: ${result.length} bytes`);
  });
}

function saveAll(call) {
  call.on("data", function(emp) {
    employees.push(emp.employee);
    call.write({employee: emp.employee});
  });
  call.on('end', function() {
    employees.forEach(function(emp){
      console.log(emp);
    });
    call.end();
  });
}

function save() {}

// console.log(PROTO_PATH);
