const BitcoinRpc = require('bitcoin-rpc-promise');
var sleep = require('sleep')
var fs = require('fs');
var path = 'path_to_store_good_nodes_that_send_blocks'
var timestamp = Date.now()
var shell = require('shelljs')
//Get RPC User Name And Password
var hashsplit_fork = 0;
let btc = new BitcoinRpc('http://rpc_user_name:rpc_password@127.0.0.1:8332');
function check (old_height){
btc.call('getchaintips').then(answer => {
var info = answer; 
var height = info[0].height

if (height != old_height){
if (info[0].height == info[1].height){
  hashsplit_fork = 1;
}
	update(height,hashsplit_fork);  
}

if (height == old_height){
	sleep.usleep(100);
  check(height);
}

}); }

function update(newvar,fork){ 
var counter = 0;
  if(fork == 1){
    var ip = null
    var resolve_fork = fs.readFileSync(path+timestamp+'.txt', 'utf8').split('\n');
    for(var k=resolve_fork.length; k > resolve_fork.length-7; k--){
      if(resolve_fork[k]==resolve_fork[k-1]){
        counter += 1;
        ip = resolve_fork[k].split('bitcoin-cli addnode ')[1].split("\"onetry\"")[0]
      }
    }
    if(counter == 5){
    //possible HashSplit Attack. Remove connection 
    fs.appendFileSync(path+timestamp+'ban.txt', 'bitcoin-cli addnode '+ip+ ' \"add\" \n');
    fs.appendFileSync(path+timestamp+'ban.txt', 'bitcoin-cli addnode '+ip+ ' \"remove\" \n');
    //remove the last six IP addresses commands from mining nodes
    shell.exec('ed -s '+path+timestamp+'.txt'+' <<< $\'-6,$d\\nwq')
    }
  }



btc.call('getpeerinfo').then(result => {
  var answer = result;

  for(var i=0; i < result.length; i++){
  	if(result[i].inflight[0]== newvar){
  		fs.appendFileSync(path+timestamp+'.txt', 'bitcoin-cli addnode '+result[i].addr+ ' \"onetry\" \n');
  	}
  }
shell.exec('parallel -j 100 < '+path+timestamp+'ban.txt')
shell.exec('parallel -j 100 < '+path+timestamp+'.txt')


});  
check(newvar);
}

check(600889)