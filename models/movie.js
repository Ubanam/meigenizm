//Setting mongoose
/*
var mongoose = require('mongoose');
var mURI = 
	  process.env.MONGOLAB_URI || 
	  'mongodb://localhost:27017/test';
*/
//connect DB

/*
db = mongoose.connect(mURI, function (err, res) {
	  if (err) { 
	    console.log ('ERROR connecting to: ' + mURI + '. ' + err);
	  } else {
	    console.log ('Succeeded connected to: ' + mURI); 
	  }
});

*/

//Setting Schema
/*
var MovieSchema = new mongoose.Schema({
	Title:String,
	Year:String,
	Actor:String,
	Visor:String,
	Link:String,
	Meigen:String,
	Story:String,
	img:String
});

mongoose.model('Movies',MovieSchema);
*/
