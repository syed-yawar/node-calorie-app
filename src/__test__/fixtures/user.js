export default class UserFixture {
    static returnServiceFunctionName() {
        return ['create', 'loginUser', 'addNewMeal', 'getAllUserMeals', 'inviteFriend'];
    }

    static returnLoggedInUser() {
        const loggedInUser = {
            id: '612b6b6f0ef45830a79ee662',
            email: 'syedyawar2@gmail.com',
            role: 2,
            userName: 'yawar',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmI2YjZmMGVmNDU4MzBhNzllZTY2MiIsImVtYWlsIjoic3llZHJvaGFhbmh1c3NhaW5AZ21haWwuY29tIiwicm9sZSI6MSwiY2Fsb3JpZVRocmVzaG9sZCI6MjEwMCwiaWF0IjoxNjMwMjM1NTAzLCJleHAiOjE2MzAyNDU1MDN9.bZMGD_ROSEKWD-fYpKpxgSGkgXjO-10v0SpbI9jim6k',
            calorieThreshold: 2100,
        };

        return loggedInUser;
    }

    static returnRegisterUser() {
        const loggedInUser = {
            id: '612b6b6f0ef45830a79ee662',
            email: 'syedyawar2@gmail.com',
            role: 2,
            userName: 'yawar',
            calorieThreshold: 2100,
        };

        return loggedInUser;
    }

    static returnInviteFriendData() {
        return {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmI2YjZmMGVmNDU4MzBhNzllZTY2MiIsImVtYWlsIjoic3llZHJvaGFhbmh1c3NhaW5AZ21haWwuY29tIiwicm9sZSI6MSwiY2Fsb3JpZVRocmVzaG9sZCI6MjEwMCwiaWF0IjoxNjMwMjM1NTAzLCJleHAiOjE2MzAyNDU1MDN9.bZMGD_ROSEKWD-fYpKpxgSGkgXjO-10v0SpbI9jim6k',
            password: '123123',
            email: 'syedyawar2@gmail.com',
        };
    }
}
