const createSchema = {
    type: "object",
    properties: {
        nombre: {
            type: "string",
            description: "Nombre del estado ",
            pattern: "^[a-zA-ZáéíóúÁÉÍÓÚ]+$"
        },
        descripcion: {
            type: "string",
            description: "Nombre del estado ",
            pattern: "^[a-zA-ZáéíóúÁÉÍÓÚ]+$"
        },
    },
    required: ["nombre", "descripcion"],
    errorMessage: {
        required: {
            name: "El nombre es requerido",
            descripcion: "La descripción es requerida"
        },
        properties: {
            name: "El nombre debe ser alfabetico",
            descripcion: "La descripción debe ser alfabetico"
        },
    },
};

module.exports = createSchema;