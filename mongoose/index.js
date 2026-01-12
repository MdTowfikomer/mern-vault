const mongoose = require("mongoose");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}


main()
.then(()=>{
    console.log("connection successful");
})
.catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
}); 
const employeeSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    salary:Number
}); 

const User = mongoose.model("User", userSchema);


User.findByIdAndUpdate({_id:"6964048588bec02a2532b6c8"}, {age:35}, {new:true})
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
});

// const user2 = new User({
//     name: "Eve",
//     email: "Eve@gmail.com",
//     age:23
// });

// user2.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });