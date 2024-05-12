const mongoose = require('./db');

const blogSchema = new mongoose.Schema({
    Title: String,
    Content: String,
    Date: Date,
});

const blog = mongoose.model('blog', blogSchema);
module.exports = blog;