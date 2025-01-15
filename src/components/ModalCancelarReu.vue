<template>
    <!-- Modal -->
    <dialog id="modal" class="modal">
        <div class="modal-box max-w-[42rem] bg-[#202c33]">
            
            <svg-icon type="mdi" :path="path" class="text-red-400 mx-auto w-16 h-16"></svg-icon>
            
            <p class="text-lg py-4 text-center">¿Está seguro de cancelar la reunion <b>{{ reunion.nombre }}</b>?, Esta acción no se puede revertir.</p>

            <div class="modal-action">
                <form method="dialog" class="w-full rounded text-center py-2 space-y-4">
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
    
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiAlert } from '@mdi/js';
    const path = mdiAlert;

    defineProps({
        reunion: {
            type: Object,
            required: true
        }
    })

    const emit = defineEmits(['update:datos', 'cancelar-reunion'])

</script>
