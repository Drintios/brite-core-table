// Assuming you have already done "npm install fernet"
let fernet = require('fernet');
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=');
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcP5e1H-gXWnQhLsK3TNSnckHjJoHk5NYmSPp1Qe2fLUBhIN0dBu8wf0m98hOY7_1kho97ZdSK7TpjVav_XSHv9Uprzr7U69iNz_UGjbZ7JzpbbL8pA1a1VkTCtKTsSaFvbj1yALv1_bY3Kt-gtN04k7pkd3BxsweARVS-dHs1I4xx2fYw3zWCN6O8_re-D0VmG0Jb';
let token = new fernet.Token({secret: secret, token: message, ttl:0});
console.log(token.decode());