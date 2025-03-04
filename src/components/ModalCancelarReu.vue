<template>
    <!-- Modal -->
    <dialog id="modal" class="modal">
        <div class="modal-box max-w-[42rem] bg-[#202c33]">
            
            <svg-icon type="mdi" :path="path" class="text-red-400 mx-auto w-12 h-12"></svg-icon>
            
            <p class="text-lg py-2 text-center">¿Está seguro de cancelar la reunion {{ reunion.nombre }}?, Esta acción no se puede revertir.</p>

            <div class="modal-action">
                <form method="dialog" class="w-full rounded text-center">
                    <!-- if there is a button in form, it will close the modal -->
                    <button 
                        class="btn bg-red-400 border-2 border-red-400 text-white hover:bg-red-700 transition-colors duration-300 mr-1"
                        @click="$emit('cancelar-reunion')"
                        type="btn"
                    >
                        Aceptar
                    </button>
                    <button
                        class="btn bg-slate-400 border-2 border-slate-400 text-white hover:bg-slate-700 transition-colors duration-300"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup>
    
    //Imports de librerias de iconos
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiAlert } from '@mdi/js';

    //Variables de iconografia
    const path = mdiAlert;

    //Información obtenida del componente padre
    defineProps({
        reunion: {
            type: Object,
            required: true
        }
    })

    // Funciones obtenidas del componente padre
    // update:datos actualiza la variable del componente padre, cancelar-reunion ejecuta el metodo del componente padre
    const emit = defineEmits(['update:datos', 'cancelar-reunion'])

</script>
