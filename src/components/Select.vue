<template>
    <div 
        class="w-full px-4 lg:px-0" 
        :class="label ? 'flex flex-col gap-4 items-center':''"
    >
        <label v-if="label" class="text-xl px-4 md:text-left text-center">{{label}}</label>
        <select 
            class="p-2 rounded border bg-transparent w-full focus:outline-purple-400" 
            :required="requerido == true ? 'required':''"
            @change="$emit('update:campo', $event.target.value)"
            :value="campo" 
        >
            <option class="text-gray-900" value="0" disabled selected>Seleccione...</option>
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
        requerido: {
            type: Boolean,
            required: true
        },
        campo: {
            type: Number,
            required: true,
            default: ''
        }
    })

    defineEmits(['update:campo'])

</script>