app.controller('deviceCtrl', ['$scope', 'Api','$ionicPopup', 'Toast','SessionService', "$http",'API_URL','VisitorsService', function($scope, Api, $ionicPopup, Toast,SessionService, $http, API_URL,VisitorsService) {
    
    $scope.cleanVisitors = VisitorsService.getVisitors();
    $scope.visitors = [];
    
    $scope.$watch('cleanVisitors', function () {
        visitorsToArray($scope.cleanVisitors);
		
	}, true);
	
	function visitorsToArray(oVisitors) {
        var total = 0;
		$scope.visitors = [];
		oVisitors.forEach(function (visitor) {
			// Skip invalid entries so they don't break the entire app.
			if (!visitor || !visitor.name) {
				return;
			}
            $scope.visitors.push(visitor);    
			total++;
		});
		$scope.totalCount = total;
    }
    
    Api.Device.query({}, function(data){
    	$scope.devices=data;
    }); // end query
    
    $scope.form = {};
    $scope.devices = [];
    $scope.listCanSwipe = true;
    
    $scope.cleanSessions = SessionService.getSessions();
    $scope.sessionArray = [];
    
    $scope.$watch('cleanSessions', function () {
        sessionsToArray($scope.cleanSessions);
	}, true);
	
	function sessionsToArray(sessions) {
        var total = 0;
		$scope.sessionArray = [];
		sessions.forEach(function (session) {
			// Skip invalid entries so they don't break the entire app.
			if (!session || !session.deviceName) {
				return;
			}
            $scope.sessionArray.push(session);    
			total++;
		});
		$scope.totalCount = total;
    }
    
    $scope.doRefresh;

    $scope.deleteAll = function(){
        Api.Device.delete({}, function(data){
            $scope.devices = [];
        })
    }
    
    $scope.delete = function(device){
        var confirmPopup = $ionicPopup.confirm({
         title: 'Delete!',
         template: 'Are you sure you want to delete this device? ' +device.tagid
       });
       confirmPopup.then(function(res) {
         if(res) {
            Api.Device.delete({id: device._id}, function(data){
                $scope.doRefresh();
            });
         } 
       });
    }
    
    $scope.addToDatabase = function(){
        Api.Device.save({}, $scope.form, 
        function(data){
            $scope.devices.push(data);
        },
        function(err){
             $scope.showAlert("Error!", err)
        });
    }
    
    $scope.showAlert = function(errTitle, errMsg) {
	   var alertPopup = $ionicPopup.alert({
	     title: errTitle,
	     template: errMsg
	   });
	   alertPopup.then(function(res) {
	     
	   });
	 };
	 
	 $scope.resetSession = function (session) {
         $http.post(API_URL + '/sync', {sessionid : session.sessionid, socketid: session.socketid, action : 'reset', tagId : session.tagId, url : session.serverUrl}).
          then(function(response) {
             Toast.show("Reseting....", 30);
          }, function(response) {
              Toast.show(response.statusText + " "+ response.data.error, 30);
         });
	 };
	 
	 $scope.doRefresh = function() {
        $scope.$broadcast('scroll.refreshComplete');
        Toast.show('Loading...');
        Api.Device.query({}, function(data){
            $scope.devices = data;
            $scope.refreshDataAmount();
        });
    }
    
    $scope.data = {};
    
    $scope.testSession = function(session){
        $ionicPopup.show({
            template:   '<div class="list">'+
                        '<label class="item item-input item-select">'+
                        '<div class="input-label">'+
                            'Select Person'+
                        '</div>'+
                        '<select class="form-control margin-bottom" ng-model="data.name" ng-options="person as person.name for person in visitors"><option></option></select>'+
                      '</label>'+
                    '</div>',
            title: 'Test',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Send</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if(!$scope.data.name){
                            Toast.show("No name selected", 100);
                        }else{
                            $http.post(API_URL + '/remotekiosk', { 
                                name : $scope.data.name.name,
                                favcoffe : $scope.data.name.favcoffe,
                                zipcode : $scope.data.name.zipcode,
                                email : $scope.data.name.email,
                                zonefrom : "IoT",
                                zoneto : session.sessionid,
                                companyname : $scope.data.name.companyname
                            }).
                              then(function(response) {
                                 Toast.show("Sending ....", 30);
                              }, function(response) {
                                  Toast.show(response.statusText + " "+ response.data.error, 30);
                             });
                            
                        }
                    }
                },
                { text: 'Cancel' }
              
            ]
        });
    }
    
    
    $scope.snapshot = function(){
        console.log("Please Smile...");
    }
    
}]);