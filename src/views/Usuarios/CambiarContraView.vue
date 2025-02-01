<template>
    
    <Header :rol="usuarioRol" v-if="!primeraSesion" />
    
    <h1 
        class="text-purple-300 font-extrabold text-center text-2xl uppercase mt-16"
        :class="primeraSesion ? 'mt-0 pt-16':''"
    >
        Cambio de Contraseña
    </h1>

    <div class="container mx-auto min-h-screen">

        <Form class="mt-16 space-y-8" @submit="cambiarContraseña()">

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Contraseña actual: *
                </label>
                <Field 
                    type="password" 
                    name="actual"
                    class="p-2 rounded border bg-transparent w-full max-w-[400px] focus:outline-purple-400"
                    v-model="formData.actual"
                    rules="required"
                    mode="passive"
                />
                <ErrorMessage name="actual" class="text-red-500" />
            </div>

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Nueva contraseña: *
                </label>
                <Field 
                    type="password" 
                    name="nueva"
                    class="p-2 rounded border bg-transparent w-full max-w-[400px] focus:outline-purple-400"
                    v-model="formData.nueva"
                    rules="required|password"
                    mode="lazy"
                />
                <ErrorMessage name="nueva" class="text-red-500" />
            </div>

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">
                    Repetir nueva contraseña: *
                </label>
                <Field 
                    type="password" 
                    name="nueva2"
                    class="p-2 rounded border bg-transparent w-full max-w-[400px] focus:outline-purple-400"
                    v-model="formData.nueva2"
                    rules="required|equal:nueva|password"
                    mode="lazy"
                />
                <ErrorMessage name="nueva2" class="text-red-500" />
            </div>


            <div class="flex flex-col justify-center items-center gap-4 px-4 mt-8">

                <button class="bg-purple-400 hover:bg-purple-300 w-full md:max-w-[400px] py-2 transition-colors duration-150 font-bold rounded text-center">
                    Cambiar Contraseña
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

const usuarioRol = sessionStorage.getItem('rol')
const usuarioId = sessionStorage.getItem('id')
const sesion = sessionStorage.getItem('session');
const router = useRouter()
const store = useUsuarioStore()

const primeraSesion = computed(()=>{
    return Number(sesion) === 1
})

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
    
    if(! await store.validarContraseñaAnterior(usuarioId, formData.actual)){
        error.actual = "La contraseña actual no coincide con el registro del sistema."
        return
    }

    await store.actualizarContraseña(usuarioId, formData.nueva)

    router.push({name: 'home'})
}

</script>
