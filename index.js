let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/jwe-app-1');
let authorSchema = new mongoose.Schema ({
    author: String
});
let Author = mongoose.model ('author', authorSchema);
let commentSchema = new mongoose.Schema({
    author: String,
    text: String,
    product_id: {
        type: mongoose.ObjectId,
        ref: 'product'
    }
});
let productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    views: Number,
    image: String,
    category: String,
    weight: Number,
    color: String,
    basket: Boolean,
    likes: Number,
    dislikes: Number,
}, {
    timestamps: true
});
let newsSchema = new mongoose.Schema({
    author: {
        type: mongoose.ObjectId,
        ref: 'author'
    },
    text: String,
    likes: Number,
    views: Number
}, {
    timestamps: true
});
let News = mongoose.model('news', newsSchema);
let Product = mongoose.model('product', productSchema);
let Comment = mongoose.model ('comment', commentSchema);
app.get(`/products/all`, async function (req, res) {
    let product = await Product.find();
    res.send(product);
});
app.get(`/product`, async function (req, res) {
    let { id } = req.query;
    let product = await Product.findOne({
        _id: id
    });
    product.views++;
    await product.save();
    res.send(product);
});
app.get (`/author`, async function(req, res){
    let { id } = req.query;
    let author = await Author.findOne ({
        _id: id
    });
    res.send (author);
})
app.post(`/admin/remove/product`, async function (req, res) {
    let { id } = req.body;
    await Product.deleteOne({
        _id: id
    });
    res.send('ok');
});
app.post(`/admin/product/create`, async function (req, res) {
    let { title, price, description, image, category, color, weight } = req.body;
    let product = new Product({
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
        weight: weight,
        color: color,
        views: 0,
        basket: false,
        likes: 0,
        dislikes: 0
    });
    await product.save();
    res.send(`ok`)
});
app.post(`/basket-add-product`, async function (req, res) {
    let id = req.body.id;
    let product = await Product.findOne({
        _id: id
    });
    product.basket = true;
    await product.save();
    res.send(`ok`);
});
app.get(`/basket`, async function (req, res) {
    let product = await Product.find({ basket: true });
    res.send(product);
});
app.post(`/basket/remove/product`, async function (req, res) {
    let id = req.body.id;
    let product = await Product.findOne({
        _id: id
    });
    product.basket = false;
    await product.save();
    res.send(`ok`);
});
app.get(`/product/like`, async function (req, res) {
    let { id } = req.query;
    let product = await Product.findOne({
        _id: id
    });
    product.likes++;
    await product.save();
    res.send(product);
});
app.get(`/product/dislike`, async function (req, res) {
    let { id } = req.query;
    let product = await Product.findOne({
        _id: id
    });
    product.dislikes++;
    await product.save();
    res.send(product);
});
app.get(`/news/all`, async function (req, res) {
    let news = await News.find().sort({ createdAt: -1 });
    res.send(news);
});
app.post(`/news/views`, async function (req, res) {
    let { id } = req.body;
    let news = await News.findOne({
        _id: id
    });
    news.views++;
    await news.save();
    res.send(news);
});
app.post(`/create/news`, async function (req, res) {
    let { text, author } = req.body;
    let news = new News({
        text: text,
        author: author,
        views: 0,
        likes: 0
    });
    await news.save();
    res.send('ok');
});
app.post(`/delete/news`, async function (req, res) {
    let { id } = req.body;
    await News.deleteOne({
        _id: id
    });
    res.send('ok');
});
app.post(`/like/news`, async function (req, res) {
    let { id } = req.body;
    let news = await News.findOne({
        _id: id
    });
    news.likes++;
    await news.save();
    res.send(news);
});
app.get(`/news/likes`, async function (req, res) {
    let news = await News.find().sort({ likes: -1 });
    res.send(news);
});
app.get(`/news/old`, async function (req, res) {
    let news = await News.find().sort({ createdAt: 1 });
    res.send(news);
});
app.get (`/load/comments/product`, async function(req, res){
    let {id} = req.query;
    let comments = await Comment.find({
        product_id: id
    });
    res.send (comments);
});
app.post(`/create/comment`, async function(req, res){
    let {id, text, author} = req.query;
    let comment = new Comment({
        text: text,
        author: author,
        product_id: id
    });
    await comment.save();
    res.send(comment);
})