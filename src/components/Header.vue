<script setup>

// Import de librerias nativas de vue
import { RouterLink } from 'vue-router'
import { onMounted, onUnmounted } from 'vue';

// Import de stores de pinia generados
import { useUsuarioStore } from '@/stores/usuarios';

// Import de librerias externas
import { jwtDecode } from 'jwt-decode';

// Variables de stores de pinia
const store = useUsuarioStore()

// Variables de librerias externas
const decoded = jwtDecode(localStorage.getItem('token')) //Decodifica el token existente en localStorage

// hook life que carga las funciones al momento que se monta el header
onMounted(async ()=>{
    store.reiniciarTiempo(decoded.id)   //Se reinicia el tiempo en caso que exista o inicia el temporizador
    store.detectarActividad()           //Se inicia la detección de actividad
})

// hook life que carga funciones al momento que se desmonta el header
onUnmounted(()=>{
    store.cancelarDeteccionActividad()  // Al desmontar el header, se elimina la detección de inactividad, sirve para no generar conflicto al regresar al login
})


</script>

<template>

    <header class="flex flex-col md:flex-row items-center items md:justify-between px-8 py-4 text-white gap-12">
            
        <RouterLink :to="{name: 'home'}" class="font-['roboto'] text-2xl font-extrabold">
            <img src="/images/Logo-reutrack-fondo-negro.svg" alt="" class="max-w-52">
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
                Nueva Reunión
            </RouterLink>
            <RouterLink  :to="{name: 'contraseña'}" class="hover:text-purple-300 transition-colors duration-300">
                Cambiar Contraseña
            </RouterLink>
            <RouterLink v-if="decoded.id_rol === 1"  :to="{name: 'usuarios'}" class="hover:text-purple-300 transition-colors duration-300">
                Usuarios
            </RouterLink>
            <button @click="store.cerrarSesion(decoded.id)" class="hover:text-purple-300 transition-colors duration-300">
                Cerrar Sesión
            </button>
        </ul>

    </header>

</template>
