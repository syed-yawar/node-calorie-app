import express from 'express';
import AdminController from '../controllers/adminController';
import AdminValidator from '../utils/validators/adminValidator';
import UserValidator from '../utils/validators/userValidator';

const router = express.Router({});

router.get('/meals', AdminValidator.authorize, AdminController.getAllMeals);
router.post('/meals', AdminValidator.authorize, UserValidator.newMealValidator, AdminController.addMeal);
router.put('/meals/:id', AdminValidator.authorize, UserValidator.newMealValidator, AdminController.updateMeal);
router.delete('/meals/:id', AdminValidator.authorize, AdminController.deleteMeal);
router.get('/dashboard', AdminValidator.authorize, AdminController.dashboard);
router.get('/users', AdminValidator.authorize, AdminController.getAllUsers);

module.exports = router;
