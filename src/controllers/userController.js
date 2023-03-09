import logger from '../utils/logger';
import UserService from '../app/services/userService';
import { API_STATUS_CODES, RESPONSE_MESSAGES } from '../constants/constants';
import { CONTROLLER_ERROR } from '../constants/errors';

export default class UserController {
    /**
     *
     * @param {*} req
     * @param {*} res
     * @returns
     */
    static async register(req, res) {
        try {
            const { userName, password, email } = req.body;
            const createdUser = await UserService.create({ userName, password, email });
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: createdUser });
        } catch (error) {
            if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }
            logger.log({
                level: 'error',
                message: error.message,
            });
            return res.json(CONTROLLER_ERROR);
        }
    }

    /**
     *
     * @param {*} req
     * @param {*} res
     * @returns
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            let response = {};
            const userLoginToken = await UserService.loginUser({ email, password });
            response.status = userLoginToken.token ? API_STATUS_CODES.SUCCESS : API_STATUS_CODES.AUTHORIZATION_FAILED;
            response.message = userLoginToken.token ? RESPONSE_MESSAGES.SUCCESS : RESPONSE_MESSAGES.AUTHORIZATION_FAILED;
            response.body = userLoginToken;
            return res.json(response);
        } catch (error) {
            logger.log({
                level: 'error',
                message: error.message,
            });
            return res.json(CONTROLLER_ERROR);
        }
    }

    /**
     *
     * @param {*} req
     * @param {*} res
     * @returns meal object
     */
    static async addNewMeal(req, res) {
        try {
            const { food, calorie, user } = req.body;

            const meal = await UserService.addNewMeal({ food, calorie, user });
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.MEAL_ADDED, body: meal });
        } catch (error) {
            logger.log({
                level: 'error',
                message: error.message,
            });
            return res.json(CONTROLLER_ERROR);
        }
    }

    /**
     *
     * @param {*} req
     * @param {*} res
     * @returns
     */
    static async getAllUserMeals(req, res) {
        try {
            const { user } = req.body;
            const { startDate, endDate } = req.query;
            const meals = await UserService.getAllUserMeals({ user, startDate, endDate });

            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: meals });
        } catch (error) {
            logger.log({
                level: 'error',
                message: error.message,
            });
            return res.json(CONTROLLER_ERROR);
        }
    }

    static async inviteFriend(req, res) {
        try {
            const { userName, email } = req.body;
            const response = await UserService.inviteFriend({ userName, email });
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: response });
        } catch (error) {
            if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }
            logger.log({
                level: 'error',
                message: error.message,
            });
            return res.json(CONTROLLER_ERROR);
        }
    }
}
