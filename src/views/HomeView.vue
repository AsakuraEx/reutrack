<script setup>

    import {RouterLink} from 'vue-router'
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'

</script>

<template>
  
  <Header />
  
  <div class="container mx-auto py-4 min-h-screen text-white">
      
      <picture class="flex flex-col md:flex-row gap-4 md:gap-16 justify-end items-center mt-12 py-12">
          <div class="text-center ">
              <h2 class="text-2xl font-bold uppercase">
                  Bienvenido/a de nuevo, Ana Gabriela Mendoza de Leiva
              </h2>
              <span class="text-lg">
                  ¡No sueñes con el éxito, trabaja para lograrlo!
              </span>
          </div>
          <img 
              src="https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/09/Poses-Perfil-Profesional-Mujeres-ago.-10-2023-1-819x1024.jpg?lossy=1&strip=1&webp=1" 
              alt="imagen de perfil"
              class="rounded-full aspect-square object-cover max-w-72 lg:max-w-lg"
          >
      </picture>

      <hr>

      <div class="py-8">
          <h2 class="text-center text-2xl leading-8 uppercase font-bold text-purple-300">Un resumen de tus últimas reuniones</h2>

          <div class="mt-12 flex flex-col md:flex-row gap-4 px-3">
              <div class="border p-2 flex flex-col w-full md:w-1/3 gap-4">
                  <p class="text-xl font-bold">Reunión para la verificación de la implementación de RRI</p>
                  <p class="font-light text-slate-300">Lugar de Reunion: <b>Megacentro de Vacunación</b></p>
                  <span class="font-light italic">08/01/2025 11:30 A.M</span>

                  <RouterLink :to="{name:'detalle'}" class="border rounded bg-transparent hover:bg-slate-400 px-3 py-1 transition-colors duration-300 text-center">Ver Detalle de Reunión</RouterLink>
              </div>

              <div class="border p-2 flex flex-col w-full md:w-1/3 gap-4">
                  <p class="text-xl font-bold">Reunión para la verificación de la implementación de RRI</p>
                  <p class="font-light text-slate-300">Lugar de Reunion: <b>Megacentro de Vacunación</b></p>
                  <span class="font-light italic">08/01/2025 11:30 A.M</span>
  
                  <RouterLink :to="{name:'detalle'}" class="border rounded bg-transparent hover:bg-slate-400 px-3 py-1 transition-colors duration-300 text-center">Ver Detalle de Reunión</RouterLink>
              </div>

              <div class="border p-2 flex flex-col w-full md:w-1/3 gap-4">
                  <p class="text-xl font-bold">Reunión para la verificación de la implementación de RRI</p>
                  <p class="font-light text-slate-300">Lugar de Reunion: <b>Megacentro de Vacunación</b></p>
                  <span class="font-light italic">08/01/2025 11:30 A.M</span>
  
                  <RouterLink :to="{name:'detalle'}" class="border rounded bg-transparent hover:bg-slate-400 px-3 py-1 transition-colors duration-300 text-center">Ver Detalle de Reunión</RouterLink>

              </div>

          </div>
      </div>

      <div class="mt-8">

          <div class="border bg-slate-500 flex flex-col md:flex-row items-center p-4 gap-4 justify-center">
              <h1 class="text-2xl uppercase font-bold text-center">
                  ¿Quieres registrar una nueva reunión?
              </h1>

              <RouterLink 
                  :to="{name: 'reunion'}"
                  class="bg-purple-400 hover:bg-purple-300 font-bold px-2 py-4 rounded w-full md:max-w-72 text-center"
              >
                  Nueva Reunión
              </RouterLink>
          </div>
      </div>

  </div>

  <Footer />

</template>
