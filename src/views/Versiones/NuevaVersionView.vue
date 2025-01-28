<script setup>

    import { onMounted, reactive } from 'vue';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Textfield from '@/components/Textfield.vue';
    import { uid } from 'uid';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useRoute, useRouter } from 'vue-router';
    const store = useProyectoStore()
    const router = useRouter()
    const route = useRoute()
    const usuarioRol = sessionStorage.getItem('rol')
    const usuarioId = sessionStorage.getItem('id')
    const {id} = route.params

    const nuevaVersion = reactive({
        descripcion: "",
        nombre: "",
        id_estado: 1,
        id_usuario: usuarioId,
        id_proyecto: id,
        acta_aceptacion: null
    })

    onMounted(()=>{
        if(sessionStorage.getItem('token') == null){
            router.push({name: 'login'})
        }
    })

    const guardarVersion= async (version) => {
        await store.crearVersion(version)
        router.push({name:'versiones'})
    }

</script>

<template>
    
    <Header :rol="usuarioRol"/>

    <div class="container mx-auto px-4 mt-16 min-h-[75vh]">
        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Detalla la nueva versión</h1>

        <form @submit.prevent="guardarVersion(nuevaVersion)">

            <div class="space-y-4 mt-8">

                <Textfield 
                    :label="'Nombre de versión: *'"
                    v-model:campo="nuevaVersion.nombre"
                    :requerido="true"
                    :tipo="'text'"
                />

                <Textfield
                    :label="'Descripción de version: *'"
                    v-model:campo="nuevaVersion.descripcion"
                    :requerido="true"
                    :tipo="'text'"
                />

            </div>



            <div class="flex justify-center gap-4 px-4 mt-8">

                <button class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center">
                    Crear
                </button>

                <RouterLink 
                    :to="{name: 'proyectos'}"
                    class="bg-slate-200 hover:bg-slate-100 text-black w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Cancelar
                </RouterLink>

            </div>

        </form>
    </div>

    <Footer />
</template>

