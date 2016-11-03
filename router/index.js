var mongoose = require( 'mongoose');
var Movie = mongoose.model( 'Movie');

exports.allData = function(req, res){
	console.log('getALl is called!');
	// movieモデルのfindメソッドで一覧を取得
	Movie.find({}, function(err, movies) {
		if(!err){
			res.json(movies)
			};
		}
	);
};
exports.selectData = function(req, res){
  console.log('getSelected is called!')
  // movieモデルのfindメソッドで一覧を取得
  console.log('getSelected() is executed!');
  var query = req.body;
  Movie.find(query,function(err, movies) {
    if(!err){
      res.json(movies);
    }else{
	  console.log('error occured at selectedData()');
	};
  });
};


exports.updateData = function(req, res){
	var movie = req.body;
	console.log('Update Data ↓');
	console.log(movie);
	Movie.update({ _id: movie._id },
			{ $set: { 
				Title: movie.Title, //タイトル
				Year: movie.Year,   //公開年度
				Actor: movie.Actor, //俳優
				Visor: movie.Visor, //監督
				Meigen: movie.Meigen, //名言
				Story: movie.Story,  //あらすじ
				Image: movie.Image,  //画像
				Type: movie.Type,  //種類
				Era:movie.Era, //時代
				Job:movie.Job, //職業
				Age:movie.Age, //年齢
				Gift:movie.Gift, //特殊能力
				Origin:movie.Origin, //派生元
				OWords:movie.OWords, //原文
				Scene:movie.Scene, //場面
				Link: movie.Link,   //Amazon
				Rakuten:movie.Rakuten,//楽天
				Yahoo:movie.Yahoo,//yahoo
				Recommends1:movie.Recommends1,//関連情報１
				Rec1Text:movie.Rec1Text,//関連情報１
				Recommends2:movie.Recommends2, //関連情報2
				Rec2Text:movie.Rec2Text//関連情報１
				} 
			}, 
			function (err) {
				if(err){
					console.log('error:' + err);
				}		
		res.json(movie);
	});
}

exports.addData = function(req, res){
	var movie = new Movie(req.body);
	console.log(movie);
	//console.log('req.params.Meigen:' + req.params.Meigen);
	movie.save();
	res.json(req.body);
	
}