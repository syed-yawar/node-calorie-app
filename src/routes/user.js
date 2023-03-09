import express from 'express';
import UserController from '../controllers/userController';
import UserValidator from '../utils/validators/userValidator';

const router = express.Router({});

router.post('/login', UserValidator.loginValidator, UserController.login);
router.post('/register', UserValidator.registerValidator, UserController.register);

router.post('/meals', UserValidator.authorize, UserValidator.newMealValidator, UserController.addNewMeal);
router.get('/meals', UserValidator.authorize, UserValidator.dateValidator, UserController.getAllUserMeals);
router.post('/invite', UserValidator.authorize, UserValidator.inviteValidator, UserController.inviteFriend);

module.exports = router;
