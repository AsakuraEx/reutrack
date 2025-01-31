const updateSchema = {
    type: "object",
    properties: {
        nombre: {
            type: "string",
            description: "Nombre del acuerdo ",
            pattern: "^[a-zA-Z]+$"
        },
        id_reunion: {
            type: "integer",
            description: "Reunion a la que pertenece",
        },
    },
    required: ["nombre", "id_reunion"],
    errorMessage: {
        required: {
            nombre: "El nombre es requerido",
            id_reunion: "Debe asignar una reunión",
        },
        properties: {
            nombre: "El nombre debe ser alfabetico",
            id_reunion: "La reunion debe ser un valor entero",
        },
    },
};

module.exports = updateSchema;