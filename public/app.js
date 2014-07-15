var logApp = angular.module('logApp', []);

logApp.service('socket', [ '$rootScope', function ($rootScope) {
  var socket = io();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}])
.filter('checkMark', [function () {
  return function (objects, from, to) {
    if (from) from = moment(from);
    if (to) to = moment(to);
    return objects.filter(function (e, index) {
      var now = moment(e.time);
      if (from && now.isBefore(from)) return false;
      if (to && now.isAfter(to)) return false;
      return true;
    });
  }
}])
.controller('LogCtrl', ['$scope', 'socket', function (scope, socket) {
  scope.text = 0;
  scope.logs = [ ];
  socket.on('logging', function (msg) {
    try {
      scope.logs.push(JSON.parse(msg));
    } catch (err) {
      console.log(err.message, msg);
    }
  });
}])