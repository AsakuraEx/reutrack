<script setup>

    import { onMounted, reactive } from 'vue';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useRouter } from 'vue-router';

    // Vee-Validate
    import { Form, ErrorMessage, Field } from 'vee-validate';
    
    const store = useProyectoStore()
    const router = useRouter()
    const usuarioRol = sessionStorage.getItem('rol')
    const usuarioId = sessionStorage.getItem('id')

    const nuevoProyecto = reactive({
        nombre: "",
        id_usuario: usuarioId
    })

    onMounted(()=>{
        if(sessionStorage.getItem('token') == null){
            router.push({name: 'login'})
        }
    })

    const guardarProyecto = async (proyecto) => {
        await store.crearProyecto(proyecto)
        router.push({name:'proyectos'})
    }

</script>

<template>
    
    <Header :rol="usuarioRol"/>

    <div class="container mx-auto px-4 mt-16 min-h-[75vh]">
        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Nuevo Proyecto</h1>

        <Form 
            @submit="guardarProyecto(nuevoProyecto)"
        >

            <div class="space-y-4 mt-8">

                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="nombre" class="text-xl px-4 md:text-left text-center">
                        Nombre del proyecto:
                    </label>
                    <Field
                        type="text" 
                        name="nombre"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="nuevoProyecto.nombre"
                        mode="aggressive"
                        rules="required|min:8"
                    />
                    <ErrorMessage name="nombre" class="text-red-500" />
                </div>

            </div>



            <div class="flex justify-center gap-4 px-4 mt-8">

                <button type="submit" class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center">
                    Crear
                </button>

                <RouterLink 
                    :to="{name: 'proyectos'}"
                    class="bg-slate-200 hover:bg-slate-100 text-black w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Cancelar
                </RouterLink>

            </div>

        </Form>
    </div>

    <Footer />
</template>

