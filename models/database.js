//Setting mongoose
var mongoose = require('mongoose');
//connection path
var mURI = 
	  process.env.MONGOLAB_URI || 
	  'mongodb://localhost:27017/test';
//connect DB
db = mongoose.connect(mURI, function (err, res) {
	  if (err) { 
	    console.log ('ERROR connecting to: ' + mURI + '. ' + err);
	  } else {
	    console.log ('Succeeded connected to: ' + mURI); 
	  }
});

//Define Schema

var MovieSchema = new mongoose.Schema({
	Title:String, //タイトル
	Year:String, //公開年度
	Actor:String, //俳優
	Visor:String, //監督
	Link:String, //Amazon
	Rakuten:String, //楽天
	Yahoo:String, //Yahoo
	Meigen:String, //名言
	Story:String, //あらすじ
	Image:String, //画像イメージ
	Type:String, //名言タイプ
	Era:String, //時代
	Job:String, //職業
	Age:String, //年齢
	Gift:String, //特殊能力
	Origin:String, //発生元
	OWords:String, //原文
	Scene:String, //場面
	SadParam:Number, //泣けるパラメータ
	LaughParam:Number, //笑えるパラメータ
	HealParam:Number, //癒されるパラメータ
	MotivateParam:Number //やる気パラメータ
});

mongoose.model('Movie',MovieSchema);
