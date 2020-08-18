const BitcoinRpc = require('bitcoin-rpc-promise');
var sleep = require('sleep')
var fs = require('fs');
var path = 'path_to_store_good_nodes_that_send_blocks'
var timestamp = Date.now()
var shell = require('shelljs')
//Get RPC User Name And Password
let btc = new BitcoinRpc('http://rpc_user_name:rpc_password@127.0.0.1:8332');
function check (old_height){
btc.call('getchaintips').then(answer => {
var info = answer; 
var height = info[0].height
if (height != old_height){
	update(height);  
}

if (height == old_height){
	sleep.usleep(100);
  check(height);
}

}); }

function update(newvar){ 
btc.call('getpeerinfo').then(result => {
  var answer = result;

  for(var i=0; i < result.length; i++){
  	if(result[i].inflight[0]== newvar){
  		fs.appendFileSync(path+timestamp+'.txt', 'bitcoin-cli addnode '+result[i].addr+ ' \"onetry\" \n');
  	}
  }
shell.exec('parallel -j 100 < '+path+timestamp+'.txt')
});  
check(newvar);
}

check(600889)