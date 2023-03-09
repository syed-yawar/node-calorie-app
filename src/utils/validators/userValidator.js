import validator from 'validator';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../constants/constants';

import { CONTROLLER_ERROR, INVALID_REQUEST, AUTHORIZATION_FAILED } from '../../constants/errors';
import { encryptPassword } from '../utils';

export default class UserValidator {
    /**
     * @param req
     * @param res
     * @param next
     */
    static async registerValidator(req, res, next) {
        try {
            const { userName, password, email } = req.body;
            /*
                Validates that userName, password, email are of type string
                Validates that email type is correct.
            */
            if (typeof password === 'string' && typeof email === 'string' && typeof userName === 'string' && password && userName && email && password.length >= 6) {
                const isValidEmail = validator.isEmail(email);
                if (isValidEmail) {
                    const encryptedPassword = await encryptPassword(password);
                    req.body.password = encryptedPassword;
                    next();
                } else {
                    res.json(INVALID_REQUEST);
                }
            } else {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            console.log(error);
            res.json(CONTROLLER_ERROR);
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    static async loginValidator(req, res, next) {
        try {
            const { email, password } = req.body;
            const isValidEmail = validator.isEmail(email);

            if (isValidEmail && typeof password === 'string' && password) {
                next();
            } else {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    static async newMealValidator(req, res, next) {
        try {
            const { food, calorie } = req.body;

            /* Check for authorization in headers */

            // eslint-disable-next-line no-restricted-globals
            if (typeof food === 'string' && food && calorie && !isNaN(Number(calorie)) && Number(calorie) > 0) {
                req.body.calorie = Number(calorie);
                next();
            } else {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    static async dateValidator(req, res, next) {
        try {
            const { startDate, endDate } = req.query;
            /* Check for authorization in headers */

            if (!startDate || !endDate || (typeof startDate === 'string' && typeof endDate === 'string' && validator.isDate(startDate) && validator.isDate(endDate))) {
                next();
            } else {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }

    static async inviteValidator(req, res, next) {
        try {
            const { userName, email } = req.body;
            /* Check for authorization in headers */

            if (typeof userName === 'string' && typeof email === 'string' && validator.isEmail(email) && userName) {
                next();
            } else {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    static async authorize(req, res, next) {
        try {
            /* Check for authorization in headers */
            if (!req.headers.authorization) {
                return res.json(AUTHORIZATION_FAILED);
            }
            const bearer = UserValidator.fetchAccessToken(req);
            const JWTUser = UserValidator.fetchJWTUser(bearer);
            if (!JWTUser.isValidTokan) {
                return res.json(AUTHORIZATION_FAILED);
            }

            req.body.user = JWTUser.data;
            next();
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }

    /**
     * @param req
     * @description Fetch JWT access from request header.
     */
    static fetchAccessToken(req) {
        try {
            const jwt = req.headers.authorization;
            const bearer = jwt.split(' ');
            return bearer[1];
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param bearer
     * @description Fetch user associated with JWT.
     */
    static fetchJWTUser(bearer) {
        try {
            let JWTdata;
            try {
                /* Verify the JWT provided in the request. */
                const user = jwt.verify(bearer, JWT_TOKEN);
                JWTdata = user;
            } catch (error) {
                JWTdata = error.message;
            }
            /* Validate that id provided by JWT resolution is valid mongo id. */
            return typeof JWTdata === 'object' && mongoose.Types.ObjectId.isValid(JWTdata.id) ? { isValidTokan: true, data: JWTdata } : { isValidTokan: false, data: JWTdata };
        } catch (error) {
            throw error;
        }
    }
}
