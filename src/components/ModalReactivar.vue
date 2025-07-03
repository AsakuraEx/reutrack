<template>

    <!-- Modal -->
    <dialog id="modalReactivar" class="modal">
        <div class="modal-box max-w-[64rem] bg-[#202c33]">
            <div class="text-2xl font-bold py-4 flex flex-wrap items-center gap-4 border-b-2 border-white">
                <svg-icon type="mdi" :path="path" class="w-12 h-12"></svg-icon>
                <h1>Atención</h1>
            </div>
            
            <h3 class="mt-6 text-xl">
                Solamente podrá reactivar la reunión una vez, esta acción no puede revertirse.
                La reunión reactivada no puede ser cancelada, y tiene limitaciones de edición.
                <br> <br>
                ¿Está seguro de reactivar la reunión <strong>{{ reunion.nombre }}</strong>?  
            </h3>
            
            <div class="modal-action">
                <Form method="dialog" class="w-full rounded py-2 space-y-4" v-slot="{ resetForm, errors }" @submit="reactivarReunion()">
                    <div class="space-y-4">
                        <label for="nombre" class="text-xl md:text-left">
                            Justificación <strong class="text-red-500">*</strong>:
                        </label>

                        <!-- Campo de Vee-Validate que evalua errores en el campo, rules son las reglas definidas para el campo
                        mode passive es el modo predeterminado de activacion de validaciones -->

                        <div>
                            <Field
                                as="textarea"
                                name="campo"
                                v-model="campo"
                                rules="required|min:20|alfanumeric"
                                :validateOnChange="true"
                                :validateOnInput="true"
                                :validateOnBlur="false"
                                :validateOnMount="false"
                                placeholder="Justificación de reactivación..."
                                class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                                :class="errors.campo ? 'ring ring-red-300': ''"
                                maxLength="100"
                            />
                            <ErrorMessage name="campo" class="text-red-500 text-sm" as="p"/>
                        </div>
                    </div>
                    <div class="text-center">
                        <button 
                        class="btn bg-purple-500 border-2 text-white hover:bg-purple-700 transition-colors duration-300 mr-1"
                        type="submit"
                        >
                            Reactivar reunión
                        </button>
    
                        <!-- .close() es un metodo nativo de la libreria que apertura el modal, sirve para cerrar el modal -->
                        <button 
                        class="btn bg-transparent border-2 border-white text-white hover:bg-slate-400 transition-colors duration-300"
                        type="button"
                        @click="cerrarModal"
                        >
                            Cancelar
                        </button>
                    </div>
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
    import { useUsuarioStore } from '@/stores/usuarios';
    import { useReunionStore } from '@/stores/reuniones';

    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiAlert } from '@mdi/js';
    import { jwtDecode } from 'jwt-decode';
    const path = mdiAlert;

    // Variables obtenidas por el componente padre
    const props = defineProps({
        reunion: {
            type: Object,
            required: true
        }
    })

    // Variables de formulario
    const campo = ref("")

    // Variables utilizando stores
    const store = useReunionStore()
    const storeUs = useUsuarioStore()
    const decoded = jwtDecode(localStorage.getItem('token'))

    //Eventos obtenidos por el componente padre
    const emit = defineEmits(['update:datos', 'refrescar-listado'])

    //Metodo que actualiza la versión a finalizada
    async function reactivarReunion () {

        try {
            
            // Llama al método de la store para reactivar la reunión
            await store.ReactivarReunion(props.reunion.id, campo.value, decoded.id)
            emit('refrescar-listado')
            storeUs.MostrarMensaje('success', 'Reunión reactivada correctamente', 3000) // Muestra mensaje de éxito
            modalReactivar.close()

        }catch(e) {
            storeUs.MostrarMensaje('error', 'Ocurrió un error al reactivar la reunión: ' + e, 3000) // En caso de error, muestra el mensaje de error
        }
    }

    async function cerrarModal() {
        campo.value = null
        // Cierra el modal y emite el evento para actualizar el estado del componente padre
        modalReactivar.close()
        emit('update:datos', false) // Actualiza el estado del componente padre
    }

</script>