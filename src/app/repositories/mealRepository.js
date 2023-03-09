import Meal from '../../models/mongoModels/meals';
import moment from 'moment';

export default class MealRepository {
    /**
     *
     * @param {food, calorie, userId} param0
     */
    static async saveMeal({ food, calorie, userId }) {
        try {
            const meal = await Meal.create({ food, calorie, userId, date: moment() });
            return meal;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {userId, startDate, endDate} param0
     * @returns meals
     */
    static async getAllUserMeals({ userId, startDate, endDate }) {
        try {
            let meals;
            if (startDate && endDate) {
                meals = await Meal.find({ userId, date: { $gte: `${startDate} 00:00:00`, $lte: ` ${endDate} 23:59:59` } })
                    .sort({ date: -1 })
                    .lean();
            } else {
                meals = await Meal.find({ userId })
                    .sort({ date: -1 })
                    .lean();
            }
            return meals;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @returns meals
     */
    static async getAllMeals() {
        try {
            const meals = await Meal.find({})
                .sort({ date: -1 })
                .lean();
            return meals;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @returns this week meals
     */
    static async getLastSevenDaysMeal() {
        try {
            const sevenDaysBackDate = moment()
                .subtract(7, 'days')
                .format('YYYY-MM-DD');
            const meals = await Meal.find({ date: { $gte: `${sevenDaysBackDate} 00:00:00` } })
                .select('_id calorie userId')
                .lean();
            return meals;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @returns last week meals
     */
    static async getOlderThanSevenDaysMeals() {
        try {
            const sevenDaysBackDate = moment()
                .subtract(7, 'days')
                .format('YYYY-MM-DD');
            const fourteenDaysBackDate = moment()
                .subtract(14, 'days')
                .format('YYYY-MM-DD');

            const meals = await Meal.find({ date: { $lt: `${sevenDaysBackDate} 00:00:00`, $gte: `${fourteenDaysBackDate} 00:00:00` } })
                .select('_id calorie userId')
                .lean();
            return meals;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {mealId, food, calorie} param0
     * @returns meal
     */
    static async updateMeal({ mealId, food, calorie }) {
        try {
            await Meal.updateOne({ _id: mealId }, { food, calorie }).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {mealId} param0
     * @returns
     */
    static async deleteMeal({ mealId }) {
        try {
            const meals = await Meal.deleteOne({ _id: mealId });
            return meals;
        } catch (error) {
            throw error;
        }
    }
}
