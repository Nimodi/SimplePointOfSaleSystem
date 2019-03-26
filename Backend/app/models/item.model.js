const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
   
    Itemname: {
		type: String,
		
    },
    Qty: {
        type: Number,
        
    },
    unitprice:{
        type:Number
    }

});

module.exports = mongoose.model('Item', ItemSchema);
