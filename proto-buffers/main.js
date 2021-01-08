var messages = require('./pb/messages_pb');
var customer = new messages.Customer();
customer.setUsername('learning something');
customer.getEmailAddressList().push('learning@gmail.com');
customer.setUser('learning');
customer.setEmail('learning@gmail.com');
customer.setType(messages.Customer.Type.SPONSOR);

var address = new messages.Customer.Address();
address.setAddress('123 Main St');
address.setCity('Faisalabad');
address.setState('PN');
address.setZipCode('38000');

customer.setAddress(address);

console.log(customer);
console.log(customer.toObject());