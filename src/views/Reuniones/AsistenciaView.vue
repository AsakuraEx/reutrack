<script setup>
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
    import Stepper from '@/components/Stepper.vue'
    import Textfield from '@/components/Textfield.vue';
    import BtnSubmit from '@/components/BtnSubmit.vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline } from '@mdi/js';
    import { useRoute, useRouter } from 'vue-router';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { uid } from 'uid';
    import { Field, ErrorMessage, Form } from 'vee-validate';

    //Variables del sistema
    const path = mdiTrashCanOutline;
    const route = useRoute()
    const {id} = route.params;     //Se obtiene el id de la reunion actual
    const idReunion = id;
    const store = useReunionStore()
    const router = useRouter()
    const usuarioRol = sessionStorage.getItem('rol')
    const reunion = ref({})

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

    //Pull de funciones que se cargan al montar el componente
    onMounted(async ()=>{
        if(sessionStorage.getItem('token') == null){
            router.push({name: 'login'})
        }
        participantes.value = await store.obtenerParticipantes(idReunion)
        reunion.value = await store.obtenerReunion(idReunion)
    })

    // Variables con diferentes funcionalidades del sistema
    const agregarParticipante = async () => {
        await store.agregarParticipante(formData.value)
        participantes.value = await store.obtenerParticipantes(idReunion)
        Object.assign(formData.value, {
            participante: '',
            institucion: '',
            cargo: '',
            doc_identidad: '',
            telefono: '',
            correo: '',
            id_reunion: idReunion,
            
        })
    }

    const eliminarAsistencia = async (id) => {
        await store.eliminarAsistencia(id)
        participantes.value = await store.obtenerParticipantes(idReunion)
    }

    //Comprueba si existen participantes en el array, retorna un booleano
    const existenParticipantes = computed(()=>{
        return participantes.value.length > 0;
    })
</script>

<template>
    
        
    <Header :rol="usuarioRol"/>
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="3"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Lista de Asistencia</h1>
        <h2 class="text-xl font-extrabold text-center text-purple-400">Codigo: {{ reunion.codigo }}</h2>  
        
        <Form class="flex flex-col gap-8 md:gap-0" @submit="agregarParticipante">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="participante" class="text-xl px-4 md:text-left text-center">
                        Nombre de participante *:
                    </label>
                    <Field
                        type="text" 
                        name="participante"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.participante"
                        mode="aggressive"
                        rules="required"
                    />
                    <ErrorMessage name="participante" class="text-red-500" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="institucion" class="text-xl px-4 md:text-left text-center">
                        Institución o Dependencia *:
                    </label>
                    <Field
                        type="text" 
                        name="institucion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.institucion"
                        mode="aggressive"
                        rules="required"
                    />
                    <ErrorMessage name="institucion" class="text-red-500" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="cargo" class="text-xl px-4 md:text-left text-center">
                        Cargo *:
                    </label>
                    <Field
                        type="text" 
                        name="cargo"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.cargo"
                        mode="aggressive"
                        rules="required"
                    />
                    <ErrorMessage name="cargo" class="text-red-500" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="doc_identidad" class="text-xl px-4 md:text-left text-center">
                        DUI *:
                    </label>
                    <Field
                        type="text" 
                        name="doc_identidad"
                        placeholder="########-#"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.doc_identidad"
                        mode="aggressive"
                        rules="required|dui"
                    />
                    <ErrorMessage name="doc_identidad" class="text-red-500" />
                </div>
                
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="telefono" class="text-xl px-4 md:text-left text-center">
                        Teléfono *:
                    </label>
                    <Field
                        type="text" 
                        name="telefono"
                        placeholder="########"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.telefono"
                        mode="aggressive"
                        rules="required|telefono"
                    />
                    <ErrorMessage name="telefono" class="text-red-500" />
                </div>
                    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="correo" class="text-xl px-4 md:text-left text-center">
                        Correo Electrónico *:
                    </label>
                    <Field
                        type="text" 
                        name="correo"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.correo"
                        mode="aggressive"
                        rules="required|email"
                    />
                    <ErrorMessage name="correo" class="text-red-500" />
                </div>

            </div>
            <div class="mx-auto mt-6 w-full lg:w-32">
                <BtnSubmit />
            </div>

        </Form>

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
                        <td colspan="7" class="py-2 text-center text-gray-300">No existen participantes registrados en esta reunion...</td>
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
                                @click="eliminarAsistencia(x.id)" 
                                class="bg-red-500 hover:bg-red-400 p-1 rounded">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="flex justify-between px-4 mt-12">

            <RouterLink 
                :to="{name: 'encargados', params:{id: idReunion}}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Anterior
            </RouterLink>

            <RouterLink 
                :to="{name: 'minuta', params:{id: idReunion}}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Siguiente
            </RouterLink>

            
        </div>

    </div>

    <Footer />
</template>

