const createSchema = {
    type: "object",
    properties: {
        nombre: {
            type: "string",
            description: "Nombre del estado ",
            pattern: "^[a-zA-Z]+$"
        },
    },
    required: ["nombre"],
    errorMessage: {
        required: {
            name: "El nombre es requerido",
        },
        properties: {
            name: "El nombre debe ser alfabetico",
        },
    },
};

module.exports = createSchema;