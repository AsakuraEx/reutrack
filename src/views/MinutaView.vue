<script setup>

    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Stepper from '@/components/Stepper.vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import TipTap from '@/components/TipTap.vue';
    import { mdiTrashCanOutline } from '@mdi/js';
    import { onMounted, onUnmounted, reactive, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useReunionStore } from '@/stores/reuniones';
    import { uid } from 'uid';

    const path = mdiTrashCanOutline;
    const route = useRoute()
    const {id} = route.params;     //Se obtiene el id de la reunion actual
    const idReunion = id;
    const store = useReunionStore()
    const puntos = ref([])
    const acuerdos = ref([])

    const minuta = reactive({
        id: '',
        descripcion: '',
        fechaFin: '',
        id_reunion: idReunion
    });

    const punto = reactive({
        id: '',
        nombre: '',
        id_reunion: idReunion
    })

    const acuerdo = reactive({
        id: '',
        nombre: '',
        id_reunion: idReunion
    })

    //Guarda el progreso de la minuta en sessionStorage
    const GenerarBackupReunion = () => {
        sessionStorage.setItem('minuta', minuta.descripcion);
        console.log('Guardado en el session storage');
        minuta.descripcion = sessionStorage.getItem('minuta')
    }

    onMounted(async ()=>{
        
        minuta.descripcion = sessionStorage.getItem('minuta')
        puntos.value = await store.obtenerPuntos(idReunion)
        acuerdos.value = await store.obtenerAcuerdos(idReunion)
        //Cada 20 segundos genera una copia de la minuta en el SessionStorage
        const backup = setInterval(()=>{
            GenerarBackupReunion()
        }, 20000)

    })

    const agregarPunto = async () => {
        punto.id = uid()
        await store.agregarPuntos(punto)
        puntos.value = await store.obtenerPuntos(idReunion)
    }

    const agregarAcuerdo = async () => {
        acuerdo.id = uid()
        await store.agregarAcuerdos(acuerdo)
        acuerdos.value = await store.obtenerAcuerdos(idReunion)
    }

    const eliminarPunto = async (id) => {
        await store.eliminarPuntos(id)
        puntos.value = await store.obtenerPuntos(idReunion)
        
    }

    const eliminarAcuerdo = async (id) => {
        await store.eliminarAcuerdos(id)
        acuerdos.value = await store.obtenerAcuerdos(idReunion)
    }






</script>

<template>

    <Header />
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="4"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Descripción de la reunión</h1> 

        <form class="px-4 space-y-8">

            <div class="space-y-4">
                <h2 class="text-xl font-bold">Puntos de la reunión</h2>
                <!-- FORMULARIO DE PUNTOS DE LA REUNION-->
                <div class="flex flex-col lg:flex-row gap-4">

                    <!-- CAMPO DE TEXTO Y BOTON-->
                    <form class="flex flex-col gap-2 lg:w-1/2" @submit.prevent="agregarPunto()">
                        <div class="flex flex-col gap-2">
                            <label>Punto Tratado:</label>
                            <input type="text" class="bg-transparent border rounded outline-purple-300 w-full p-2" v-model="punto.nombre" required>
                        </div>
                        <button class="bg-purple-400 hover:bg-purple-500 transition-colors duration-300 py-2 rounded w-full lg:w-52" type="submit">
                            Agregar
                        </button>
                    </form>

                    <!-- LISTADO DE CARDS-->
                    <div class="flex flex-col gap-3 lg:w-1/2">
                        <!-- CARD DE ANOTACION POR PUNTO TRATADO-->
                        <div class="border bg-transparent p-3 flex justify-between items-center rounded" v-for="punto in puntos">
                            <p>
                                {{ punto.nombre }}
                            </p>
                            <button type="button" class="bg-red-500 hover:bg-red-400 p-1 rounded" @click="eliminarPunto(punto.id)">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </div>

                    </div>

                </div>
            </div>


            <div class="space-y-4">
                <h2 class="text-xl font-bold">Descripción de la reunión *</h2>
                <TipTap 
                    v-model="minuta.descripcion" 
                />
                <h2>Contenido de la Minuta:</h2>
                <div v-html="minuta.descripcion"></div>
            </div>

            <div class="space-y-4">
                <h2 class="text-xl font-bold">Acuerdos y Compromisos</h2>
                <!-- FORMULARIO DE ACUERDOS Y COMPROMISOS-->
                <div class="flex flex-col lg:flex-row gap-4">

                    <!-- CAMPO DE TEXTO Y BOTON-->
                    <form class="flex flex-col gap-2 lg:w-1/2" @submit.prevent="agregarAcuerdo()">
                        <div class="flex flex-col gap-2">
                            <label>Acuerdo o Compromiso:</label>
                            <input type="text" class="bg-transparent border rounded outline-purple-300 w-full p-2" v-model="acuerdo.nombre" required>
                        </div>
                        <button class="bg-purple-400 hover:bg-purple-500 transition-colors duration-300 py-2 rounded w-full lg:w-52" type="submit">
                            Agregar
                        </button>
                    </form>

                    <!-- LISTADO DE CARDS-->
                    <div class="flex flex-col gap-3 lg:w-1/2">
                        <!-- CARD DE ANOTACION POR ACUERDO O COMPROMISO-->
                        <div class="border bg-transparent p-3 flex justify-between items-center rounded" v-for="acuerdo in acuerdos">
                            <p>
                                {{ acuerdo.nombre }}
                            </p>
                            <button class="bg-red-500 hover:bg-red-400 p-1 rounded" @click="eliminarAcuerdo(acuerdo.id)">
                                <svg-icon type="mdi" :path="path"></svg-icon>
                            </button>
                        </div>

                    </div>

                </div>
            </div>

        </form>

        <div class="flex justify-between px-4 mt-12">

            <RouterLink 
                :to="{name: 'asistencia', params: {id: idReunion }}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Anterior
            </RouterLink>

            <RouterLink 
                v-if="minuta"
                :to="{name: 'historial'}"
                class="bg-purple-500 hover:bg-purple-400 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center animate-pulse hover:animate-none"
            >
                Finalizar Reunión
            </RouterLink>

            
        </div>

    </div>

    

    <Footer/>
</template>