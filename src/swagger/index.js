const userSchema = require('../schema/users/userSchemas');
const userRoutes = require('./userSwagger')

module.exports = {
    components: {
        schemas: {
            ...userSchema
        },
        routes: {
            ...userRoutes 
        },
    }
};
