import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    phoneNumber: { type: String, default: ''} // Added phone number field
});

const User = mongoose.model('User', UserSchema);

export default User;