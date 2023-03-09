import User from '../../models/mongoModels/users';

export default class userRepository {
    /**
     * @param credentials (includes  password, email)
     * @description Creates user.
     */
    static async create({ userName, password, email }) {
        try {
            const response = await User.create({ userName, password, email });
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param email
     * @description Finds user from user email.
     */
    static async findUserFromEmail(email) {
        try {
            /* Lean method is used for faster queries and keeps the operation less memory intensive */
            const userPassword = await User.findOne({ email })
                .select('_id email password userName role calorieThreshold')
                .lean();
            return userPassword;
        } catch (error) {
            throw error;
        }
    }
    /**
     * @returns users
     */

    static async getAllUsers() {
        try {
            /* Lean method is used for faster queries and keeps the operation less memory intensive */
            const users = await User.find({})
                .select('_id email')
                .lean();
            return users;
        } catch (error) {
            throw error;
        }
    }
}
