var myApp = angular.module('meigenizm',['ngRoute','ngSanitize','ngResource','ui.bootstrap']);

//////////////////////////////////////////
//Setting Factory
//////////////////////////////////////////
myApp.factory('movies', ['$resource', function($resource){
	var movies = $resource(
	  '/api/movies/:query', 
	  {query:'@query'}, {
		get: {method: 'GET',isArray:true},
		query: {method: 'GET', isArray: true},
		select:{method: 'POST',isArray:true},
		save: {method: 'POST'},
		remove: {method: 'DELETE'}
	});
	return movies;
}]);

myApp.config(['$routeProvider', function($routeProvider,data) {
	$routeProvider
    .when('/index/', { controller:'IndexController', templateUrl: 'main.html' }) // templateUrlでテンプレートとなるファイルとテンプレ名を指定
    .when('/detail/', { controller:'DetailController', templateUrl: 'detail.html' }) // 同様にテンプレ指定（ここでは遷移後）
    .when('/about/', { controller:'AboutController', templateUrl: 'about.html' }) // 同様にテンプレ指定（ここでは遷移後）
    .when('/list/', { controller:'IndexController', templateUrl: 'list.html' }) // 同様にテンプレ指定（ここでは遷移後）
    .otherwise({redirectTo: '/index/'}); // 初めに表示するテンプレ名
		return data;
  }]);

myApp.factory('shareData', function(){
	shareData = {}
	return shareData;	
});

myApp.controller('IndexController',['$scope', '$http', '$location','$resource','movies', 'shareData', function ($scope, $http, $location, $resource, movies, shareData ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.movies = movies.query();

/////////////////////////////////////////////////
//各ページへ遷移
/////////////////////////////////////////////////
	//詳細ページ
	$scope.moveDetail = function(data){
		shareData.data =data;
		$location.path('/detail/');
		console.log(data);
	}
	//メイゲニズムについて
	$scope.moveAbout = function(){
		$location.path('/about/');
	}

	
  //End of Controller	
}]);

myApp.controller('DetailController',['$scope', '$http','$resource','$location','movies', 'shareData', function ($scope, $http, $resource, $location, movies, shareData ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.movies = movies.query();
	$scope.data = shareData.data;
	$scope.devoteFlg = false; //投票済判定フラグ

	
	//投票する
	$scope.devote = function(data){
		console.log("devote is called");
		$http.put('/api/movies/rate/'+data._id, data).success(function(data) {
      console.log(data);
    });
		$scope.devoteFlg = true;
		$scope.data.Rate = $scope.data.Rate + 1; 
	}
	//詳細ページ
	$scope.moveDetail = function(data){
		//shareData.data =data;
		$scope.data = data;
		console.log(data);
	}
  //End of Controller	
	
}]);

myApp.controller('AboutController',['$scope', '$http','$resource','$location','movies', 'shareData', function ($scope, $http, $resource, $location, movies, shareData ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.movies = movies.query();
	$scope.data = shareData.data;


  //End of Controller	
	
}]);