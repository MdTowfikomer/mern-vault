const mongoose = require("mongoose");
const Schema = mongoose.Schema;

main()
    .then(() => {
        console.log("Connected Successfully");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

//approach -3 (one to squillions)

const userSchema = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "postUser"
    }
});

const User = mongoose.model("postUser", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async() => {
//     let user1 = await User.findOne({username : 'Rahul'});

//     let post2 = new Post({
//         content: "Bye, Bye.!",
//         likes: 783
//     });

//     post2.user = user1;

//     await post2.save();
// }

// addData(); 
const findPost = async () => {
    let res = await Post.find({})
    .populate("user"); // to extract the full data
    console.log(res[0]);
}

findPost();