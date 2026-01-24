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

// One to Many / Approach 2
// Store a reference of the child doc inside the parent


const orderSchema = new Schema({
    item: String,
    price: Number
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        },
    ],
});

// customerSchema.pre("findOneAndDelete", async()=>{
//     console.log("PRE-MIDDLEWARE!");
// });
customerSchema.post("findOneAndDelete", async(customer)=>{
    let res = await Order.deleteMany({_id: {$in: customer.orders}});
    console.log(res);
    console.log("post-middleware");
});


const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);



// const findCustomer = async () => {
    
//     let res = await Customer.find({})
//     .populate("orders"); // to extract the full data
//     console.log(res);
// }

// findCustomer();


// const addCustomer = async() =>{
//     let newCust = new Customer({
//         name: "Omer"
//     });

//     let newOrder = new Order({
//         item: "Chicken Biryani",
//         price: 250
//     });

//     newCust.orders.push(newOrder);

//     await newCust.save();
//     await newOrder.save();
// }

// addCustomer();


const deleteCust = async()=>{
    let res = await Customer.findOneAndDelete({_id: "6974f3f8a4dbe3579bd966ab"});
    console.log(`deleted..!${res}`);
}

deleteCust();