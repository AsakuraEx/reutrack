<template>
    <div class="flex flex-col w-full">
        <label class="text-xl">{{ label }}</label>
        <input 
            type="date" 
            onclick="this.showPicker()" 
            @change="$emit('update:campo', $event.target.value)"
            class="p-1.5 rounded border bg-transparent w-full focus:outline-purple-400"
            :min="filtros.desde"
            :max="filtros.hasta"
        >
    </div>
</template>

<script setup>

    defineProps({
        label: {
            type: String,
            required: true
        },
        filtros: {
            type: Object,
            required: true
        }
    })

    defineEmits(['update:campo'])

</script>