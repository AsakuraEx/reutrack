<template>
    <div class="mt-8 flex justify-between" v-if="paginacion.totalRecords">
        <div class="flex flex-col items-start">
            <p>
                Página {{ paginacion.currentPage }} de {{ paginacion.totalPages }}
            </p>
            <p>
                Registros: {{ paginacion.start }} - {{ paginacion.end }} de {{ paginacion.totalRecords }}
            </p>
        </div>
        <div class="flex">
            <button 
                class="py-2 px-3 border" 
                :class="control === 1 ? '':'bg-purple-600'"
                @click="$emit('anterior')"
                :disabled="control === 1"
            >
                Anterior
            </button>
            <button 
                class="py-2 px-3 border" 
                :class="control === paginacion.totalPages ? '':'bg-purple-600'"
                @click="$emit('siguiente')"
                :disabled="control === paginacion.totalPages"
            >
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
        },
        control: {
            type: Number,
            required: false
        }
    })

    const emit = defineEmits(['siguiente', 'anterior'])


</script>