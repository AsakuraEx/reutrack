<script setup>

    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue';
    import DatePicker from '@/components/DatePicker.vue';
    import CardHistorial from '@/components/CardHistorial.vue';
    import ModalCancelarReu from '@/components/ModalCancelarReu.vue';
    import Select2 from '@/components/Select2.vue';
    import { onMounted, reactive, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { useRouter } from 'vue-router';
    import { useProyectoStore } from '@/stores/proyectos';

    const store = useReunionStore()
    const reuniones = ref([])
    const modal = ref({})
    const usuarioRol = sessionStorage.getItem('rol')
    const usuarioId = sessionStorage.getItem('id')
    const storePro = useProyectoStore()
    const proyectos = ref([])

    const filtros = reactive({
        proyecto: 0,
    })

    onMounted(async ()=>{

        if(usuarioRol != 1){
            reuniones.value = await store.obtenerReuniones(null,null,null, null, usuarioId)
        }else{
            reuniones.value = await store.obtenerReuniones(null,null,null, null)
        }
        proyectos.value = await storePro.mostrarProyectos()

    })

    const cancelarReunion = async (id) => {
        await store.cancelarReunion(id)
        if(usuarioRol != 1){
            reuniones.value = await store.obtenerReuniones(null,null,null, null, usuarioId)
        }else{
            reuniones.value = await store.obtenerReuniones(null,null,null, null)
        }
    }

    const modalMostrado = (reunion) => {
        modal.value = reunion
    }

    const filtrarReuniones = async () => {

        if(usuarioId != 4){
            reuniones.value = await store.obtenerReuniones(null,null,null, filtros.proyecto, usuarioId)
        }else{
            reuniones.value = await store.obtenerReuniones(null,null,null, filtros.proyecto)
        }

        Object.assign(filtros, {
            proyecto: 0
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
                v-model:campo="filtros.proyecto"
                :requerido="false"/>

            <DatePicker 
                :label="'Desde'" 
            />
            

            <DatePicker 
                :label="'Hasta'" 
            />

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

        <ModalCancelarReu 
            :reunion="modal"
            @cancelar-reunion="cancelarReunion(modal.id)"
        />

    </div>

    <Footer />
</template>

