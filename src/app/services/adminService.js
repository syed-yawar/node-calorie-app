import AdminDashBoardFactory from '../factories/adminDashboardFactory';
import MealRepository from '../repositories/mealRepository';
import userRepository from '../repositories/userRepository';

export default class AdminService {
    /**
     *
     * @returns
     */
    static async getDashboardData() {
        try {
            const lastWeekMeals = await MealRepository.getLastSevenDaysMeal({});
            const previousWeekMeals = await MealRepository.getOlderThanSevenDaysMeals({});
            const users = await userRepository.getAllUsers();
            const data = AdminDashBoardFactory.prepareData({ lastWeekMeals, previousWeekMeals, users });
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @returns
     */
    static async getAllMeals() {
        try {
            const meals = await MealRepository.getAllMeals({});
            return meals;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {mealId, food, calorie } param0
     */
    static async updateMeal({ mealId, food, calorie }) {
        try {
            await MealRepository.updateMeal({ mealId, food, calorie });
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {food, calorie, userId} param0
     */
    static async addMealByAdmin({ food, calorie, userId }) {
        try {
            const meal = await MealRepository.saveMeal({ food, calorie, userId });
            return meal;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {mealId} param0
     */
    static async deleteMeal({ mealId }) {
        try {
            await MealRepository.deleteMeal({ mealId });
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @returns users
     */
    static async getAllUsers() {
        try {
            const users = userRepository.getAllUsers();
            return users;
        } catch (error) {
            throw error;
        }
    }
}
