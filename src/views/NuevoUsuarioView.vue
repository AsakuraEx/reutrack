<script setup>
import Header from '@/components/Header.vue';
import Textfield from '@/components/Textfield.vue';
import BtnSubmit from '@/components/BtnSubmit.vue';
import { uid } from 'uid';
import { reactive } from 'vue';

const usuarioRol = sessionStorage.getItem('rol')
const usuarioNuevo = reactive({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: 'estandar',
    estado: 'activo',
    id: ''
})

const asignarContra = () => {
    usuarioNuevo.contraseña = uid(4)
}
</script>

<template>
    
    <Header :rol="usuarioRol" />
    
    <div class="container mx-auto px-4 mt-16 min-h-screen">

        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Nuevo Usuario</h1>

        <form class="space-y-4 mt-8">
            
            <Textfield 
                :label="'Nombre: *'"
                v-model:campo="usuarioNuevo.nombre"
                :requerido="true"
                :tipo="'text'"
            />

            <Textfield 
                :label="'Correo Electronico: *'"
                v-model:campo="usuarioNuevo.nombre"
                :requerido="true"
                :tipo="'email'"
            />

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">Contraseña</label>
                <button 
                    v-if="!usuarioNuevo.contraseña" 
                    type="button" 
                    class="w-full text-center py-2 bg-purple-500 hover:bg-purple-700 focus:scale-95 rounded-lg transition-colors duration-500"
                    @click="asignarContra()"
                >
                    Generar Contraseña
                </button>
                <h2 class="text-center font-black text-4xl"> {{ usuarioNuevo.contraseña }} </h2>
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

</template>
