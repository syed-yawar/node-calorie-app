import mongoose from 'mongoose';

const meals = mongoose.Schema({
    id: { type: Number },
    food: { type: String },
    calorie: { type: Number },
    userId: { type: String },
    date: { type: Date },
});
export default mongoose.model('meals', meals);
