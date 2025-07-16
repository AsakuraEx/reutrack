<script setup>
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
    import Stepper from '@/components/Stepper.vue'
    import SvgIcon from '@jamescoyle/vue-icon';
    import QRCodeVue3 from 'qrcode-vue3';
    import { mdiTrashCanOutline, mdiQrcode } from '@mdi/js';
    import { useRoute, useRouter } from 'vue-router';
    import { computed, onMounted, ref, watch, reactive } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { Field, ErrorMessage, Form } from 'vee-validate';
    import { jwtDecode } from 'jwt-decode';
    import { useUsuarioStore } from '@/stores/usuarios';


    //Variables del sistema
    const path = mdiTrashCanOutline;
    const path2 = mdiQrcode;
    const route = useRoute()
    const {id} = route.params;     //Se obtiene el id de la reunion actual
    const idReunion = id;
    const store = useReunionStore()
    const storeUs = useUsuarioStore();
    const router = useRouter()
    const usuarioRol = localStorage.getItem('rol')
    const reunion = ref({})
    const listaEncargados = ref([])
    const decoded = jwtDecode(localStorage.getItem('token'))
    const QRCode = 'https://reutrack.salud.gob.sv/invitado/' + id

    //Variable que representa el formulario
    const formData = ref({
        participante: '',
        institucion: '',
        cargo: '',
        doc_identidad: '',
        telefono: '',
        correo: '',
        id_reunion: idReunion,
    })

    //Variable que representa la lista de participantes
    const participantes = ref([]);
    const modal = reactive({
        id: '',
        nombre: ''
    })
    
    const extranjero = ref(false);
    const error = ref('')

    //Pull de funciones que se cargan al montar el componente
    onMounted(async ()=>{
        try {
            participantes.value = await store.obtenerParticipantes(idReunion)
            reunion.value = await store.obtenerReunion(idReunion)
    
            listaEncargados.value = await store.obtenerEncargados(id) //Se obtiene información para la tabla

        }catch(e){
            storeUs.MostrarMensaje('error', 'Error al cargar los datos de la reunión: ' + e.message, 3000)
        }

        if(reunion.value.id_estado != 1){
            router.push({name:'historial'})
        }
        if(!(!!listaEncargados.value.find(encargado => encargado.id_usuario === decoded.id)) && decoded.id_rol !== 1){
            router.push({name:'historial'})
        }

    })

    // Variables con diferentes funcionalidades del sistema
    const agregarParticipante = async (values, { resetForm }) => {
        //Valida que existe participante con ese documento
        if(participantes.value.find(participante => participante.doc_identidad === formData.value.doc_identidad)){
            error.value = 'El participante ya fue agregado segun documento de identidad...'
            storeUs.MostrarMensaje('error', error.value, 3000)
            return
        }

        //Valida que existe participante con ese telefono
        if(participantes.value.find(participante => participante.telefono === formData.value.telefono)){
            error.value = 'El participante ya fue agregado segun número de teléfono...'
            storeUs.MostrarMensaje('error', error.value, 3000)
            return
        }
        
        //Valida que existe participante con ese correo
        if(participantes.value.find(participante => participante.correo === formData.value.correo)){
            error.value = 'El participante ya fue agregado segun correo electrónico...'
            storeUs.MostrarMensaje('error', error.value, 3000)
            return
        }

        //Realiza el guardado del participante
        try{
            await store.agregarParticipante(formData.value)
            participantes.value = await store.obtenerParticipantes(idReunion)
            
            storeUs.MostrarMensaje('success', 'Participante agregado correctamente', 3000)
            resetForm();
            Object.assign(formData.value, {
                participante: '',
                institucion: '',
                cargo: '',
                doc_identidad: '',
                telefono: '',
                correo: '',
                id_reunion: idReunion,
                
            })
        }catch(e){
            console.error('Error al agregar participante: ', error.message)
            storeUs.MostrarMensaje('error', 'Error al agregar participante: ' + e.message, 3000)
        }
        

    }

    //Elimina al participante de la lista de asistencia
    const eliminarAsistencia = async (id) => {
        try{
            await store.eliminarAsistencia(id)
            participantes.value = await store.obtenerParticipantes(idReunion)
            storeUs.MostrarMensaje('success', 'Participante eliminado correctamente', 3000)
        }catch(e){
            storeUs.MostrarMensaje('error', 'Error al eliminar el participante: ' + e.message, 3000)
        }   
    }

    //Comprueba si existen participantes en el array, retorna un booleano
    const existenParticipantes = computed(()=>{
        return participantes.value.length > 0;
    })

    //Muestra el modal segun el registro seleccionado
    const modalMostrado = (id, participante) => {
        Object.assign(modal, {
            id: id,
            nombre: participante
        })
    }

    //Esta verificando si existen cambios en el campo telefono y doc_identidad para agregar el caracter
    watch(formData, ()=>{
        if (formData.value.doc_identidad.length === 8 && !formData.value.doc_identidad.includes('-')) {
            formData.value.doc_identidad += '-';
        }

        if (formData.value.telefono.length === 4 && !formData.value.telefono.includes('-')) {
            formData.value.telefono += '-';
        }
    }, {deep:true})

</script>

<template>
    
        
    <Header :rol="usuarioRol"/>
    

    <h1 class="text-3xl font-extrabold text-center py-5 text-purple-300">Registro de Reunión</h1>
    <h1 class="text-3xl font-extrabold text-center pb-12 text-purple-300"> {{ reunion.nombre }} </h1>
    <div class="w-full flex justify-center mb-9" v-if="reunion.reactivado">
        <h3 class="text-center font-semibold text-xl text-white bg-sky-500 rounded px-2 py-1 w-fit">Reunión reactivada</h3>
    </div>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="3"/>

        <h1 class="text-xl font-extrabold text-center pt-12 uppercase px-4">Lista de Asistencia</h1>
        <div class="flex justify-between py-12" v-if="!reunion.reactivado">
            <p class="text-purple-500 text-center text-xl">Código: <b>{{ reunion.codigo }}</b></p>
            
            <!-- campo que verifica si es extranjero -->
            <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text text-white px-4">Extranjero</span>
                  <input type="checkbox" checked="checked" class="checkbox checkbox-primary" v-model="extranjero"/>
                </label>
              </div>
        </div>
        
        <Form class="flex flex-col gap-8 md:gap-0 pb-4" @submit="agregarParticipante" v-slot="{ resetForm, errors }" v-if="!reunion.reactivado">

            <div 
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                :class="extranjero ? 'lg:grid-cols-2':'lg:grid-cols-3'"
            >

                <!-- Campo -->
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="participante" class="text-xl px-4 md:text-left text-center">
                        Nombre de participante *:
                    </label>
                    <Field
                        type="text" 
                        name="participante"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.participante ? 'ring ring-red-500': ''"
                        v-model="formData.participante"
                        maxLength="50"
                        rules="required|alfanumeric"
                    />
                    <ErrorMessage name="participante" class="text-red-500 text-sm" />
                </div>
    
                <!-- Campo -->
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="institucion" class="text-xl px-4 md:text-left text-center">
                        Institución o Dependencia *:
                    </label>
                    <Field
                        type="text" 
                        name="institucion"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.institucion ? 'ring ring-red-500': ''"
                        maxLength="50"
                        v-model="formData.institucion"
                        rules="required|alfanumeric"
                    />
                    <ErrorMessage name="institucion" class="text-red-500 text-sm" />
                </div>
    
                <!-- Campo -->
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="cargo" class="text-xl px-4 md:text-left text-center">
                        Cargo *:
                    </label>
                    <Field
                        type="text" 
                        name="cargo"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.cargo ? 'ring ring-red-500': ''"
                        maxLength="50"
                        v-model="formData.cargo"
                        rules="required|alfanumeric"
                    />
                    <ErrorMessage name="cargo" class="text-red-500 text-sm" />
                </div>
    
                <!-- Campo -->
                <div class="flex flex-col gap-4 items-center px-4" v-if="!extranjero">
                    <label for="doc_identidad" class="text-xl px-4 md:text-left text-center">
                        DUI *:
                    </label>
                    <Field
                        type="text" 
                        name="doc_identidad"
                        placeholder="00000000-0"
                        maxLength="10"
                        rules="required|dui"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.doc_identidad ? 'ring ring-red-500': ''"
                        v-model="formData.doc_identidad"
                    />
                    <ErrorMessage name="doc_identidad" class="text-red-500 text-sm" />
                </div>
                
                <!-- Campo -->
                <div class="flex flex-col gap-4 items-center px-4" v-if="!extranjero">
                    <label for="telefono" class="text-xl px-4 md:text-left text-center">
                        Teléfono *:
                    </label>
                    <Field
                        type="text" 
                        name="telefono"
                        placeholder="0000-0000"
                        maxLength="9"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.telefono ? 'ring ring-red-500': ''"
                        v-model="formData.telefono"
                        rules="required|telefono"
                    />
                    <ErrorMessage name="telefono" class="text-red-500 text-sm" />
                </div>
                    
                <!-- Campo -->
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="correo" class="text-xl px-4 md:text-left text-center">
                        Correo Electrónico *:
                    </label>
                    <Field
                        type="text" 
                        name="correo"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.correo ? 'ring ring-red-500': ''"
                        maxLength="120"
                        v-model="formData.correo"
                        rules="required|email"
                    />
                    <ErrorMessage name="correo" class="text-red-500 text-sm" />
                </div>

            </div>

            
            <div class="mx-auto mt-6 w-full flex flex-col lg:flex-row justify-center gap-4 px-4">
                <button 
                    type="submit"
                    class="bg-purple-400 hover:bg-purple-500 focus:scale-95 transition-colors duration-300 py-2 rounded w-full lg:w-32">
                    Agregar
                </button>
                <button
                    type="button"
                    onclick="modalQR.showModal()"  
                    class="bg-transparent text-purple-500 border-purple-500 
                  hover:bg-purple-500 hover:text-white transition-colors duration-300 ease-in
                    border-2 rounded-sm px-9 py-2 w-full lg:w-32 flex gap-2 items-center justify-center"
                >
                    <svg-icon type="mdi" :path="path2"></svg-icon>
                    QR
                </button>
            </div>
            
        </Form>

        <!-- Modal de QR -->
        <dialog id="modalQR" class="modal" onclick="modalQR.close()">
            <div class="modal-box max-w-[42rem] bg-[#202c33]">
                <div class="flex justify-center items-center gap-4">
                    
                    <p class="text-lg font-bold py-1 text-center">
                        El código QR para registrarse, solamente tiene la vigencia de 2 horas despues de iniciada la reunión.
                    </p>
                </div>

                <div class="flex justify-center">
                    <QRCodeVue3 
                        :value="QRCode"
                        image="/images/Reulito-6.svg"
                        :dotsOptions="{
                            type: 'square',
                            color: '#a855f7'
                        }"
                    />
                </div>

                <div class="modal-action">
                    <form method="dialog" class="w-full rounded text-center">
                        <button 
                            class="btn bg-slate-400 border-2 border-slate-400 text-white hover:bg-slate-700 transition-colors duration-300"
                        >
                            Cerrar
                        </button>
                    </form>
                </div>
            </div>
        </dialog>

        <!-- TABLA DE DATOS DE ASISTENCIA -->
        <div class="overflow-x-auto px-4">
            <table class="w-full mt-8">
                <thead>
                    <tr class="font-bold text-lg border-b-2">
                        <td class="py-2">Participante</td>
                        <td class="py-2">DUI</td>
                        <td class="py-2">Cargo</td>
                        <td class="py-2">Institución</td>
                        <td class="py-2">Teléfono</td>
                        <td class="py-2">Correo Electrónico</td>
                        <td class="py-2">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-if="!existenParticipantes">
                        <td colspan="7" class="py-2 text-center text-gray-300">No existen participantes registrados en esta reunión...</td>
                    </tr>
                    <tr class="border-b" v-for="x in participantes">
                        <td class="py-2">{{ x.participante }}</td>
                        <td class="py-2">{{ x.doc_identidad }}</td>
                        <td class="py-2">{{ x.cargo }}</td>
                        <td class="py-2">{{ x.institucion }}</td>
                        <td class="py-2">{{ x.telefono }}</td>
                        <td class="py-2">{{ x.correo }}</td>
                        <td class="py-2">
                            <button
                                v-if="!reunion.reactivado"
                                onclick="modalCancelar.showModal()" 
                                @click="modalMostrado(x.id, x.participante)"
                                class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>

                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <dialog id="modalCancelar" class="modal">
            <div class="modal-box max-w-[42rem] bg-[#202c33]">
                <div class="flex justify-center items-center gap-4">
                    <svg-icon type="mdi" :path="path" class="text-red-400 w-8 h-8"></svg-icon>
                    
                    <p class="text-lg font-bold py-1 text-center">
                        ¿Está seguro de eliminar al participante {{ modal.nombre }}?
                    </p>
                </div>

                <div class="modal-action">
                    <form method="dialog" class="w-full rounded text-center">
                        <!-- if there is a button in form, it will close the modal -->
                        <button 
                            class="btn bg-red-400 border-2 border-red-400 text-white hover:bg-red-700 transition-colors duration-300 mr-1"
                            @click="eliminarAsistencia(modal.id)"
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
        
        <div class="flex justify-between px-4 mt-12">

            <RouterLink 
                :to="{name: 'encargados', params:{id: idReunion}}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Anterior
            </RouterLink>

            <RouterLink 
                :to="{name: 'minuta', params:{id: idReunion}}"
                v-if="existenParticipantes || 1===1"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Siguiente
            </RouterLink>

            
        </div>

    </div>

    <Footer />
</template>

