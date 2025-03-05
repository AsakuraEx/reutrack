<template>

    <!-- Modal -->
    <dialog id="modalFinalizar" class="modal">
        <div class="modal-box max-w-[64rem] bg-[#202c33]">
            <h3 class="text-lg font-bold py-4">Finalización de proyecto: " {{ version.nombre }}  " </h3>
            
            
            <div class="modal-action">
                <Form method="dialog" class="w-full rounded text-center py-2 space-y-4" v-slot="{ errors }" @submit="FinalizarVersion()">
                    <div class="space-y-4">
                        <label for="nombre" class="text-xl px-4 md:text-left text-center">
                            Acta de Aceptación *:
                        </label>

                        <!-- Campo de Vee-Validate que evalua errores en el campo, rules son las reglas definidas para el campo
                        mode passive es el modo predeterminado de activacion de validaciones -->

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
                    
                    <button 
                    class="btn bg-purple-400 border-2 text-white hover:bg-purple-700 transition-colors duration-300 mr-1"
                    type="submit"
                    >
                        Finalizar
                    </button>

                    <!-- .close() es un metodo nativo de la libreria que apertura el modal, sirve para cerrar el modal -->
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

    // Imports nativos de vue
    import { ref } from 'vue';
    
    // Imports de vee validate, libreria externa para realizar validaciones
    import {Form, Field, ErrorMessage} from 'vee-validate'
    
    // Imports de stores de pinia
    import { useProyectoStore } from '@/stores/proyectos';
    
    // Variables obtenidas por el componente padre
    const props = defineProps({
        version: {
            type: Object,
            required: true
        }
    })

    // Variables de formulario
    const campo = ref("")

    // Variables utilizando stores
    const store = useProyectoStore()

    //Eventos obtenidos por el componente padre
    const emit = defineEmits(['update:datos'])

    //Metodo que actualiza la versión a finalizada
    async function FinalizarVersion () {
        await store.finalizarVersion(props.version.id, campo.value) // Se necesita el id de la versión y el valor del campo
        const data = await store.mostrarVersiones(props.version.id_proyecto, null, 10, 1)   // Una vez actualizada la versión,  obtiene el nuevo listado
        await emit('update:datos', data.data)   // Mediante un evento, actualiza la variable del componente padre con el listado obtenido
        modalFinalizar.close()  //Ejecuta el evento de la libreria que se utilizó para generar el modal
        campo.value = ""    //Elimina el valor del campo en caso que se vuelva a iniciar
    }

</script>