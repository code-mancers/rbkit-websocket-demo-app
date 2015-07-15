// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require msgpack.base
//= require_tree .

var ws_protocol = location.hostname == 'localhost' ? 'ws://' : 'wss://';
var ws = new WebSocket(ws_protocol + location.host, ['rbkit']);
ws.onmessage = function(event){
  var type = event.data[0];
  console.log(type == 0 ? 'REP socket:' : 'PUB socket:');
  var message = event.data.slice(1);
  var unescaped_message = unescape(message);
  if(unescaped_message == "ok") {
    console.log(unescaped_message);
  } else {
    console.log(msgpack.unpack(unescaped_message));
  }
}
ws.onclose = function(event) { console.warn(event.reason); }

var help = function() {
  console.log("Try the following commands with `ws.send('<command>')`");
  console.log("start_memory_profile, stop_memory_profile, objectspace_snapshot, trigger_gc, handshake");
  console.log("Type 'help()' to see this message");
}

ws.onopen = function(x) {
  console.log("Connected to Rbkit server!");
  help();
}
