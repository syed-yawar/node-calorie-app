import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../constants/constants';

export default class UserCreateFactory {
    constructor(user, token) {
        // this.id = user._id;
        this.email = user.email;
        this.userName = user.userName;
        this.role = user.role;
        this.token = token;
        this.calorieThreshold = user.calorieThreshold;
    }

    /**
     * @param user
     * @description Prepare response for created user.
     */
    static prepareResponse(user) {
        try {
            let token = '';
            /* Validate if user found. */
            if (user) {
                /* Generate JWT token for user */
                token = jwt.sign({ id: user._id, email: user.email, userName: user.userName, role: user.role, calorieThreshold: user.calorieThreshold }, JWT_TOKEN, { expiresIn: '20 days' });
            }
            const userObject = new UserCreateFactory(user, token);

            return userObject;
        } catch (error) {
            throw error;
        }
    }
}
