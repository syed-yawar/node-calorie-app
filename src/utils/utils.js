import bcrypt from 'bcryptjs';

export const generateRandomPassword = () => {
    let passwd = '';
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 1; i < 7; i++) {
        const c = Math.floor(Math.random() * chars.length + 1);
        passwd += chars.charAt(c);
    }

    return passwd;
};

export const encryptPassword = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
};
