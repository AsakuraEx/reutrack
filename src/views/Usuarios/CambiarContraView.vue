<template>
    
    <Header :rol="usuarioRol" v-if="!primeraSesion" />
    
    <h1 
        class="text-purple-300 font-extrabold text-center text-2xl uppercase"
        :class="primeraSesion ? 'mt-0 pt-16':'mt-16'"
    >
        Cambio de Contraseña
    </h1>

    <div class="container mx-auto min-h-screen">

        <Form class="mt-16 space-y-8" @submit="cambiarContraseña()" v-slot="{ errors }">


            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Contraseña actual: *
                </label>
                <div class="relative max-w-[400px] w-full">
                    <Field 
                        :type="passwordVisible ? 'text':'password'" 
                        name="actual"
                        class="border bg-transparent rounded-sm w-full p-2 focus:outline focus:outline-purple-600"
                        :class="(error || errors.nueva) ? 'ring ring-red-500': ''"
                        @focus="error = ''"
                        placeholder="Ingresa la contraseña actual"
                        v-model="formData.actual"
                        rules="required"
                        mode="lazy"
                    />
                    <button type="button" class="absolute right-2 top-2.5" @click="passwordVisible=true" v-if="passwordVisible==false">
                        <svg-icon type="mdi" class="text-white hover:text-gray-200" :path="path"></svg-icon>
                    </button>
                    <button type="button" class="absolute right-2 top-2.5" @click="passwordVisible=false" v-if="passwordVisible==true">
                        <svg-icon type="mdi" class="text-white hover:text-gray-200" :path="path2"></svg-icon>
                    </button>
                </div>
                <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
                <ErrorMessage name="actual" class="text-red-500 text-sm" />
            </div>

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Nueva contraseña: *
                </label>
                <div class="relative max-w-[400px] w-full">
                    <Field 
                        :type="passwordVisible2 ? 'text':'password'" 
                        name="nueva"
                        class="border bg-transparent rounded-sm w-full p-2 focus:outline focus:outline-purple-600"
                        :class="errors.nueva ? 'ring ring-red-500': ''"
                        placeholder="Ingresa la nueva contraseña"
                        v-model="formData.nueva"
                        rules="required|password"
                        mode="lazy"
                    />
                    <button type="button" class="absolute right-2 top-2.5" @click="passwordVisible2=true" v-if="passwordVisible2==false">
                        <svg-icon type="mdi" class="text-white hover:text-gray-200" :path="path"></svg-icon>
                    </button>
                    <button type="button" class="absolute right-2 top-2.5" @click="passwordVisible2=false" v-if="passwordVisible2==true">
                        <svg-icon type="mdi" class="text-white hover:text-gray-200" :path="path2"></svg-icon>
                    </button>
                </div>
                <ErrorMessage name="nueva" class="text-red-500 text-sm" />
            </div>

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Repetir nueva contraseña: *
                </label>
                <div class="relative max-w-[400px] w-full">
                    <Field 
                        :type="passwordVisible3 ? 'text':'password'" 
                        name="nueva2"
                        class="border bg-transparent rounded-sm w-full p-2 focus:outline focus:outline-purple-600"
                        :class="errors.nueva2 ? 'ring ring-red-500': ''"
                        placeholder="Ingresa la nueva contraseña"
                        v-model="formData.nueva2"
                        rules="required|equal:nueva"
                        mode="lazy"
                    />
                    <button type="button" class="absolute right-2 top-2.5" @click="passwordVisible3=true" v-if="passwordVisible3==false">
                        <svg-icon type="mdi" class="text-white hover:text-gray-200" :path="path"></svg-icon>
                    </button>
                    <button type="button" class="absolute right-2 top-2.5" @click="passwordVisible3=false" v-if="passwordVisible3==true">
                        <svg-icon type="mdi" class="text-white hover:text-gray-200" :path="path2"></svg-icon>
                    </button>
                </div>
                <ErrorMessage name="nueva2" class="text-red-500 text-sm" />
            </div>


            <div class="flex flex-col justify-center items-center gap-4 px-4 mt-8">

                <button class="bg-purple-400 hover:bg-purple-300 w-full md:max-w-[400px] py-2 transition-colors duration-150 font-bold rounded text-center">
                    <Spinner v-if="spinnerActivo" />
                    <p v-if="!spinnerActivo">
                        Cambiar Contraseña
                    </p>
                </button>

                <RouterLink 
                    :to="{name: 'home'}"
                    class="bg-slate-200 hover:bg-slate-100 text-black w-full md:max-w-[400px] py-2 transition-colors duration-150 font-bold rounded text-center"
                    v-if="!primeraSesion"
                >
                    Cancelar
                </RouterLink>

            </div>

        </Form>

    </div>
</template>

<script setup>

import Header from '@/components/Header.vue';
import { useUsuarioStore } from '@/stores/usuarios';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Field, ErrorMessage, Form } from 'vee-validate';
import Spinner from '@/components/Spinner.vue';

import svgIcon from '@jamescoyle/vue-icon';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
const path= mdiEyeOutline
const path2 = mdiEyeOffOutline
const passwordVisible = ref(false)
const passwordVisible2 = ref(false)
const passwordVisible3 = ref(false)
const spinnerActivo = ref(false)

const usuarioRol = sessionStorage.getItem('rol')
const usuarioId = sessionStorage.getItem('id')
const sesion = sessionStorage.getItem('session');
const router = useRouter()
const store = useUsuarioStore()


const primeraSesion = computed(()=>{
    return Number(sesion) === 1
})

const error = ref("");

const formData = reactive({
    actual: '',
    nueva: '',
    nueva2: ''
})

const cambiarContraseña = async () => {
    try{            
        spinnerActivo.value = true
        error.value = await store.actualizarContraseña(usuarioId, formData.actual, formData.nueva, sesion)
        spinnerActivo.value = false
        if(error.value){
            return
        }
        alert('Se cerrará su sesión, inicie con su nueva contraseña.')
        store.cerrarSesion(usuarioId)
        router.push({name: 'login'})
    }catch(e){
        console.error(e)
    }
}

</script>
