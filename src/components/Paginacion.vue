<template>
    <div class="mt-8 flex justify-between">
        <div class="flex items-end">
            página {{ paginacion.currentPage }} de {{ paginacion.totalPages }}
        </div>
        <div class="flex">
            <button class="py-2 px-3 border" @click="$emit('anterior')">
                Anterior
            </button>
            <button class="py-2 px-3 border" @click="$emit('siguiente')">
                Siguiente
            </button>
        </div>
    </div>
</template>

<script setup>


    const props = defineProps({
        paginacion: {
            type: Object,
            required: true
        }
    })

    const emit = defineEmits(['siguiente', 'anterior'])


</script>