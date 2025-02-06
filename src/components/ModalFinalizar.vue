<template>

    <!-- Modal -->
    <dialog id="modalFinalizar" class="modal">
        <div class="modal-box max-w-[64rem] bg-[#202c33]">
            <h3 class="text-lg font-bold py-4">Finalización de proyecto: " {{ version.nombre }}  " </h3>
            
            
            <div class="modal-action">
                <Form method="dialog" class="w-full rounded text-center py-2 space-y-4" v-slot="{ errors }" @submit="FinalizarVersion()">
                    <div class="space-y-4">
                        <label for="nombre" class="text-xl px-4 md:text-left text-center">
                            Acta de Aceptacion *:
                        </label>
                        <Field
                            type="text" 
                            name="campo"
                            class="p-2 rounded text-center border bg-transparent w-full focus:outline-purple-400"
                            v-model="campo"
                            :class="errors.campo ? 'ring ring-red-500': ''"
                            maxLength="100"
                            mode="passive"
                            rules="required|website"
                        />
                        <ErrorMessage name="campo" class="text-red-500 text-sm" as="p"/>
                    </div>
                    <!-- if there is a button in form, it will close the modal -->
                    <button 
                    class="btn bg-purple-400 border-2 text-white hover:bg-purple-700 transition-colors duration-300 mr-1"
                    type="submit"
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
                </Form>
            </div>
        </div>
    </dialog>

</template>

<script setup>

    import { ref } from 'vue';
    import {Form, Field, ErrorMessage} from 'vee-validate'
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
        modalFinalizar.close()
        campo.value = ""
    }

</script>