<script setup>

    //Componentes definidos
    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue';
    import CardHistorial from '@/components/CardHistorial.vue';
    import ModalCancelarReu from '@/components/ModalCancelarReu.vue';
    import Select2 from '@/components/Select2.vue';
    import Paginacion from '@/components/Paginacion.vue';

    //Imports para la funcionalidad
    import { onMounted, reactive, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';       //Store de pinia
    import { useProyectoStore } from '@/stores/proyectos';      //Store de pinia
    import { jwtDecode } from 'jwt-decode';                     //Libreria que decodifica tokens

    const store = useReunionStore()
    const storePro = useProyectoStore()

    const reuniones = ref([])
    const modal = ref({})
    const proyectos = ref([])

    let usuarioRol
    let usuarioId

    const filtros = reactive({
        id_proyecto: null,
        desde: '',
        hasta: ''
    })

    onMounted(async ()=>{

        const decoded = jwtDecode(localStorage.getItem('token'))
        usuarioRol = decoded.id_rol
        usuarioId = decoded.id

        if(usuarioRol != 1){
            const response = await store.obtenerReuniones(null,10,null, null, usuarioId, 1)
            reuniones.value = response.data
            paginacion.value = response
        }else{
            const response = await store.obtenerReuniones(null,10,null, null, null, 1)
            reuniones.value = response.data
            paginacion.value = response
        }
        const { data } = await storePro.mostrarProyectos(null,null,1)
        proyectos.value = data

    })

    const control = ref(1)      //Variable de control que define la página en la que se encuentra
    const paginacion = ref({})      //Almacena la respuesta de paginación

    //Metodo para busqueda siguiente, indicando si existen filtros, debe paginar con filtros
    const siguiente = async () => {
        
        
        if(control.value === paginacion.value.totalPages){
            return
        }else{

            if(usuarioRol != 1){
                control.value++;
                const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, usuarioId, control.value, filtros.desde, filtros.hasta)
                reuniones.value = response.data
                paginacion.value = response
            } else {
                control.value++;
                const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, null, control.value, filtros.desde, filtros.hasta)
                reuniones.value = response.data
                paginacion.value = response
            }

        }
    }

    //Metodo para busqueda anterior, indicando si existen filtros, debe paginar con filtros
    const anterior = async () => {
        
        if(control.value === 1){
            return
        }else{
            if(usuarioRol != 1){
                control.value--;
                const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, usuarioId, control.value, filtros.desde, filtros.hasta)

                reuniones.value = response.data
                paginacion.value = response
            } else {
                control.value--;
                const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, null, control.value, filtros.desde, filtros.hasta)

                reuniones.value = response.data
                paginacion.value = response
            }
        }
    }

    //Cancela la reunión
    const cancelarReunion = async (id) => {
        await store.cancelarReunion(id)
        if(usuarioRol != 1){
            const response = await store.obtenerReuniones(null,10,null, null, usuarioId, control.value)
            reuniones.value = response.data
            paginacion.value = response
        } else {
            const response = await store.obtenerReuniones(null,10,null, null, null, control.value)
            reuniones.value = response.data
            paginacion.value = response
        }
    }

    //Define el modal que mostrará de la tabla de registros
    const modalMostrado = (reunion) => {
        modal.value = reunion
    }

    //Metodo del botón para filtrar
    const filtrarReuniones = async () => {

        if(usuarioRol != 1){
            const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, usuarioId, control.value, filtros.desde, filtros.hasta)
            reuniones.value = response.data
            paginacion.value = response
        } else {
            const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, null, control.value, filtros.desde, filtros.hasta)
            reuniones.value = response.data
            paginacion.value = response
        }

    }

    //Reinicia todos los filtros de forma nativa
    const reiniciarFiltros = async () => {
        Object.assign(filtros, {
            id_proyecto: null,
            desde: '',
            hasta: ''
        })

        if(usuarioRol != 1){
            const response = await store.obtenerReuniones(null,10,null, null, usuarioId, 1)
            reuniones.value = response.data
            paginacion.value = response
        }else{
            const response = await store.obtenerReuniones(null,10,null, null, null, 1)
            reuniones.value = response.data
            paginacion.value = response
        }
    }

</script>

<template>

    <Header :rol="usuarioRol"/>

    <div class="container mx-auto min-h-[75vh] space-y-4 px-2">        
        <h1 class="uppercase text-2xl font-extrabold text-purple-300  text-center my-12">
            Historial de Reuniones
        </h1>
    
        <!-- sección de filtros -->
        <div class="flex flex-col lg:flex-row gap-2 bg-purple-300 border-2 border-purple-500 text-purple-800 p-4 rounded">

            <Select2 
                :label="'Proyecto'" 
                :opciones="proyectos" 
                v-model:campo="filtros.id_proyecto"
                :requerido="false"
            />

            <div class="flex flex-col w-full">
                <label class="text-xl">Desde:</label>
                <input 
                    type="date" 
                    onclick="this.showPicker()" 
                    class="p-1 rounded border bg-white text-gray-700 w-full focus:outline-purple-400"
                    :max="new Date().toISOString().split('T')[0]"
                    v-model="filtros.desde"
                >
            </div>

            <div class="flex flex-col w-full">
                <label class="text-xl">Hasta:</label>
                <input 
                    type="date" 
                    onclick="this.showPicker()" 
                    class="p-1 rounded border bg-white text-gray-700 w-full focus:outline-purple-400"
                    :min="filtros.desde"
                    :max="new Date().toISOString().split('T')[0]"
                    v-model="filtros.hasta"
                >
            </div>
        

            <div class="flex lg:w-1/5 justify-end gap-2 items-end">
                <button class="bg-purple-500 w-full hover:bg-purple-700 h-fit font-bold border text-white px-4 py-2 rounded transition-colors duration-300" @click="filtrarReuniones()">Filtrar</button>
                <button class="bg-slate-300 w-full hover:bg-slate-500 h-fit font-bold text-black hover:text-white px-4 py-2 rounded  transition-colors duration-300" @click="reiniciarFiltros()">Limpiar</button>
            </div>

        </div>

        <!-- LISTADO DE CARDS-->
        <div class="flex flex-col gap-3">
            <CardHistorial 
                v-for="reunion in reuniones"
                :titulo="reunion.nombre"
                :lugar="reunion.lugar"
                :fecha="reunion.createdAt"
                :estado="reunion.estado"
                :id="reunion.id"
                @modal-mostrado="modalMostrado({id: reunion.id, nombre: reunion.nombre})"
            />
    
        </div>

        <!-- Paginación -->
        <Paginacion 
            :paginacion="paginacion"
            @anterior="anterior"
            @siguiente="siguiente"
            :control="control"
        />

        <!-- Modal a mostrar -->
        <ModalCancelarReu 
            :reunion="modal"
            @cancelar-reunion="cancelarReunion(modal.id)"
        />

    </div>

    <Footer />
</template>

