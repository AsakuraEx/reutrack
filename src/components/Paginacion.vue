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

            <!-- Evalua si la variable de control es igual a 1, debido a que el minimo de 
            paginas es 1, se entiende que el botón debe deshabilitarse para no decrementar más -->
            <button 
                class="py-2 px-3 border" 
                :class="control === 1 ? '':'bg-purple-600'"
                @click="$emit('anterior')"
                :disabled="control === 1"
            >
                Anterior
            </button>

            <!-- Evalua si la variable de control es igual al total de paginas
            Si esto es así, significa que ya no puedo consultar, por ende se debe deshabilitar -->
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

    // Variables obtenidas desde el componente padre
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

    // Eventos obtenidos desde el componente padre
    const emit = defineEmits(['siguiente', 'anterior'])


</script>