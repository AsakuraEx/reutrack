<script setup>

    //imports necesarios del sistema
    import { computed, onMounted, reactive, ref } from 'vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useReunionStore } from '@/stores/reuniones';
    import { useRouter } from 'vue-router';
    import { uid } from 'uid';
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'
    import Stepper from '../../src/components/Stepper.vue'
    import Textfield from '@/components/Textfield.vue';
    import Select from '@/components/Select.vue';

    //definición de variables
    const store = useProyectoStore()
    const storeReu = useReunionStore()
    const router = useRouter()
    const arrayProyectos = ref([]);
    const formData = reactive({
        id: uid(8),
        proyecto: 0,
        nombre: '',
        lugar: '',
        id_usuario: 1,
        codigo: '',
        fecha: '',
        expiracion: '',
        estado: 'Iniciado'
    })

    //instrucciones que se cargan al mostrar la vista
    onMounted(async ()=>{
        //Se genera el codigo aleatorio con la libreria uid
        formData.codigo = uid(6);
        //Se solicita la lista de proyectos "Pendiente" (no cancelados ni finalizados)
        arrayProyectos.value = await store.mostrarProyectos('Pendiente');
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

    const crearReunion = () => {
        storeReu.iniciarReunion(formData)        
        router.push({name: 'encargados', params: {id: formData.id}})
    }

    const formularioVacio = computed(()=>{
        //Regresa true si existe al menos un atributo vacio del objeto
        return Object.values(formData).includes('')
    })

</script>

<template>
    
    <Header />


    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="1"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Datos Generales de la Reunión</h1> 
        
        <h1 class="text-2xl font-black text-center py-12 px-4 text-purple-500">Codigo de Reunión: {{ formData.codigo }}</h1>  
        
        <form class="flex flex-col gap-4 md:gap-8" @submit.prevent="crearReunion()">

            <Select 
                :label="'Proyecto asociado: *'" 
                :opciones="arrayProyectos" 
                :requerido="true"
                v-model:campo="formData.proyecto" 
            />

            <Textfield 
                :label="'Nombre de la reunión: *'"
                :requerido="true" 
                v-model:campo="formData.nombre"
                :tipo="'text'"
            />

            <Textfield 
                :label="'Lugar de la reunión: *'" 
                :requerido="true"
                v-model:campo="formData.lugar"
                :tipo="'text'"
            />

            <div class="flex justify-end px-4">

                <button 
                    type="submit"
                    class="animate-pulse hover:animate-none bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                    :class="formularioVacio ? 'animate-none bg-gray-400/25 hover:bg-gray-400/25':''"
                    :disabled="formularioVacio"
                >
                    Iniciar Reunión
                </button>

            </div>

        </form>



    </div>

    <Footer />
</template>
