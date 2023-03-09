export const API_STATUS_CODES = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    AUTHORIZATION_FAILED: 401,
    ERROR_CODE: 400,
    INTERNAL_SERVER_ERROR: 500,
    DUPLICATE_ENTRY: 11000,
};
export const RESPONSE_MESSAGES = {
    SUCCESS: 'Success',
    AUTHORIZATION_FAILED: 'Authorization failed',
    DUPLICATE_ENTRY: 'email already exist.',
    MEAL_ADDED: 'meal added successfully',
};

export const APP_ENVIRONMENTS = {
    LOCAL: 'local',
    DEV: 'dev',
    STAGING: 'staging',
    PRODUCTION: 'production',
};

export const JWT_TOKEN = 'eyJhbGciOiJ$IUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzIzNTYyYjlkNTZkNjY1Yjk0NDkzYyIsInVzZXJOYW1lIjoibWFzaG9vZCBSYWZpIiwiaWF0IjoxNjIzMzQxNzU2fQ.vfJCCeMRdEhzkJEwgJybJ95zFm0eYuiYvUDpi2q3Of8';

export const ROLES = {
    USER: 1,
    ADMIN: 2,
};
