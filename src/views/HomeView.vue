<script setup>

    import {RouterLink, useRouter} from 'vue-router'
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'
    import CardIndex from '@/components/CardIndex.vue';
    import { onMounted, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    const reuniones = ref([])
    const store = useReunionStore()
    const router = useRouter() 
    const usuarioNombre = sessionStorage.getItem('usuario')
    const usuarioRol = sessionStorage.getItem('rol')
    const usuarioId = sessionStorage.getItem('id')

    onMounted(async ()=>{
        if(sessionStorage.getItem('token') == null){
            router.push({name: 'login'})
        }

        if(sessionStorage.getItem('session') === '1'){
            router.push({name: 'contraseña'})
        }
        reuniones.value = await store.obtenerReuniones(3,3,null, null, usuarioId)

    })

</script>

<template>
  
  <Header :rol="usuarioRol"/>
  
  <div class="container mx-auto py-4 min-h-screen text-white">
      
      <picture class="flex flex-col md:flex-row gap-4 md:gap-16 justify-end items-center mt-12 py-12">
          <div class="text-center ">
              <h2 class="text-2xl font-bold uppercase">
                  Bienvenido/a de nuevo, {{ usuarioNombre }}
              </h2>
              <span class="text-lg">
                  ¡No sueñes con el éxito, trabaja para lograrlo!
              </span>
          </div>
          <img 
              src="/public/images/home.png" 
              alt="imagen de perfil"
              class="rounded-full aspect-square object-cover max-w-72 lg:max-w-lg"
          >
      </picture>

      <hr>

      <div class="py-8">
          <h2 class="text-center text-2xl leading-8 uppercase font-bold text-purple-300">Un resumen de tus últimas reuniones</h2>

          <div class="mt-12 flex flex-col md:flex-row gap-4 px-3">

            <CardIndex 
                v-for="reu in reuniones"
                :reunion="reu"
            />

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
