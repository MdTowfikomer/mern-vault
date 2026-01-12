const mongoose = require('mongoose');

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Amazon");
}

main()
.then((res)=>{
    console.log("Successfully connected");
})
.catch((err)=>{
    console.log(err);
});

const bookSchema = new  mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
    },
});

const Book = new mongoose.model("Book", bookSchema); 

let book1 = new Book({
    title: "Stranger Things",
    author: "Buffer Brothers",
    price: 1234567890
});

book1.save()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});