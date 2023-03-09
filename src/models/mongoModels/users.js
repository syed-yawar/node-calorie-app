import mongoose from 'mongoose';

const users = mongoose.Schema({
    id: { type: Number },
    userName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    calorieThreshold: { type: Number, default: 2100 },
    role: { type: Number, default: 1 },
});
export default mongoose.model('users', users);
