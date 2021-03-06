'use strict';
app.controller('addPerson',['$scope','Api','$ionicPopup','$cordovaToast','Toast', '$http', 'API_URL', 'Upload', '$timeout',function($scope,Api,$ionicPopup,$cordovaToast,Toast, $http, API_URL,Upload,$timeout) {
	  $scope.new_person=[];
	  $scope.new_person = {
	  		 name: '',
	  		 email: '',
	  		 companyname: '',
	  		 zipcode: '',
	  		 zonefrom: "",
	  		 zoneto: "",
	  		 favcoffee: ''
	  };
	$scope.log = '';
	
	$scope.newPerson = function(){
		Toast.show("Getting New User");
		$http.get(API_URL + '/random-user')
		.success(function(data){
			
		var arrayDrink=['Americano','Cappuccino','Decaf Coffee','Espresso','Regular Coffee','Tea'];	
		var arrayCities=['new york','Los angeles','denver','houston','phoenix','San Antonio','San Diego','Dallas','San Jose','Austin','Jacksonville','san francisco','indianapolis',
		'columbus','Fort Worth','Charlotte','Detroit','El Paso','Seattle'];
		var arrayStates=['ny','ca','il','co','tx','ca','tx','ca','tx','fl','ca','in','oh','tx','nc','mi','tx','wa'];	
		var pos=Math.floor((Math.random() * 6) + 0);
		var randomCity=Math.floor((Math.random() * 20) + 0);
			$scope.coffee=arrayDrink[pos];
			$scope.new_person = data.user;
			$scope.new_person.state=arrayStates[randomCity];
			$scope.new_person.city=arrayCities[randomCity];
			$scope.new_person.message=$scope.new_person.posts[0].sentence;
			
		})
	} // end function
	

        $scope.uploadFiles = function(file) {
        $scope.f = file;
        if (file && !file.$error) {
        	
            file.upload = Upload.upload({
                url:API_URL + '/upload',
                method: 'POST',
                file: $scope.f,
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.info("**** OK FILE ",file.result);
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                    console.info("*** ERROR ",$scope.errorMsg);
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                                       evt.loaded / evt.total));
            });
        }   
    }
    
    
    
    
	$scope.addPerson = function(){
		
			
		if($scope.new_person.name===''){
			Toast.show("Generate a person.", 30);
			return;
		}	
		  var people = {
		  		 name: $scope.new_person.name,
		  		 email: $scope.new_person.email,
		  		 companyname: $scope.new_person.company.name,
		  		 zipcode: $scope.new_person.address.zipcode,
		  		 zonefrom: "",
		  		 zoneto: "",
		  		 favcoffee: $scope.coffee,
		  		 state:$scope.new_person.state,
		  		 city:$scope.new_person.city,
		  		 message:$scope.new_person.message
		  };
		
		
			
		  $http.post(API_URL + '/add-people', { people: people }).
          then(function(response) {
             Toast.show("Sending Request....", 30);
             $scope.new_person=[];
             $scope.coffee="";
          }, function(response) {
              Toast.show(response.statusText + " "+ response.data.error, 30);
         });
	}
	
}]);