// how to work with a proto file having more than 1 messages as siblings.
var messages = require('./pb/multiple_pb');

var customer = new messages.Customer();
var address = new messages.Address();
// var customerType = new messages.CustomerType();
address.setAddress('123 Main St.');
address.setCity('Faisalabad');
address.setState('PN');
address.setZipCode('38000');

customer.setUsername('abid');
customer.setType(messages.CustomerType.MEMBER);
customer.getEmailAddressList().push('abid@gmail.com');
customer.setAddress(address);

console.log(customer);
console.log(customer.toObject());