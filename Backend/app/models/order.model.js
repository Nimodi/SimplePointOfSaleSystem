//const Item = require('../models/item.model.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    
    orderId: {
        type: Schema.Types.ObjectId
    } ,
    items:[{
        
        Itemname: {
            type: String,
            
        },
        Qty: {
            type: Number,
            
        },
        unitprice:{
            type:Number
        }

    }]


    // items:
       
    //     [{ type: Schema.Types.ObjectId, ref: 'Item' }]


    
    
});

// const ItemSchema = mongoose.Schema({
    // ItemId:{
    //     type:String,
    // },
    
    // Itemname: {
	// 	type: String,
		
    // },
    // Qty: {
    //     type: Number,
        
    // },
    // unitprice:{
    //     type:Number
    // }
// });


module.exports = mongoose.model('Order', OrderSchema);
//module.exports = mongoose.model('Item', ItemSchema);



