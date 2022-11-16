import mongoose from 'mongoose';
const schema = mongoose.Schema({
    topic: String,
    userName: String,
    tuit: String,
    time: String,
    userImage: String,
    liked: Boolean,
    likes: Number,
    dislikes: Number,
    replies: Number,
    retuits: Number,
    userHandle: String
},
    {Collection: 'tuits'});
export default schema;