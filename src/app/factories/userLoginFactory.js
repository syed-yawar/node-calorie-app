import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../constants/constants';

export default class UserLoginFactory {
    constructor(email, token, userFound) {
        try {
            // this.id = userFound._id;
            this.email = email;
            this.userName = userFound.userName;
            this.role = userFound.role;
            this.calorieThreshold = userFound.calorieThreshold;
            this.token = token;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param user
     * @description Prepare response for login user.
     */
    static async prepareResponse(credentials) {
        const { email, password, userFound } = credentials;
        let userObject = { id: '', userName: '', token: '', role: '' };
        let token = '';
        /* Validate password provided in request with bcrypt */
        if (userFound && (await bcrypt.compare(password, userFound.password))) {
            /* Generate JWT token for user */
            token = jwt.sign({ id: userFound._id, email, userName: userFound.userName, role: userFound.role, calorieThreshold: userFound.calorieThreshold }, JWT_TOKEN, { expiresIn: '20 days' });
            userObject = new UserLoginFactory(email, token, userFound);
        }
        return userObject;
    }
}
