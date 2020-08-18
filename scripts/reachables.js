const request = require('request');
const BitcoinRpc = require('bitcoin-rpc-promise');
var sleep = require('sleep')
var fs = require('fs');
const arrayDiffer = require('array-differ');
var shell = require('shelljs')
var path = '/desktop/folder/where_you_want_to_save_this/'
var timestamp = Date.now()

request('https://bitnodes.io/api/v1/snapshots/latest', function (error, response, body) {
  var res = JSON.parse(body)
  var nodes = Object.keys(res.nodes)
  for(var i=0; i < nodes.length; i++){
  	//Remove IPv6 or Onion if you don't have IPv6 Support or Tor
    //Save IP addresses of all reachable nodes in a text file
    fs.appendFileSync(path+timestamp+'.txt', 'bitcoin-cli addnode '+nodes[i]+ ' \"onetry\" \n')
  }

//Making Connections to All Reachable Nodes. 
shell.exec('parallel -j 100 < '+path+timestamp+'.txt')
console.log('Connections Made')
});



