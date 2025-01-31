const updateSchema = {
    type: "object",
    properties: {
        nombre: {
            type: "string",
            description: "Nombre del acuerdo ",
            pattern: "^[a-zA-Z]+$"
        },
    },
    required: ["nombre", "id_reunion"],
    errorMessage: {
        required: {
            nombre: "El nombre es requerido",
        },
        properties: {
            nombre: "El nombre debe ser alfabetico",
        },
    },
};

module.exports = updateSchema;