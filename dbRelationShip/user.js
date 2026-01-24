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

// one to few (approch-1)
// stores the child doc inside of parent doc

const userSchema = new Schema({
    username: String,
    addresses: [
        {   
            _id : false,
            location: String,
            city: String,
        },
    ],
});


const User = mongoose.model("User", userSchema);
const addUsers = async () => {
    let user1 = new User({
        username: "Peter Parker",
        addresses: [{
            location: "Avengers Tower",
            city: "New York",
        },
        {
            location: "Aunt May's House",
            city: "Queens",
        },
        ]
    })

    await user1.save();
}

// addUsers();

// One to Many / Approach 2
// Store a reference of the child doc inside the parent
