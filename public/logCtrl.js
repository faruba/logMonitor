translateConfig = {
  request: {
    0: {
      title: '同步数据',
      arg: {
        type: "array",
        translate: {
          qst: '任务'
        }
      }
    },
    1: {title: '进入副本'},
    3: {title: '探索'},
    4: {
      title: '攻击', 
      arg: {
        type: "object",
        translate: {
          tar: '目标',
          pos1: '位置1',
          pos2: '位置2',
          pos3: '位置3'
        }
      }
    },
  },
  response: {
  }
};

translateRequest = function (request) {
  var cfg = translateConfig.request[request.CMD];
  var result = request.RID+' 请求 ';
  result += cfg.title+'( ';
  if (cfg.arg) {
    var trans = cfg.arg.translate;
    if (cfg.arg.type == 'array') {
      result += request.arg.map(function (e) {
        if (trans[e]) {
          return trans[e];
        } else {
          return e;
        }
      });
    } else {
      var tmp = [];
      for (var k in request.arg) {
        var e = request.arg[k];
        if (trans[k]) {
          tmp.push(trans[k]+': '+e);
        } else {
          tmp.push(k+': '+e);
        }
      }
      result += tmp;
    }
    for (var k in request.arg) {
      var a = request.arg[k];
    }
  } else {
    result += JSON.stringify(request.arg);
  }
  result += ')';
  return result;
};
translateResponse = function (response) {
  var cfg = translateConfig.response;
  var result = '';
  result += JSON.stringify(response);
  return result;
};
//function LogCtrl ($scope) {
//  $scope.logs = [
//  ];
//  $scope.addTodo = function() {
//    $scope.logs.push($scope.todoText);
//  };
//
//  for (var i = 0; i < 10; i ++) {
//    $scope.logs.push('Log '+ i);
//  }
//
//  //socket.on('logging', function (msg) {
//  //  console.log('Log', msg);
//  //  $scope.logs.push(msg);
//  //});
//  //$scope.socket.on('notify', function (msg) {
//  //  console.log('Notify', msg, $scope.logs);
//  //  $scope.logs.push(msg);
//  //});
//}
