<script setup>

    import { reactive } from 'vue';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Textfield from '@/components/Textfield.vue';
    import { uid } from 'uid';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useRouter } from 'vue-router';
    const store = useProyectoStore()
    const router = useRouter()

    const nuevoProyecto = reactive({
        id: uid(),
        nombre: "",
        version: "",
        estado: "Pendiente",
        id_usuario: 1,
        acta_aceptacion: null
    })

    const guardarProyecto = async (proyecto) => {
        await store.crearProyecto(proyecto)
        router.push({name:'proyectos'})
    }

</script>

<template>
    
    <Header />

    <div class="container mx-auto px-4 mt-16 min-h-[75vh]">
        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Nuevo Proyecto</h1>

        <form @submit.prevent="guardarProyecto(nuevoProyecto)">

            <div class="space-y-4 mt-8">

                <Textfield 
                    :label="'Nombre del proyecto: *'"
                    v-model:campo="nuevoProyecto.nombre"
                    :requerido="true"
                />

                <Textfield
                    :label="'Version del proyecto: *'"
                    v-model:campo="nuevoProyecto.version"
                    :requerido="true"
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

