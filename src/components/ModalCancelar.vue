<template>
    <!-- Modal -->
    <dialog id="modalCancelar" class="modal">
        <div class="modal-box max-w-[42rem] bg-[#202c33]">
            
            <svg-icon type="mdi" :path="path" class="text-red-400 mx-auto w-16 h-16"></svg-icon>
            
            <p class="text-lg font-bold py-4 text-center">¿Está seguro de cancelar el proyecto {{ proyecto.nombre }} {{ proyecto.version }}?
                , Esta acción no se puede deshacer.</p>

            <div class="modal-action">
                <form method="dialog" class="w-full rounded text-center py-2 space-y-4">
                    <!-- if there is a button in form, it will close the modal -->
                    <button 
                        class="btn bg-red-400 border-2 border-red-400 text-white hover:bg-red-700 transition-colors duration-300 mr-1"
                        @click="cancelarProyecto(proyecto.id)"
                        type="submit"
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
    
    import { useProyectoStore } from '@/stores/proyectos';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiAlert } from '@mdi/js';
    const path = mdiAlert;
    const store = useProyectoStore()

    defineProps({
        proyecto: {
            type: Object,
            required: true
        }
    })

    const emit = defineEmits(['update:datos'])

    const cancelarProyecto = async (id) => {
        await store.cancelarProyecto(id)
        await emit('update:datos', await store.mostrarProyectos())
    }
</script>
