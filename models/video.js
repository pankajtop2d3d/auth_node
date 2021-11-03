var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	unique_id:{
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
	campaign_name: String,
	offer_amount: {
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
	code: String,
	customer_name: String,
	mobile: String,
	video_link: String,
    action_link: String,
    seen: String,
    status:{
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    created_at:  { type : Date, default: Date.now }

})

Videos = mongoose.model('Videos', userSchema);
module.exports = Videos;