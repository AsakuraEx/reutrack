<script setup>

    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Stepper from '@/components/Stepper.vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import TipTap from '@/components/TipTap.vue';
    import { mdiTrashCanOutline } from '@mdi/js';
    import { onBeforeUnmount, onMounted, reactive, ref, computed} from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useReunionStore } from '@/stores/reuniones';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { jwtDecode } from 'jwt-decode';

    const path = mdiTrashCanOutline;        //Parte del icono
    const route = useRoute()        //Se utiliza para obtener informacion de la URL
    const {id} = route.params;     //Se obtiene el id de la reunion actual
    const idReunion = id;           //Se almacena en una variable para evitar conflicto de nombres
    const store = useReunionStore() //Contiene metodos utiles para el manejo de la vista
    const puntos = ref([])          //Se almacenan todos los puntos
    const acuerdos = ref([])        //Se almacenan todos los acuerdos guardados
    const router = useRouter()      //Se utiliza para redireccionar a otra vista
    const usuarioRol = localStorage.getItem('rol')
    const reunion = ref({})
    const listaEncargados = ref([])
    const decoded = jwtDecode(localStorage.getItem('token'))
    let backup;
    const error = ref('')
    const hora = ref('')

    //Formulario de minuta
    const minuta = reactive({
        minuta: '',
        id_reunion: idReunion
    });

    //Formulario del punto de la reunion
    const punto = reactive({
        nombre: '',
        id_reunion: idReunion
    })

    //Formulario del acuerdo de la reunion
    const acuerdo = reactive({
        nombre: '',
        id_reunion: idReunion
    })

    onMounted(async ()=>{
        //Limpia el objeto
        Object.assign(minuta, {
            minuta: '',
            id_reunion: idReunion
        })

        //Obteniendo minuta
        const minutaActual = await store.obtenerMinuta(idReunion)
        reunion.value = await store.obtenerReunion(idReunion)

        listaEncargados.value = await store.obtenerEncargados(id) //Se obtiene información para la tabla
        if(reunion.value.id_estado != 1){
            router.push({name:'historial'})
        }
        if(!(!!listaEncargados.value.find(encargado => encargado.id_usuario === decoded.id)) && decoded.id_rol !== 1){
            router.push({name:'historial'})
        }
        
        minuta.minuta = minutaActual.minuta
        minuta.id_reunion = minutaActual.id_reunion

        //Se agrega el metodo para evitar que se cierre la ventana
        window.addEventListener('beforeunload', handleBeforeUnload)

        //Obtiene puntos
        puntos.value = await store.obtenerPuntos(idReunion)
        
        //Obtiene acuerdos
        acuerdos.value = await store.obtenerAcuerdos(idReunion)

        //Si no existe algo guarda vacio
        if(!minuta.minuta){
            minuta.minuta = ''
        }


        //Cada 20 segundos genera una copia de la minuta en el localStorage
        backup = setInterval(()=>{
            //Ejecuta el metodo para realizar patch al registro de la minuta
            actualizarMinuta()

        }, 60000)


    })
    
    // Función para manejar el evento beforeunload
    const handleBeforeUnload = (event) => {
        // Guarda la minuta antes de cerrar
        actualizarMinuta();
        // Activa el mensaje de confirmación del navegador
        event.preventDefault();
        event.returnValue = ''; // Requerido para algunos navegadores
    };

    onBeforeUnmount(()=>{
        actualizarMinuta()
        //Limpia el intervalo
        clearInterval(backup)
        window.removeEventListener('beforeunload', handleBeforeUnload);
    })

    const actualizarMinuta = async () => {
        //Ejecuta el metodo para actualizar la minuta actual
        await store.actualizarMinuta(idReunion, minuta)
        localStorage.setItem('minuta', minuta.minuta)
        hora.value = "Último autoguardado: " + new Date().toLocaleString()

    }

    const agregarPunto = async (values, {resetForm}) => {

        try{

            await store.agregarPuntos(punto)
            puntos.value = await store.obtenerPuntos(idReunion)
            resetForm()
            Object.assign(punto, {
                nombre: '',
                id_reunion: idReunion
            })
        }catch(e){
            console.error(e)
        }
    }

    const agregarAcuerdo = async (values, {resetForm}) => {

        try{
            //realiza el guardado del acuerdo
            await store.agregarAcuerdos(acuerdo)
            //Actualiza el array de acuerdos
            acuerdos.value = await store.obtenerAcuerdos(idReunion)
            resetForm()
            //Limpia el objeto de acuerdos
            Object.assign(acuerdo, {
                nombre: '',
                id_reunion: idReunion
            })
        }catch(e){
            console.error(e)
        }

    }

    const eliminarPunto = async (id) => {
        await store.eliminarPuntos(id)
        puntos.value = await store.obtenerPuntos(idReunion)
        
    }

    const eliminarAcuerdo = async (id) => {
        await store.eliminarAcuerdos(id)
        acuerdos.value = await store.obtenerAcuerdos(idReunion)
    }

    const finalizarReunion = async () => {

        if(minuta.minuta === '<p></p>'){
            error.value = 'La descripción de la reunión esta vacia'
            return
        }

        //Elimina el intervalo
        clearInterval(backup)
        //Marca la reunion como finalizada
        await store.actualizarMinuta(idReunion, minuta)
        await store.FinalizarReunion(idReunion)

        //Finalmente envia al historial de reuniones
        router.push({name: 'historial'})
    }

    const contarLetras = computed(() => {
        let texto = minuta.minuta.toString().replace(/(<([^>]+)>)/ig, '')
        console.log(texto)
        return texto.length
    })

</script>

<template>

    <Header :rol="usuarioRol"/>
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-[70vh]">
        
        <Stepper :step="4"/>

        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Minuta de reunión</h1> 
        <p class="text-purple-500 text-center text-xl">Código: <b>{{ reunion.codigo }}</b></p>

        <div class="px-4 space-y-8">

            <div class="space-y-4">
                <h2 class="text-xl font-bold">Puntos de la reunión</h2>
                <!-- FORMULARIO DE PUNTOS DE LA REUNION-->
                <div class="flex flex-col lg:flex-row gap-4">

                    <!-- CAMPO DE TEXTO Y BOTON-->
                    <Form class="flex flex-col gap-2 lg:w-1/2" @submit="agregarPunto" v-slot="{isSubmitting, resetForm}"> 
                        <div class="flex flex-col gap-2">
                            <label>Punto Tratado:</label>
                            <Field type="text" name="nombre" class="bg-transparent border rounded outline-purple-300 w-full p-2" maxLength="256" v-model="punto.nombre" rules="required|alfanumeric"/>
                        </div>
                        <ErrorMessage name="nombre" class="text-red-500 text-sm" />
                        <button 
                            class="bg-purple-400 hover:bg-purple-500 transition-colors duration-300 py-2 rounded w-full lg:w-52" 
                            type="submit"
                        >
                            Agregar
                        </button>
                    </Form>

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
                <div>
                    <TipTap 
                        v-model="minuta.minuta" 
                    />
                    <div class="flex flex-col gap-1 lg:flex-row justify-center lg:justify-between">
                        <span class="text-gray-300 font-light italic">
                            Nota: Para guardar la minuta, debe escribir al menos 20 caracteres
                        </span>
                        <span class="text-gray-300 text-sm">{{ hora }}</span>
                    </div>
                </div>
                <p class="text-red-500 text-sm" v-if="error">{{ error }}</p>
            </div>

            <div class="space-y-4">
                <h2 class="text-xl font-bold">Acuerdos y Compromisos</h2>
                <!-- FORMULARIO DE ACUERDOS Y COMPROMISOS-->
                <div class="flex flex-col lg:flex-row gap-4">

                    <!-- CAMPO DE TEXTO Y BOTON-->
                    <Form class="flex flex-col gap-2 lg:w-1/2" @submit="agregarAcuerdo" v-slot="{ resetForm }">
                        <div class="flex flex-col gap-2">
                            <label>Acuerdo o Compromiso:</label>
                            <Field type="text" name="nombre" class="bg-transparent border rounded outline-purple-300 w-full p-2" maxLength="256" v-model="acuerdo.nombre" rules="required|alfanumeric" />
                            <ErrorMessage name="nombre" class="text-red-500 text-sm" />
                        </div>
                        <button class="bg-purple-400 hover:bg-purple-500 transition-colors duration-300 py-2 rounded w-full lg:w-52" type="submit">
                            Agregar
                        </button>
                    </Form>

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

        </div>

        <div class="flex justify-between px-4 mt-12">

            <RouterLink 
                :to="{name: 'asistencia', params: {id: idReunion }}"
                class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
            >
                Anterior
            </RouterLink>

            <button 
                v-if="contarLetras >= 20"
                type="button"
                @click="finalizarReunion()"
                class="bg-purple-500 hover:bg-purple-400 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center animate-pulse hover:animate-none"
            >
                Finalizar Reunión
            </button>

            
        </div>

    </div>

    

    <Footer/>
</template>