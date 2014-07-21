(function() {
  var app, express, http, io, dgram, server;

  dgram = require('dgram');

  express = require('express');

  app = express();

  http = require('http').Server(app);

  io = require('socket.io')(http);

  app.use(express["static"](__dirname + '/public'));

  app.get('/', function(req, res) {
    return res.sendfile('index.html');
  });

  io.on('connection', function(socket) {
    io.emit('logging', JSON.stringify({type: 'Error', time: (new Date()).valueOf(), log: '{"msg":"Try to reconnect to fluent.","error":{"code":"ECONNREFUSED","errno":"ECONNREFUSED","syscall":"connect"},"time":"2014-07-16T03:03:44.708Z","pid":3474,"server":"0"}'}));
    io.emit('logging', JSON.stringify({type: 'Info', time: (new Date()).valueOf(), log: '{"endTime":[0,1144613],"request":{"PID":48349,"RID":"faruba","CNF":0,"arg":["qst", "itm"],"CMD":0},"response":[{"NTF":19,"arg":{"qst":[],"syn":182,"clr":true}}],"time":"2014-07-16T01:50:23.705Z","pid":618,"server":"0"}'}));
    io.emit('logging', JSON.stringify({type: 'Info', time: (new Date()).valueOf(), log: '{"endTime":[0,4914452],"request":{"PID":48348,"RID":"Memeda","CNF":4,"arg":{"tar":3,"pos":1,"pos1":0,"pos2":2},"CMD":4},"response":[{"NTF":3,"arg":[[{"act":2,"id":1,"ref":109,"res":1},{"act":109,"id":2,"dey":0.3},{"act":109,"id":101,"num":157,"flg":1,"dey":0.3},{"id":110,"dey":0.3,"tim":0.2,"rag":5}],[{"act":109,"id":3},{"id":201,"pos":18,"typ":2,"pas":"0010"},{"id":202,"pos":18,"rid":19,"hp":17,"ref":127,"typ":1,"dc":5,"eff":21},{"id":201,"pos":6,"typ":2,"pas":"0101"},{"id":202,"pos":6,"rid":19,"hp":17,"ref":128,"typ":1,"dc":5,"eff":21},{"id":201,"pos":3,"typ":0,"pas":"0111"}],{"id":104,"dey":0,"eff":28,"act":100},{"id":7}]}],"time":"2014-07-16T01:53:50.100Z","pid":618,"server":"0"}'}));
    io.emit('logging', JSON.stringify({type: 'Info', time: (new Date()).valueOf(), log: '{"endTime":[0,4000144],"request":{"PID":48348,"RID":"Memeda","CNF":4,"arg":{"tar":9,"pos":2,"pos1":8,"pos2":3},"CMD":4},"response":[{"NTF":3,"arg":[{"id":105,"cd":6},[{"act":1,"id":1,"ref":105,"res":1},{"act":105,"id":2,"dey":0.3},{"act":105,"id":101,"num":908,"flg":2,"dey":0.3},{"id":110,"dey":0.3,"tim":0.2,"rag":5},{"act":0,"id":101,"num":165,"flg":4,"dey":0},{"id":104,"dey":0.3,"eff":3,"act":0}],[{"act":105,"id":3},{"id":201,"pos":17,"typ":2,"pas":"0001"},{"id":202,"pos":17,"rid":19,"hp":17,"ref":131,"typ":1,"dc":5,"eff":21},{"id":201,"pos":1,"typ":2,"pas":"0101"},{"id":202,"pos":1,"rid":19,"hp":17,"ref":132,"typ":1,"dc":5,"eff":21},{"id":201,"pos":9,"typ":0,"pas":"0011"}],{"id":104,"dey":0,"eff":28,"act":100},{"id":7}]}],"time":"2014-07-16T01:53:57.238Z","pid":618,"server":"0"}'}));
    io.emit('logging', JSON.stringify({type: 'Info', time: (new Date()).valueOf(), log: '{"endTime":[0,14490227],"request":{"PID":48349,"RID":"faruba","REQ":5,"CMD":1,"arg":{"stg":133,"initialDataOnly":true}},"response":[{"REQ":5,"RET":0,"arg":{"stage":133,"randSeed":977462,"initialQuests":{},"team":[{"nam":"faruba","gen":1,"cid":1,"hst":3,"hcl":6,"exp":59034,"itm":[{"cid":383,"eh":[{"id":1,"level":39}]},{"cid":382,"eh":[{"id":1,"level":39}]},{"cid":381,"eh":[{"id":1,"level":39}]},{"cid":771,"eh":[{"id":1,"level":39}]},{"cid":380,"eh":[{"id":1,"level":39}]},{"cid":681,"eh":[{"id":1,"level":39}]}]}],"abIndex":526998,"blueStar":0,"baseRank":500}},{"NTF":17,"arg":{"eng":670,"tim":1405475740}}],"time":"2014-07-16T01:55:40.009Z","pid":618,"server":"0"}'}));
    io.emit('logging', JSON.stringify({type: 'Info', time: (new Date()).valueOf(), log:'{"endTime":[0,1901449],"request":{"PID":48348,"RID":"Memeda","CNF":3,"arg":{"tar":3,"pos":0,"pos1":2,"pos2":1},"CMD":3},"response":[{"NTF":3,"arg":[[{"id":103,"sid":3,"typ":7,"cnt":1},{"id":5,"spl":1,"act":117}],[{"act":117,"id":3},{"id":201,"pos":3,"typ":0,"pas":"0111"}]]}],"time":"2014-07-16T01:59:12.390Z","pid":618,"server":"0"}'}));


    return socket.on('disconnect', function() {
      return console.log('A node disconnected');
    });
  });

  http.listen(8000, function() {
    return console.log('Listening on *:8000');
  });

  server = dgram.createSocket('udp4');
  server.on('message',  function(data) {
    return io.emit('logging', data.toString());
  });

  server.bind(9528);

}).call(this);
