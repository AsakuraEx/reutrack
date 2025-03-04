<template>
    <!-- Modal -->
    <dialog id="modalCancelar" class="modal">
        <div class="modal-box max-w-[42rem] bg-[#202c33]">
            
            <svg-icon type="mdi" :path="path" class="text-red-400 mx-auto w-12 h-12"></svg-icon>
            
            <p class="text-lg font-bold py-2 text-center">¿Está seguro de borrar la versión "{{ version.nombre }}"?
                , Esta acción no se puede deshacer.</p>

            <div class="modal-action">
                <form method="dialog" class="w-full rounded text-center">
                    <!-- if there is a button in form, it will close the modal -->
                    <button 
                        class="btn bg-red-400 border-2 border-red-400 text-white hover:bg-red-700 transition-colors duration-300 mr-1"
                        @click="cancelarVersion(version.id, version.id_proyecto)"
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
    
    // Import de librerias externas
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiAlert } from '@mdi/js';

    // Import de stores de pinia
    import { useProyectoStore } from '@/stores/proyectos';
    
    // Variables de librerias externas
    const path = mdiAlert;
    
    // Variables de store de pinia
    const store = useProyectoStore()

    // Props o variables recibidos 
    defineProps({
        version: {
            type: Object,
            required: true
        }
    })

    // Funciones o eventos recibidos
    const emit = defineEmits(['update:datos'])

    // Metodo para ejecutar la cancelación de versión
    const cancelarVersion = async (id, proyecto) => {
        await store.cancelarVersion(id)     //Ejecuta metodo asincrono donde se proporciona el id de la versión
        const data = await store.mostrarVersiones(proyecto, null, 10, 1)    //Una vez cancela la versión, obtiene el nuevo listado
        await emit('update:datos', data.data)   //Actualiza con el listado nuevo, el array del componente padre
    }
</script>
