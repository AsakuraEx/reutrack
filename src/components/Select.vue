<template>
    <div 
        class="w-full" 
        :class="label ? 'flex flex-col gap-4 items-center px-4':''"
    >
        <label v-if="label" class="text-xl px-4 md:text-left text-center">{{label}}</label>
        <select class="p-2 rounded border bg-transparent w-full focus:outline-purple-400">
            <option class="text-gray-900" value="">Seleccione...</option>
            <option v-for="opcion in opciones" class="text-gray-900" :value="opcion.value">{{ opcion.nombre }}</option>
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
        }
    })

</script>