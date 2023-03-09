import UserService from '../../../../app/services/userService';
import { getAllStaticMethodNames } from '../../../testUtils/util';
import userFixture from '../../../fixtures/user';
import userRepository from '../../../../app/repositories/userRepository';
import UserCreateFactory from '../../../../app/factories/userCreateFactory';
import UserLoginFactory from '../../../../app/factories/userLoginFactory';
import MealRepository from '../../../../app/repositories/mealRepository';
import MealFixture from '../../../fixtures/meal';
import UserMealFactory from '../../../../app/factories/userMealFactory';
import * as Utils from '../../../../utils/utils';

describe('service: User', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should contain all functions.', async () => {
        const functions = getAllStaticMethodNames(UserService);
        expect(functions.sort()).toEqual(userFixture.returnServiceFunctionName().sort());
    });

    test('It should return user obj on successfully register', async () => {
        const mockRegisterUserSpy = jest.spyOn(userRepository, 'create');
        const mockRegisterUser = userFixture.returnRegisterUser();
        mockRegisterUserSpy.mockReturnValue(mockRegisterUser);
        const mockRegisterUserFactorySpy = jest.spyOn(UserCreateFactory, 'prepareResponse');
        mockRegisterUserFactorySpy.mockReturnValue(userFixture.returnLoggedInUser());

        const result = await UserService.create({ email: 'syedyawar2@gmail.com', password: '123123' });
        expect(result).toStrictEqual(userFixture.returnLoggedInUser());
    });

    test('It should throw error from create user function in success case', async () => {
        const mockRegisterUserSpy = jest.spyOn(userRepository, 'create');
        mockRegisterUserSpy.mockImplementation(() => {
            throw new Error('code crashed!');
        });

        await expect(UserService.create({ email: 'syedyawar2@gmail.com', password: '123123' })).rejects.toThrow('code crashed!');
    });

    test('It should return user object with token on successfully login', async () => {
        const findUserSpy = jest.spyOn(userRepository, 'findUserFromEmail');
        findUserSpy.mockReturnValue(userFixture.returnRegisterUser());
        const mockRegisterUserFactorySpy = jest.spyOn(UserLoginFactory, 'prepareResponse');
        mockRegisterUserFactorySpy.mockReturnValue(userFixture.returnLoggedInUser());

        const result = await UserService.loginUser({ email: 'syedyawar2@gmail.com', password: '123123' });
        expect(result).toStrictEqual(userFixture.returnLoggedInUser());
    });

    test('It should throw error from loginUser function in success case', async () => {
        const findUserSpy = jest.spyOn(userRepository, 'findUserFromEmail');
        findUserSpy.mockImplementation(() => {
            throw new Error('code crashed!');
        });

        await expect(UserService.loginUser({ email: 'syedyawar2@gmail.com', password: '123123' })).rejects.toThrow('code crashed!');
    });

    test('It should return true After Meal Created successfully', async () => {
        const saveMealSpy = jest.spyOn(MealRepository, 'saveMeal');
        saveMealSpy.mockReturnValue(MealFixture.returnMealObject());

        const result = await UserService.addNewMeal(MealFixture.returnSaveMealParam());
        expect(result).toStrictEqual(MealFixture.returnMealResponse());
    });

    test('It should throw error from save Meal function in success case', async () => {
        const saveMealSpy = jest.spyOn(MealRepository, 'saveMeal');
        saveMealSpy.mockImplementation(() => {
            throw new Error('code crashed!');
        });

        await expect(UserService.addNewMeal(MealFixture.returnSaveMealParam())).rejects.toThrow('code crashed!');
    });

    test('It should return meals list', async () => {
        const getUserMealsSpy = jest.spyOn(MealRepository, 'getAllUserMeals');
        getUserMealsSpy.mockReturnValue([]);
        const getPreparedUserMealsSpy = jest.spyOn(UserMealFactory, 'prepareData');
        getPreparedUserMealsSpy.mockReturnValue([]);
        const result = await UserService.getAllUserMeals({ user: userFixture.returnLoggedInUser() });
        expect(result).toStrictEqual([]);
    });

    test('It should throw error from get all user meals in success case', async () => {
        const getUserMealsSpy = jest.spyOn(MealRepository, 'getAllUserMeals');
        getUserMealsSpy.mockImplementation(() => {
            throw new Error('code crashed!');
        });

        await expect(UserService.getAllUserMeals({ user: userFixture.returnLoggedInUser() })).rejects.toThrow('code crashed!');
    });

    test('It should return invite user credentials on successfully register', async () => {
        const passwordSpy = jest.spyOn(Utils, 'generateRandomPassword');
        passwordSpy.mockReturnValue('123123');

        const mockRegisterUserSpy = jest.spyOn(userRepository, 'create');
        mockRegisterUserSpy.mockReturnValue(userFixture.returnRegisterUser());
        const mockRegisterUserFactorySpy = jest.spyOn(UserCreateFactory, 'prepareResponse');
        mockRegisterUserFactorySpy.mockReturnValue(userFixture.returnLoggedInUser());

        const result = await UserService.inviteFriend({ email: 'syedyawar2@gmail.com' });
        expect(result).toStrictEqual(userFixture.returnInviteFriendData());
    });

    test('It should throw error from invite friend in success case', async () => {
        const passwordSpy = jest.spyOn(Utils, 'generateRandomPassword');
        passwordSpy.mockReturnValue('123123');

        const mockRegisterUserSpy = jest.spyOn(userRepository, 'create');
        mockRegisterUserSpy.mockImplementation(() => {
            throw new Error('code crashed!');
        });

        await expect(UserService.create({ email: 'syedyawar2@gmail.com' })).rejects.toThrow('code crashed!');
    });
});
