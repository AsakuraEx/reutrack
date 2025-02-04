<script setup>

    //imports necesarios del sistema
    import { computed, onMounted, reactive, ref } from 'vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useReunionStore } from '@/stores/reuniones';
    import { useRouter } from 'vue-router';
    import { uid } from 'uid';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Stepper from '@/components/Stepper.vue'
    import Textfield from '@/components/Textfield.vue';
    import { ErrorMessage, Field, Form } from 'vee-validate';

    //definición de variables
    const store = useProyectoStore()
    const storeReu = useReunionStore()
    const router = useRouter()
    const reunion = ref({})
    const arrayVersiones = ref([]);
    const arrayProyectos = ref([])
    const usuarioRol = sessionStorage.getItem('rol')
    const usuarioId = sessionStorage.getItem('id')
    const formData = reactive({
        id_proyecto: '',
        id_version: '',
        nombre: '',
        lugar: '',
        id_usuario: usuarioId,
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
        arrayProyectos.value = await store.mostrarProyectos(1)
        //Se asigna la hora de expiracion del codigo
        expiracionCodigo()
    })

    const expiracionCodigo = () => {
        const fechaActual = new Date()
        formData.fecha = fechaActual.toLocaleString();

        const expiracion = new Date(fechaActual);
        expiracion.setMinutes(fechaActual.getMinutes() + 30)
        formData.expiracion = expiracion.toLocaleString()
    }

    const crearReunion = async () => {
        //Creo la reunion y valido
        await storeReu.iniciarReunion(formData)

        //Consulto la reunión creada        
        reunion.value = await storeReu.obtenerUltimaReunion()

        minuta.id_reunion = reunion.value.id
        //Genero la minuta de reunión
        await storeReu.GuardarMinuta(minuta)

        // Una vez consultada la reunión, redirijo a esa reunión recien creada
        await router.push({name: 'encargados', params: {id: reunion.value.id }})
    }

    const formularioVacio = computed(()=>{
        //Regresa true si existe al menos un atributo vacio del objeto
        return Object.values(formData).includes('')
    })

    const consultarVersiones = async (proyecto) => {
        console.log("Solicitando las versiones del proyecto con id:" + proyecto)
        arrayVersiones.value = await store.mostrarVersiones(proyecto,1);
    }

</script>

<template>
    
    <Header :rol="usuarioRol"/>


    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="1"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Datos Generales de la Reunión</h1> 
        
        <h1 class="text-2xl font-black text-center py-12 px-4 text-purple-500">Codigo de Reunión: {{ formData.codigo }}</h1>  
        
        <Form class="flex flex-col gap-4 md:gap-8" @submit="crearReunion()" v-slot="{ errors }">

            <!-- SELECT PERSONALIZADO  -->
            <div 
                class="max-w-[400px] w-full mx-auto flex flex-col gap-4 items-center px-4" 
            >
                <label for="id_proyecto" class="text-xl px-4 md:text-left text-center">Proyecto: *</label>
                <select
                    name="id_proyecto" 
                    class="p-2 rounded text-center border bg-transparent w-full focus:outline-purple-400" 
                    @change="consultarVersiones(formData.id_proyecto)"
                    v-model="formData.id_proyecto"
                    required
                >
                    <option class="text-gray-900" value="" selected>Seleccione...</option>
                    <option v-for="opcion in arrayProyectos" class="text-gray-900" :value="opcion.id"> {{ opcion.nombre }} </option>
                </select>

                <ErrorMessage name="id_proyecto" class="text-red-500" />
            </div>

            <!-- SELECT PERSONALIZADO  -->
            <div 
                class="max-w-[400px] w-full mx-auto flex flex-col gap-4 items-center px-4" 
            >
                <label for="id_version" class="text-xl px-4 md:text-left text-center">Versión: *</label>
                <select
                    name="id_version"
                    class="p-2 rounded text-center border bg-transparent w-full focus:outline-purple-400" 
                    required
                    v-model="formData.id_version"
                >
                    <option class="text-gray-900" value="" selected>Seleccione...</option>
                    <option v-for="opcion in arrayVersiones" class="text-gray-900" :value="opcion.id"> {{ opcion.proyecto.nombre }} {{ opcion.nombre }}</option>
                </select>

                <ErrorMessage name="id_version" class="text-red-500" />
            </div>

            <div class="max-w-[400px] w-full mx-auto flex flex-col gap-4 items-center px-4">
                <label for="nombre" class="text-xl px-4 md:text-left text-center">
                    Nombre de la reunión *:
                </label>
                <Field
                    type="text" 
                    name="nombre"
                    class="p-2 rounded text-center border bg-transparent w-full focus:outline-purple-400"
                    v-model="formData.nombre"
                    :class="errors.nombre ? 'ring ring-red-500': ''"
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
                    class="p-2 rounded text-center border bg-transparent w-full focus:outline-purple-400"
                    :class="errors.lugar ? 'ring ring-red-500': ''"
                    v-model="formData.lugar"
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
