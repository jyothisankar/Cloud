var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var offerSchema = new Schema({
	title: String,
	desc: String,
  	pic: String,
  	likes_counts: String,
	start_time :String,
	end_time: String,
	start_discount: String,
	max_discount: String,
	no_of_likes: String,
	like_incrementor: String,
	discount_rate : String , 
	loc:[Number,Number],
	Quantity_Remaining : String ,	
 	updated_at: { type: Date, default: Date.now },
	creator: {type:Schema.ObjectId,ref:'User'}
});

mongoose.model('Offer',offerSchema);
