const mongoose = require('mongoose');
const Schema = mongoose.Schema;

main().catch(err => console.log(err));

async function main() {
    // Replace with your MongoDB connection string
    await mongoose.connect('mongodb://localhost:27017/yourdbname', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
