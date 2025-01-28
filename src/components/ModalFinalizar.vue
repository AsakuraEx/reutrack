<template>

    <!-- Modal -->
    <dialog id="modalFinalizar" class="modal">
        <div class="modal-box max-w-[64rem] bg-[#202c33]">
            <h3 class="text-lg font-bold py-4">Finalización de proyecto: " {{ version.nombre }}  " </h3>
            
            
            <div class="modal-action">
                <form method="dialog" class="w-full rounded text-center py-2 space-y-4">
                    <Textfield 
                        :label="'Ingresa el enlace del acta de aceptación: *'" 
                        :requerido="true"
                        v-model:campo="campo"
                        :tipo="'text'"
                    />
                    <!-- if there is a button in form, it will close the modal -->
                    <button 
                    class="btn bg-purple-400 border-2 text-white hover:bg-purple-700 transition-colors duration-300 mr-1"
                    @click="FinalizarVersion()"
                    >
                        Finalizar
                    </button>
                    <button 
                    class="btn bg-transparent border-2 border-white text-white hover:bg-slate-400 transition-colors duration-300"
                    type="button"
                    onclick="modalFinalizar.close()"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    </dialog>

</template>

<script setup>

    import { ref } from 'vue';
    import Textfield from './Textfield.vue';
    import { useProyectoStore } from '@/stores/proyectos';
    const props = defineProps({
        version: {
            type: Object,
            required: true
        }
    })
    const emit = defineEmits(['update:datos'])
    const store = useProyectoStore()
    const campo = ref("")

    async function FinalizarVersion () {
        await store.finalizarVersion(props.version.id, campo.value)
        await emit('update:datos', await store.mostrarVersiones(props.version.id_proyecto))
        campo.value = ""
    }

</script>