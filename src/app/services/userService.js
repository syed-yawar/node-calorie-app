import moment from 'moment';
import userRepository from '../repositories/userRepository';
import userLoginFactory from '../factories/userLoginFactory';
import userCreateFactory from '../factories/userCreateFactory';
import MealRepository from '../repositories/mealRepository';
import UserMealFactory from '../factories/userMealFactory';
import { encryptPassword, generateRandomPassword } from '../../utils/utils';

export default class UserService {
    /**
     *
     * @param {*} credentials
     * @returns
     */
    static async create(credentials) {
        try {
            const userCreated = await userRepository.create(credentials);
            const createdUserResponse = userCreateFactory.prepareResponse(userCreated);
            return createdUserResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {email, password} param0
     * @returns
     */
    static async loginUser({ email, password }) {
        try {
            const userFound = await userRepository.findUserFromEmail(email);
            const userLoginToken = await userLoginFactory.prepareResponse({ email, password, userFound });
            return userLoginToken;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {food, calorie, user} param0
     */
    static async addNewMeal({ food, calorie, user }) {
        try {
            let meal = await MealRepository.saveMeal({ food, calorie, userId: user.id });
            const date = moment(meal.date).format('YYYY-MM-DD HH:mm:ss');
            return { date, _id: meal._id, food: meal.food, calorie: meal.calorie, userId: meal.userId };
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {user,startDate, endDate} param0
     * @returns
     */
    static async getAllUserMeals({ user, startDate, endDate }) {
        try {
            const meals = await MealRepository.getAllUserMeals({ userId: user.id, startDate, endDate });

            return UserMealFactory.prepareData(meals);
        } catch (error) {
            throw error;
        }
    }

    static async inviteFriend({ userName, email }) {
        try {
            const password = generateRandomPassword();
            const encryptedPassword = await encryptPassword(password);

            const userCreated = await userRepository.create({ userName, email, password: encryptedPassword });
            const createdUserResponse = userCreateFactory.prepareResponse(userCreated);
            return { token: createdUserResponse.token, password, email };
        } catch (error) {
            throw error;
        }
    }
}
