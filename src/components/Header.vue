<script setup>

// Import de librerias nativas de vue
import { RouterLink } from 'vue-router'
import { onMounted, onUnmounted } from 'vue';

// Import de stores de pinia generados
import { useUsuarioStore } from '@/stores/usuarios';

// Import de librerias externas
import { jwtDecode } from 'jwt-decode';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDown, mdiHome, mdiAccountCircle, mdiChartGantt, mdiTimerMarkerOutline, mdiCog, mdiHistory, mdiKeyVariant, mdiLogout } from '@mdi/js';

const path = mdiChevronDown
const path2 = mdiHome
const path3 = mdiAccountCircle
const path4 = mdiChartGantt
const path5 = mdiTimerMarkerOutline
const path6 = mdiCog
const path7 = mdiHistory
const path8 = mdiKeyVariant
const path9 = mdiLogout

// Variables de stores de pinia
const store = useUsuarioStore()

// Variables de librerias externas
const decoded = jwtDecode(localStorage.getItem('token')) //Decodifica el token existente en localStorage

const toggle = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.classList.toggle('hidden');
    }
}

// hook life que carga las funciones al momento que se monta el header
onMounted(async ()=>{
    store.reiniciarTiempo(decoded.id)   //Se reinicia el tiempo en caso que exista o inicia el temporizador
    store.detectarActividad()           //Se inicia la detección de actividad
})

// hook life que carga funciones al momento que se desmonta el header
onUnmounted(()=>{
    store.cancelarDeteccionActividad()  // Al desmontar el header, se elimina la detección de inactividad, sirve para no generar conflicto al regresar al login
})


document.addEventListener('click', (event) => {
  const dropdown1 = document.getElementById('dropdown-1');
  const button1 = document.getElementById('btn-opciones');

  const dropdown2 = document.getElementById('dropdown-2');
  const button2 = document.getElementById('btn-reuniones');

  // ✅ CORREGIDO: aborta solo si falta alguno
  if (!dropdown1 || !dropdown2 || !button1 || !button2) return;

  // Dropdown 1: cerrar si abierto y clic afuera
  if (
    !dropdown1.classList.contains('hidden') &&
    !dropdown1.contains(event.target) &&
    !button1.contains(event.target)
  ) {
    dropdown1.classList.add('hidden');
  }

  // Dropdown 2: cerrar si abierto y clic afuera
  if (
    !dropdown2.classList.contains('hidden') &&
    !dropdown2.contains(event.target) &&
    !button2.contains(event.target)
  ) {
    dropdown2.classList.add('hidden');
  }
});

</script>

<template>

    <header class="flex flex-col md:flex-row items-center items md:justify-between px-8 py-4 text-white gap-12">
            
        <RouterLink :to="{name: 'home'}" class="font-['roboto'] text-2xl font-extrabold">
            <img src="/images/Logo-reutrack-fondo-negro.svg" alt="" class="max-w-52">
        </RouterLink>

        <ul class="flex flex-col md:flex-row gap-4 text-lg justify-center items-center">

            <RouterLink  :to="{name: 'home'}" class="hover:text-purple-300 transition-colors duration-300">
                <div class="flex gap-2">
                    <svg-icon type="mdi" :path="path2"></svg-icon>
                    Inicio
                </div>
            </RouterLink>

            <RouterLink v-if="decoded.id_rol === 1"  :to="{name: 'usuarios'}" class="hover:text-purple-300 transition-colors duration-300">
                <div class="flex gap-2">
                    <svg-icon type="mdi" :path="path3"></svg-icon>
                    Usuarios
                </div>
            </RouterLink>

            <RouterLink  :to="{name: 'proyectos'}" class="hover:text-purple-300 transition-colors duration-300">
                <div class="flex gap-2">
                    <svg-icon type="mdi" :path="path4"></svg-icon>
                    Proyectos
                </div>
            </RouterLink>
            
            <div class="relative hidden md:block">
                <button id="btn-reuniones" class="hover:text-purple-300 transition-colors duration-300 flex gap-2" @click="toggle('dropdown-2')">
                    <div class="flex gap-2">
                        <svg-icon type="mdi" :path="path5"></svg-icon>
                        Reuniones
                    </div>
                    <svg-icon type="mdi" :path="path"></svg-icon>
                </button>
                <div id="dropdown-2" class="absolute hidden top-10 right-0 z-10 flex-col gap-4 items-center justify-center border-white shadow-sm shadow-white px-4 py-2 rounded-lg bg-gray-800">
                    <div class="flex flex-col gap-2 w-36 text-center">
                        <RouterLink  :to="{name: 'historial'}" class="hover:text-purple-300 transition-colors duration-300">
                            Mis Reuniones
                        </RouterLink>
                        <RouterLink  :to="{name: 'reunion'}" class="hover:text-purple-300 transition-colors duration-300">
                            Nueva Reunión
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="relative z-0 hidden md:block">
                <button id="btn-opciones" class="hover:text-purple-300 transition-colors duration-300 flex gap-2" @click="toggle('dropdown-1')">
                    <svg-icon type="mdi" :path="path6"></svg-icon>
                    Opciones
                    <svg-icon type="mdi" :path="path"></svg-icon>
                </button>
                <div id="dropdown-1" class="absolute hidden top-10 right-0 z-10 flex-col gap-4 items-center justify-center border-white shadow-sm shadow-white px-4 py-2 rounded-lg  bg-gray-800">
                    <div class="flex flex-col gap-2 w-48 text-center">
                        <RouterLink  :to="{name: 'contraseña'}" class="hover:text-purple-300 transition-colors duration-300">
                            Cambiar Contraseña
                        </RouterLink>
                        <button @click="store.cerrarSesion(decoded.id)" class="hover:text-purple-300 transition-colors duration-300">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>


            <!-- Para moviles -->
            <div class="flex flex-col gap-4 items-center justify-center md:hidden">
                <RouterLink  :to="{name: 'historial'}" class="hover:text-purple-300 transition-colors duration-300">
                    <div class="flex gap-2">
                        <svg-icon type="mdi" :path="path7"></svg-icon>
                        Mis Reuniones
                    </div>
                </RouterLink>
                <RouterLink  :to="{name: 'reunion'}" class="hover:text-purple-300 transition-colors duration-300">
                    <div class="flex gap-2">
                        <svg-icon type="mdi" :path="path5"></svg-icon>
                        Nueva Reunión
                    </div>
                </RouterLink>
                <RouterLink  :to="{name: 'contraseña'}" class="hover:text-purple-300 transition-colors duration-300">
                    <div class="flex gap-2">
                        <svg-icon type="mdi" :path="path8"></svg-icon>
                        Cambiar Contraseña
                    </div>
                </RouterLink>
                <button @click="store.cerrarSesion(decoded.id)" class="hover:text-purple-300 transition-colors duration-300">
                    <div class="flex gap-2">
                        <svg-icon type="mdi" :path="path9"></svg-icon>
                        Cerrar Sesión
                    </div>
                </button>
            </div>

        </ul>

    </header>

</template>
