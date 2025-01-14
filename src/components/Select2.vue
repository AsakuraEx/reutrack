<template>
    <div 
        class="w-full" 
        :class="label ? 'flex flex-col':''"
    >
        <label v-if="label" class="text-xl">{{label}}</label>
        <select class="p-2 rounded border bg-transparent w-full focus:outline-purple-400" :value="campo">
            <option class="text-gray-900" value="0">Seleccione...</option>
            <option v-for="opcion in opciones" class="text-gray-900" :value="opcion.id">{{ opcion.nombre }}</option>
        </select>
    </div>
</template>

<script setup>

    defineProps({
        label: {
            type: String,
            required: false
        },
        opciones: {
            type: Array,
            required: true
        },
        campo: {
            type: Number,
            required: true,
            default: ''
        }
    })

</script>