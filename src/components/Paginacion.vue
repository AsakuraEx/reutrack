<template>
    <div class="mt-8 flex justify-between">
        <div class="flex items-end">
            página {{ paginacion.currentPage }} de {{ paginacion.totalPages }}
        </div>
        <div class="flex">
            <div class="py-2 px-3 border">
                <button @click="anterior">
                    Anterior
                </button>
            </div>
            <div class="py-2 px-3 border">
                <button @click="siguiente">
                    Siguiente
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref, onMounted } from 'vue';

    const control = ref({
        actual: 1,
        total: 1,
    })

    const props = defineProps({
        paginacion: {
            type: Object,
            required: true
        }
    })

    const siguiente = () => {
        
        console.log(control.value.actual)
        console.log(props.paginacion.totalPages)

        if(control.value.actual === props.paginacion.totalPages){
            console.log("Ya no puede incrementar mas")
        }else{
            control.value.actual++;
        }
    }

    const anterior = () => {
        
        console.log(control.value.actual)
        console.log(props.paginacion.totalPages)

        if(control.value.actual === 1){
            console.log("Ya no puede decrementar mas")
        }else{
            control.value.actual--;
        }
    }

</script>