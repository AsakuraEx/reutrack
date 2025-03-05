const userSchemas = {
    User: {
        type: "object",
        properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            status: { type: "string" },
        },
        required: ["name", "email"],
    },
    CreateUser: {
        type: "object",
        properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
        },
        required: ["name", "email", "password"],
    },
    UpdateUser: {
        type: "object",
        properties: {
            name: { type: "string" },
            email: { type: "string" },
        },
    },
    UpdatePassword: {
        type: "object",
        properties: {
            password: { type: "string" },
        },
        required: ["password"],
    },
    UpdateStatus: {
        type: "object",
        properties: {
            status: { type: "string" },
        },
        required: ["status"],
    },
};

module.exports = userSchemas;
