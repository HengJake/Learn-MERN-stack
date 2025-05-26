import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required :true
    },
    price: {
        type: Number,
        required :true
    },
    image: {
        type: String,
        required :true
    },
}, {
    timestamps: true // createAt , updatedAt
})

const Product = mongoose.model('Product', productSchema);
// mongoose will change Product to "products" auto

export default Product;