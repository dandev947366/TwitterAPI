const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // Corrected typo

main().catch(err => console.log(err));

async function main() {
    // Replace with your MongoDB connection string
    await mongoose.connect('mongodb://localhost:27017/yourdbname', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex is not needed in Mongoose 6.x
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

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password') || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Post-save hook
UserSchema.post('save', function (doc, next) {
    console.log('User saved:', doc.email);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
