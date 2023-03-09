import app from './expressApp';

const userRoutes = require('../routes/user');
const adminRoutes = require('../routes/admin');

app.use('/api/user/', userRoutes);
app.use('/api/admin/', adminRoutes);

module.exports = app;
