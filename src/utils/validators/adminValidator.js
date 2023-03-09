import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN, ROLES } from '../../constants/constants';

import { CONTROLLER_ERROR, AUTHORIZATION_FAILED } from '../../constants/errors';

export default class AdminValidator {
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
            const bearer = AdminValidator.fetchAccessToken(req);
            const JWTUser = AdminValidator.fetchJWTUser(bearer);
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
            return typeof JWTdata === 'object' && JWTdata.role === ROLES.ADMIN && mongoose.Types.ObjectId.isValid(JWTdata.id) ? { isValidTokan: true, data: JWTdata } : { isValidTokan: false, data: JWTdata };
        } catch (error) {
            throw error;
        }
    }
}
