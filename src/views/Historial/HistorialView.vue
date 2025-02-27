<script setup>

    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue';
    import CardHistorial from '@/components/CardHistorial.vue';
    import ModalCancelarReu from '@/components/ModalCancelarReu.vue';
    import Select2 from '@/components/Select2.vue';
    import { onMounted, reactive, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { useProyectoStore } from '@/stores/proyectos';
    import Paginacion from '@/components/Paginacion.vue';
    import { jwtDecode } from 'jwt-decode';

    const store = useReunionStore()
    const reuniones = ref([])
    const modal = ref({})
    const storePro = useProyectoStore()
    const proyectos = ref([])

    let usuarioRol
    let usuarioId

    const filtros = reactive({
        id_proyecto: 0,
        desde: new Date().toISOString().split('T')[0],
        hasta: new Date().toISOString().split('T')[0]
    })

    onMounted(async ()=>{

        const decoded = jwtDecode(sessionStorage.getItem('token'))
        usuarioRol = decoded.id_rol
        usuarioId = decoded.id

        if(usuarioRol != 1){
            const response = await store.obtenerReuniones(null,10,null, null, usuarioId, 1, filtros)
            console.log(response)
            reuniones.value = response.data
            paginacion.value = response
        }else{
            const response = await store.obtenerReuniones(null,10,null, null, null, 1)
            console.log(response)
            reuniones.value = response.data
            paginacion.value = response
        }
        const { data } = await storePro.mostrarProyectos(1,null,1)
        proyectos.value = data
        console.log(proyectos.value)

    })

    const control = ref(1)
    const paginacion = ref({})

    const siguiente = async () => {
        
        
        if(control.value === paginacion.value.totalPages){
            console.log("Ya no puede incrementar mas")
        }else{

            if(usuarioRol != 1){
                control.value++;
                const response = await store.obtenerReuniones(null,10,null, null, usuarioId, control.value)
                console.log(response)
                reuniones.value = response.data
                paginacion.value = response
            } else {
                control.value++;
                const response = await store.obtenerReuniones(null,10,null, null, null, control.value)
                console.log(response)
                reuniones.value = response.data
                paginacion.value = response
            }

        }
    }

    const anterior = async () => {
        
        if(control.value === 1){
            console.log("Ya no puede decrementar mas")
        }else{
            control.value--;
            const response = await store.obtenerReuniones(null,10,null, null, usuarioId, control.value)
            console.log(response)
            reuniones.value = response.data
            paginacion.value = response
        }
    }

    const cancelarReunion = async (id) => {
        await store.cancelarReunion(id)
        if(usuarioRol != 1){
            const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, usuarioId, control.value)
            console.log(response)
            reuniones.value = response.data
            paginacion.value = response
        } else {
            const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, null, control.value)
            console.log(response)
            reuniones.value = response.data
            paginacion.value = response
        }
    }

    const modalMostrado = (reunion) => {
        modal.value = reunion
    }

    const filtrarReuniones = async () => {

        if(usuarioRol != 1){
            const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, usuarioId, control.value)
            console.log(response)
            reuniones.value = response.data
            paginacion.value = response
        } else {
            const response = await store.obtenerReuniones(null,10,null, filtros.id_proyecto, null, control.value)
            console.log(response)
            reuniones.value = response.data
            paginacion.value = response
        }

        Object.assign(filtros, {
            id_proyecto: 0,
        desde: new Date().toISOString().split('T')[0],
        hasta: new Date().toISOString().split('T')[0]
        })
    }

</script>

<template>

    <Header :rol="usuarioRol"/>

    <div class="container mx-auto min-h-[75vh] space-y-4 px-2">        
        <h1 class="uppercase text-2xl font-extrabold text-purple-300 text-center my-12">
            Historial de Reuniones
        </h1>
    
        <div class="flex flex-col lg:flex-row gap-2">

            <Select2 
                :label="'Proyecto'" 
                :opciones="proyectos" 
                v-model:campo="filtros.id_proyecto"
                :requerido="false"/>

                <div class="flex flex-col w-full">
                    <label class="text-xl">Desde:</label>
                    <input 
                        type="date" 
                        onclick="this.showPicker()" 
                        class="p-1.5 rounded border bg-transparent w-full focus:outline-purple-400"
                        :max="filtros.hasta"
                        v-model="filtros.desde"
                    >
                </div>

                <div class="flex flex-col w-full">
                    <label class="text-xl">Hasta:</label>
                    <input 
                        type="date" 
                        onclick="this.showPicker()" 
                        class="p-1.5 rounded border bg-transparent w-full focus:outline-purple-400"
                        :min="filtros.desde"
                        v-model="filtros.hasta"
                    >
                </div>
        

            <div class="flex lg:w-1/5 justify-end gap-2 items-end">
                <button class="bg-slate-300 w-full hover:bg-slate-500 h-fit font-bold text-black px-4 py-2 rounded" @click="filtrarReuniones()">Filtrar</button>
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

        <Paginacion 
            :paginacion="paginacion"
            @anterior="anterior"
            @siguiente="siguiente"
            :control="control"
        />

        <ModalCancelarReu 
            :reunion="modal"
            @cancelar-reunion="cancelarReunion(modal.id)"
        />

    </div>

    <Footer />
</template>

