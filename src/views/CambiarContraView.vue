<template>
    
    <Header :rol="usuarioRol" />
    
    <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase mt-16">Cambio de Contraseña</h1>

    <div class="container mx-auto min-h-screen">

        <form class="mt-16 space-y-8" @submit.prevent="cambiarContraseña()">

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Contraseña actual: *
                </label>
                <input 
                    type="password" 
                    class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    :class="error.actual ? 'outline-none ring-2 ring-red-700': ''"
                    @focus="error.actual=null"
                    v-model="formData.actual"
                >
                <span class="text-center text-red-500" v-if="error.actual"> {{ error.actual }} </span>
            </div>

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Nueva contraseña: *
                </label>
                <input 
                    type="password" 
                    class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    :class="error.nueva ? 'outline-none ring-2 ring-red-700': ''"
                    @focus="error.nueva=null"
                    v-model="formData.nueva"
                >
                <span class="text-center text-red-500" v-if="error.nueva"> {{ error.nueva }} </span>
            </div>

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Repetir nueva contraseña: *
                </label>
                <input 
                    type="password" 
                    class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    :class="error.nueva2 ? 'outline-none ring-2 ring-red-700': ''"
                    @focus="error.nueva2=null"
                    v-model="formData.nueva2"
                >
                <span class="text-center text-red-500" v-if="error.nueva2"> {{ error.nueva2 }} </span>
            </div>


            <div class="flex justify-center gap-4 px-4 mt-8">

                <button class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center">
                    Crear
                </button>

                <RouterLink 
                    :to="{name: 'home'}"
                    class="bg-slate-200 hover:bg-slate-100 text-black w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Cancelar
                </RouterLink>

            </div>

        </form>

    </div>
</template>

<script setup>

import Header from '@/components/Header.vue';
import { useUsuarioStore } from '@/stores/usuarios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const usuarioRol = sessionStorage.getItem('rol')
const usuarioId = sessionStorage.getItem('id')
const router = useRouter()
const store = useUsuarioStore()

const error = reactive({
    actual: '',
    nueva: '',
    nueva2: ''
});

const formData = reactive({
    actual: '',
    nueva: '',
    nueva2: ''
})

const cambiarContraseña = async () => {
    
    if(!formData.actual){
        error.actual = "La contraseña actual es requerida"
        return
    }
    if(!formData.nueva){
        error.nueva = "La nueva contraseña es requerida"
        return
    }
    if(!formData.nueva2){
        error.nueva2 = "La contraseña a repetir es requerida"
        return
    }

    // Expresión regular
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{1,}$/;


    if(!regex.test(formData.nueva)){
        error.nueva = "La contraseña debe poseer mayusculas, minusculas, numeros, caracteres especiales y una longitud minima de 8 caracteres."
        return
    }

    if(formData.nueva2 != formData.nueva){
        error.nueva2 = "Las contraseñas no coinciden"
        return
    }

    if(! await store.validarContraseñaAnterior(usuarioId, formData.actual)){
        error.actual = "La contraseña actual no coincide con el registro del sistema."
        return
    }

    await store.actualizarContraseña(usuarioId, formData.nueva)

    router.push({name: 'home'})
}

</script>
