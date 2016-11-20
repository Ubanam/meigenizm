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
    .when('/detail/', { controller:'DetailController', templateUrl: 'detail.html#top',reloadOnsearch:false }) // 同様にテンプレ指定（ここでは遷移後）
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

myApp.controller('DetailController',['$scope', '$http','$resource','$anchorScroll','$location','movies', 'shareData', function ($scope, $http, $resource, $anchorScroll, $location, movies, shareData ){ 
/////////////////////////////////////////////////
//初期設定
/////////////////////////////////////////////////
	//Get the movielist data
	$scope.movies = movies.query();
	$scope.data = shareData.data;
	$scope.devoteFlg = false; //投票済判定フラグ
	$scope.showInfo = "info";//初期表示：作品情報

///////////////////////////
//投票する
//data:映画情報
//param:投票種別
///////////////////////////
	$scope.devote = function(data,param){
		console.log("devote is called");
		if(!$scope.devoteFlg){
			switch(param){
				case 1://スッキリ　MotivateParam
					data.MotivateParam = data.MotivateParam + 1;
				break;
				case 2://笑える　LaughParam
					data.LaughParam = data.LaughParam + 1;
				break;
				case 3://恋する LoveParam
					data.LoveParam = data.LoveParam + 1;
				break;
				case 4://泣ける SadParam
					data.SadParam = data.SadParam + 1;
				break;
				case 5://ほのぼの HealParam
					data.HealParam = data.HealParam + 1;
				break;
			}
			data.Rate = data.Rate + 1;	
		}	
		$http.put('/api/movies/rate/'+data._id, data).success(function(data) {
      console.log(data);
    });
		$scope.devoteFlg = true;
		$scope.data.Rate = data.Rate; 
	}
///////////////////////
//詳細ページ
//data:映画情報
//////////////////////
	$scope.moveDetail = function(data){
		//shareData.data =data;
		$scope.data = data;
		//console.log(data);
		$location.hash('top');
		$anchorScroll();
		$scope.devoteFlg = false;
		//ハッシュクリア
	}
///////////////////////
//タブ表示情報
//param:タブ内容
//////////////////////
	$scope.changeInfo = function(param){
		//console.log("$scope.showInfo="+param);
		$scope.showInfo = param;
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