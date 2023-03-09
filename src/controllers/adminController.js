import AdminService from '../app/services/adminService';
import logger from '../utils/logger';
import { API_STATUS_CODES, RESPONSE_MESSAGES } from '../constants/constants';
import { CONTROLLER_ERROR } from '../constants/errors';

export default class AdminController {
    /**
     *
     * @param {*} req
     * @param {*} res
     * @returns
     */
    static async dashboard(req, res) {
        try {
            const data = await AdminService.getDashboardData({});

            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: data });
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
    static async getAllMeals(req, res) {
        try {
            const meals = await AdminService.getAllMeals({});

            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: meals });
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
    static async addMeal(req, res) {
        try {
            const { food, calorie, userId } = req.body;
            const meal = await AdminService.addMealByAdmin({ food, calorie, userId });

            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: meal });
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
    static async updateMeal(req, res) {
        try {
            const mealId = req.params.id;
            const { food, calorie } = req.body;

            await AdminService.updateMeal({ mealId, food, calorie });

            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS });
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
    static async deleteMeal(req, res) {
        try {
            const mealId = req.params.id;

            await AdminService.deleteMeal({ mealId });

            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS });
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
     * @returns users
     */

    static async getAllUsers(req, res) {
        try {
            const users = await AdminService.getAllUsers();
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: users });
        } catch (error) {
            logger.log({
                level: 'error',
                message: error.message,
            });
            return res.json(CONTROLLER_ERROR);
        }
    }
}
