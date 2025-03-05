<script setup>

    import { reactive } from 'vue';
    import { Form, ErrorMessage, Field } from 'vee-validate';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useRoute, useRouter } from 'vue-router';
    import { jwtDecode } from 'jwt-decode';

    const store = useProyectoStore()
    const router = useRouter()
    const route = useRoute()
    const decoded = jwtDecode(sessionStorage.getItem('token'))
    const {id} = route.params

    const nuevaVersion = reactive({
        descripcion: "",
        nombre: "",
        id_estado: 1,
        id_usuario: decoded.id,
        id_proyecto: id,
        acta_aceptacion: null
    })

    const guardarVersion= async (version) => {
        try{
            await store.crearVersion(version)
            router.push({name:'versiones'})
        }catch(e){
            console.error(e)
        }
    }

</script>

<template>
    
    <Header :rol="decoded.id_rol"/>

    <div class="container mx-auto px-4 mt-16 min-h-[75vh]">
        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Detalla la nueva versión</h1>

        <Form @submit="guardarVersion(nuevaVersion)">

            <div class="space-y-4 mt-8">

                <div class="flex flex-col gap-4 items-center px-4 max-w-[400px] mx-auto">
                    <label for="version" class="text-xl px-4 md:text-left text-center">
                        Nombre de versión *:
                    </label>
                    <Field
                        type="text" 
                        name="version"
                        class="p-2 rounded border bg-transparent w-full text-center focus:outline-purple-400"
                        v-model="nuevaVersion.nombre"
                        mode="aggressive"
                        rules="required|min:4"
                    />
                    <ErrorMessage name="version" class="text-red-500" />
                </div>

                <div class="flex flex-col gap-4 items-center px-4 max-w-[400px] mx-auto">
                    <label for="descripcion" class="text-xl px-4 md:text-left text-center">
                        Descripción de la versión:
                    </label>
                    <Field
                        as="textarea"
                        type="text" 
                        name="descripcion"
                        class="p-2 rounded border bg-transparent w-full text-center focus:outline-purple-400"
                        maxLength="250"
                        v-model="nuevaVersion.descripcion"
                    />
                    <ErrorMessage name="descripcion" class="text-red-500" />
                </div>

            </div>



            <div class="flex flex-col max-w-[400px] justify-center gap-4 px-4 mt-8 mx-auto">

                <button class="bg-purple-400 hover:bg-purple-300 w-full py-2 transition-colors duration-150 font-bold rounded text-center">
                    Crear
                </button>

                <RouterLink 
                    :to="{name: 'versiones', params:{id: id}}"
                    class="bg-slate-200 hover:bg-slate-100 text-black w-full py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Cancelar
                </RouterLink>

            </div>

        </form>
    </div>

    <Footer />
</template>

