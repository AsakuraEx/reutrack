<template>
    <div class="w-full" :class="label ? 'flex flex-col' : ''">
        <label v-if="label" class="text-xl text-purple-500">{{ label }}</label>

        <v-select
            v-model="campoSeleccionado"
            :options="opciones"
            label="nombre"
            placeholder="Seleccione..."
            class="rounded text-black bg-white"
            :reduce="(opcion) => opcion.id"
            :clearable="false"
            :searchable="true"
            @update:modelValue="actualizarCampo"
        />
    </div>
</template>

<script setup>
import { computed } from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css"; // Importa los estilos de Vue Select

const props = defineProps({
    label: String,
    opciones: {
        type: Array,
        required: true
    },
    campo: {
        type: Number,
        required: true,
    },
    requerido: Boolean
});

const emit = defineEmits(["update:campo"]);

// Sincroniza el valor con `v-model`
const campoSeleccionado = computed({
    get: () => props.campo,
    set: (value) => emit("update:campo", value)
});

const actualizarCampo = (value) => {
    console.log(value)
    if(value){
        campoSeleccionado.value = value;
    }else{
        campoSeleccionado.value = 0;
    }
};
</script>

<style scoped>
/* Estilos personalizados para limitar la altura del menú */
.vs__dropdown-menu {
    max-height: 80px !important;
    overflow-y: auto !important;
}

/* Ajustes adicionales para el fondo negro */
.v-select {
    background-color: white;
    color: black;
}

.vs__dropdown-toggle {
    background-color: white;
    color: black;
}

.vs__selected {
    color: black;
}

.vs__search {
    color: black;
}

.vs__open-indicator {
    fill: black;
}
</style>