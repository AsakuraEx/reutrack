<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUsuarioStore } from '@/stores/usuarios';
import { onMounted, onUnmounted } from 'vue';

const store = useUsuarioStore()
const id = sessionStorage.getItem('id')

defineProps({
    rol:{
        type: String,
        required:true
    }
})

onMounted(()=>{
    store.detectarActividad()
    store.reiniciarTiempo()
})

onUnmounted(()=>{
    store.cancelarDeteccionActividad()
})


</script>

<template>

    <header class="flex flex-col md:flex-row items-center items md:justify-between px-8 py-4 text-white gap-12">
            
        <RouterLink :to="{name: 'home'}" class="font-['roboto'] text-2xl font-extrabold">
            REUTRACK
        </RouterLink>

        <ul class="flex flex-col md:flex-row gap-4 text-lg justify-center items-center">
            <RouterLink  :to="{name: 'home'}" class="hover:text-purple-300 transition-colors duration-300">
                Inicio
            </RouterLink>
            <RouterLink  :to="{name: 'proyectos'}" class="hover:text-purple-300 transition-colors duration-300">
                Proyectos
            </RouterLink>
            <RouterLink  :to="{name: 'historial'}" class="hover:text-purple-300 transition-colors duration-300">
                Mis Reuniones
            </RouterLink>
            <RouterLink  :to="{name: 'reunion'}" class="hover:text-purple-300 transition-colors duration-300">
                Nueva Reunion
            </RouterLink>
            <RouterLink  :to="{name: 'contraseña'}" class="hover:text-purple-300 transition-colors duration-300">
                Cambiar Contraseña
            </RouterLink>
            <RouterLink v-if="rol !== 'estandar'"  :to="{name: 'usuarios'}" class="hover:text-purple-300 transition-colors duration-300">
                Usuarios
            </RouterLink>
            <button @click="store.cerrarSesion(id)" class="hover:text-purple-300 transition-colors duration-300">
                Cerrar Sesión
            </button>
        </ul>

    </header>

</template>
