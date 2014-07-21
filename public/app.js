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
.filter('timeFilter', [function () {
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
.filter('translate', [function () {
  return function (logs) {
    var config = { 'Error': 'danger', 'Info': 'info', 'Debug': 'warning' };
    return logs.map(function (e) {
      var type = e.type;
      if (!config[type]) return e;
      e.type = config[type];
      if (type == 'Info') {
        var tmp = JSON.parse(e.log);
        if (tmp.request) { // Client Request
          e.request = translateRequest(tmp.request);
          e.response = translateResponse(tmp.response);
          e.origin = false;
          delete e.log;
        }
      } else {
        e.origin = true;
      }
      return e;
    });
  }
}])
.controller('LogCtrl', ['$scope', 'socket', function (scope, socket) {
  scope.text = 0;
  scope.logs = [ ];

  var now = new Date();
  scope.timeFrom = new Date(now.getTime() - 6 * 3600 * 1000);
  scope.timeTo = new Date(now.getTime() + 6 * 3600 * 1000);

  socket.on('logging', function (msg) {
    try {
      scope.logs.push(JSON.parse(msg));
    } catch (err) {
      console.log(err.message, msg);
    }
  });
}])
