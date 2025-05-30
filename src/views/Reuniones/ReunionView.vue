<script setup>

    //imports necesarios del sistema
    import { computed, onMounted, reactive, ref } from 'vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useReunionStore } from '@/stores/reuniones';
    import { useRouter } from 'vue-router';
    import { uid } from 'uid';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Stepper from '@/components/Stepper.vue';
    import { ErrorMessage, Field, Form } from 'vee-validate';
    import { jwtDecode } from 'jwt-decode';
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    //definición de variables
    const store = useProyectoStore()
    const storeReu = useReunionStore()
    const router = useRouter()
    const reunion = ref({})
    const arrayVersiones = ref([]);
    const arrayProyectos = ref([])
    const decoded = jwtDecode(localStorage.getItem('token'))
    const formData = reactive({
        id_proyecto: null,
        id_version: null,
        nombre: null,
        lugar: null,
        id_usuario: decoded.id,
        codigo: '',
        expiracion: '',
        id_estado: 1
    })

    //Formulario de minuta
    const minuta = reactive({
        minuta: '',
        id_reunion: reunion.value.id
    });

    //instrucciones que se cargan al mostrar la vista
    onMounted(async ()=>{
        //Se genera el codigo aleatorio con la libreria uid
        formData.codigo = uid(6);
        //Se solicita la lista de proyectos "Pendiente" (no cancelados ni finalizados)
        const response = await store.mostrarProyectos(1, null, 1);
        arrayProyectos.value = response.data
        //Se asigna la hora de expiracion del codigo
        expiracionCodigo()
    })

    const expiracionCodigo = () => {
        const fechaActual = new Date();
        const expiracion = new Date(fechaActual);
        expiracion.setMinutes(fechaActual.getMinutes() + 30);

        // Guarda en formato ISO (UTC) o timestamp para evitar problemas de zona horaria
        formData.fecha = fechaActual.toISOString(); // Ej: "2025-05-31T20:13:00.000Z"
        formData.expiracion = expiracion.toISOString(); 
    }

    const crearReunion = async () => {
        //Creo la reunion y valido
        await storeReu.iniciarReunion(formData)

        //Consulto la reunión creada        

        reunion.value = await storeReu.obtenerUltimaReunion()

        minuta.id_reunion = reunion.value.id
        //Genero la minuta de reunión
        await storeReu.GuardarMinuta(minuta)

        //Genera el encargado inicial (quien crea la reunion)
        const encargadoInicial = {
            id_reunion: reunion.value.id, 
            id_usuario: formData.id_usuario
        }
        await storeReu.agregarEncargado(encargadoInicial) 

        // Una vez consultada la reunión, redirijo a esa reunión recien creada
        await router.push({name: 'encargados', params: {id: reunion.value.id }})
    }

    const formularioVacio = computed(()=>{
        //Regresa true si existe al menos un atributo vacio del objeto
        return Object.values(formData).some(value => value === null || value === '');
    })

    const consultarVersiones = async (proyecto) => {
        if(!formData.id_proyecto){
            arrayVersiones.value = []
            return
        }
        const response = await store.mostrarVersiones(proyecto, 1, null, 1);
        arrayVersiones.value = response.data
    }

</script>

<template>
    
    <Header :rol="decoded.id_rol"/>


    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="1"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Datos Generales de la Reunión</h1>   
        
        <Form class="flex flex-col gap-4 md:gap-8" @submit="crearReunion()" v-slot="{ errors }">

            <!-- Campo de selección de proyecto con vue-select -->
            <div class="max-w-[400px] w-full mx-auto flex flex-col gap-4 items-center px-4">
                <label for="id_proyecto" class="text-xl px-4 md:text-left text-center">Proyecto: *</label>
                <v-select
                    v-model="formData.id_proyecto"
                    :options="arrayProyectos"
                    label="nombre"
                    placeholder="Seleccione..."
                    class="rounded text-black bg-white w-full"
                    :reduce="(opcion) => opcion.id"
                    @update:modelValue="consultarVersiones(formData.id_proyecto)"
                    :clearable="true"
                    :searchable="true"
                    required
                >
                    <template #no-options>
                        <div class="text-gray-500">No hay opciones disponibles</div>
                    </template>
                </v-select>
                <ErrorMessage name="id_proyecto" class="text-red-500" />
            </div>

            <!-- Campo de selección de version con vue-select -->
            <div class="max-w-[400px] w-full mx-auto flex flex-col gap-4 items-center px-4">
                <label for="id_proyecto" class="text-xl px-4 md:text-left text-center">Versión: *</label>
                <v-select
                    v-model="formData.id_version"
                    :options="arrayVersiones"
                    label="nombre"
                    placeholder="Seleccione..."
                    class="rounded text-black bg-white w-full"
                    :reduce="(opcion) => opcion.id"
                    :clearable="true"
                    :searchable="true"
                    required
                >
                    <template #no-options>
                        <div class="text-gray-500">No hay opciones disponibles</div>
                    </template>
                </v-select>
                <ErrorMessage name="id_proyecto" class="text-red-500" />
            </div>

            <div class="max-w-[400px] w-full mx-auto flex flex-col gap-4 items-center px-4">
                <label for="nombre" class="text-xl px-4 md:text-left text-center">
                    Nombre de la reunión *:
                </label>
                <Field
                    type="text" 
                    name="nombre"
                    class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    v-model="formData.nombre"
                    :class="errors.nombre ? 'ring ring-red-500': ''"
                    maxLength="100"
                    mode="aggressive"
                    rules="required"
                />
                <ErrorMessage name="nombre" class="text-red-500 text-sm" />
            </div>

            <div class="max-w-[400px] w-full mx-auto flex flex-col gap-4 items-center px-4">
                <label for="lugar" class="text-xl px-4 md:text-left text-center">
                    Lugar de la reunión *:
                </label>
                <Field
                    type="text" 
                    name="lugar"
                    class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    :class="errors.lugar ? 'ring ring-red-500': ''"
                    v-model="formData.lugar"
                    maxLength="32"
                    mode="aggressive"
                    rules="required"
                />
                <ErrorMessage name="lugar" class="text-red-500 text-sm" />
            </div>

            <div class="flex justify-end px-4">

                <button 
                    type="submit"
                    class="animate-pulse hover:animate-none bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                    :class="formularioVacio ? 'animate-none bg-gray-400/25 hover:bg-gray-400/25':''"
                    v-if="!formularioVacio"
                >
                    Iniciar Reunión
                </button>

            </div>

        </form>



    </div>

    <Footer />
</template>

<style scoped>
    /* Estilos personalizados para vue-select */
    .select {
        background-color: transparent;
        color: white;
    }

    .select:focus {
        outline: 2px solid #a78bfa; /* Color purple-400 */
    }

    .vs__dropdown-menu {
        background-color: #1f2937; /* Color de fondo del menú */
        color: white;
    }

    .vs__dropdown-option {
        color: white;
    }

    .vs__dropdown-option--highlight {
        background-color: #4f46e5; /* Color de resaltado */
    }

    .vs__selected {
        color: white;
    }

    .vs__search {
        color: white;
    }

    .vs__open-indicator {
        fill: white;
    }
</style>


