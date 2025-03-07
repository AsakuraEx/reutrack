<script setup>

    import { reactive } from 'vue';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useRouter } from 'vue-router';
    import { jwtDecode } from 'jwt-decode';

    // Vee-Validate
    import { Form, ErrorMessage, Field } from 'vee-validate';
    
    const store = useProyectoStore()
    const router = useRouter()
    const decoded = jwtDecode(localStorage.getItem('token'))

    //Formulario
    const nuevoProyecto = reactive({
        nombre: "",
        id_usuario: decoded.id
    })

    //Guarda el proyecto
    const guardarProyecto = async (proyecto) => {
        try {
            await store.crearProyecto(proyecto)
            router.push({name:'proyectos'})
        }catch(e){
            console.error(e)
        }
    }

</script>

<template>
    
    <Header :rol="decoded.id_rol"/>

    <div class="container mx-auto px-4 mt-16 min-h-[75vh]">
        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Nuevo Proyecto</h1>

        <Form 
            @submit="guardarProyecto(nuevoProyecto)"
        >

            <div class="space-y-4 mt-8 max-w-[400px] mx-auto">

                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="nombre" class="text-xl px-4 md:text-left text-center">
                        Nombre del proyecto:
                    </label>
                    <Field
                        type="text" 
                        name="nombre"
                        class="p-2 rounded border bg-transparent w-full text-center focus:outline-purple-400"
                        v-model="nuevoProyecto.nombre"
                        mode="aggressive"
                        rules="required|min:3"
                    />
                    <ErrorMessage name="nombre" class="text-red-500" />
                </div>

            </div>



            <div class="flex flex-col max-w-[400px] mx-auto items-center w-full justify-center gap-4 px-4 mt-8">

                <button type="submit" class="bg-purple-400 hover:bg-purple-300 w-full py-2 transition-colors duration-150 font-bold rounded text-center">
                    Crear
                </button>

                <RouterLink 
                    :to="{name: 'proyectos'}"
                    class="bg-slate-200 hover:bg-slate-100 text-black w-full py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Cancelar
                </RouterLink>

            </div>

        </Form>
    </div>

    <Footer />
</template>

