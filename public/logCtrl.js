translateConfig = {
  request: {
    0: {title: '同步数据'},
    1: {title: '进入副本'},
    3: {title: '探索'},
    4: {title: '攻击'},
  },
  response: {
  }
};

translateRequest = function (request) {
  var cfg = translateConfig.request[request.CMD];
  var result = request.RID+'请求';
  result += cfg.title+':';
  result += JSON.stringify(request.arg);
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
