# Node Calorie Tracking App Backend

# Add environment file

PORT=
APP_ENV=
MONGO_DB_URL=

## RUN APP WITH 3 EASY STEPS

1. \*\*Install [Node & MongoDB]
2. **Clone this repository.** - `git clone git@github.com:syed-yawar/node-calorie-app.git`
3. **Add environment file.**
4. **Install Node Packages.** - `npm install`
5. **Run the app.** - `npm run start`
   This will create a build & run the build process on provided port.
   (npm run dev) This command will keep watching changing in file and every time you save something new, code will be rebuilt, linting rules apply automatically.

## Details:

This project will provide APIs for Calorie Tracking App Front end application.

**This project contain following features**

APIS - Authentication, Authorization, Add Meal, Invite Friend, Admin Dashboard & Meal History

prettier & linter - prettier and linter is configured in this project for maintaining code quality,

Husky - husky is configured to enforced linter and prettier rules.

Logger - push all logs on local files but in future we can push all logs in external services/database like ELK, AppInsights.

Docker - using docker we can create backend image and run that image. In future we can create docker-compose build for backend, frontend and mongodb.
