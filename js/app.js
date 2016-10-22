var app = angular.module("myApp", []);

app.controller("dataController", function($scope, $http) {
	// $scope.notes = [
	// 	{
	//		id: 1,
	// 		email: 'johndoe@gmail.com',
	// 		text: 'This is my first note!',
	// 		private: false
	// 	},
	// ];

	$scope.notes = [];

	$scope.fetchNotes = function() {
		// grab all notes from model
		$http.get("data.php")
		.then(function(response) {
			console.log(response);
			$scope.notes = response.data.result !== false ?  response.data : [];	
		});
	};

	$scope.addNote = function() {
		var obj = {
			email: $scope.email,
			text: $scope.text,
			private: $scope.private || false
		};

		var data = angular.toJson(obj);

		$http.post('data.php', data)
		.success(function (data, status, headers, config) {
			console.log('success: '+ JSON.stringify(data) + 'codigo: ' + status);
			$scope.fetchNotes();
		})
		.error(function (data, status, header, config) {
			console.log('error: ' + data + status + status + header + config);
		});
		//clean fields
		$scope.email = '';
		$scope.text = '';

	};

	$scope.removeNote = function(el) {
		var index = el.note.id;		
		console.log(el);
		var data = {user: index};
		console.log(data);

		$http({
			method: 'DELETE',
			url: 'data.php',
			data: data,
			headers: {
				'Content-type': 'application/json;charset=utf-8'
			}
		})
		.then(function(response) {
			console.log(response.data);
			$scope.fetchNotes();
		}, function(rejection) {
			console.log(rejection.data);
		});
	};

	//pending connect
	$scope.switchPrivacityNote = function(el) {
		var index = el.$index;
		console.log(index);
		var obj = $scope.notes[index].private = !$scope.notes[index].private;
		console.log(obj);
	};

	//load notes
	$scope.fetchNotes();

});