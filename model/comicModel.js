const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ComicSchema= new Schema({
    name_comic :{
        type: String
    },
    status:{
        type : String
    },
    content:{
        type: String
    },
    rating:{
        type:String
    },
    image:{
        type:String
    },
    year:{
        type:String
    },
    name_author:{
        type:String
    },
    categories:[{
        type: Schema.Types.ObjectId,
        ref:"Category"
    }],
    
},
{timestamps:true}
)

const Comic = mongoose.model('Comic',ComicSchema)
module.exports = Comic