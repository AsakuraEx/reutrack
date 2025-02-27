<script setup>

    import {RouterLink} from 'vue-router'
    import Header from '../../src/components/Header.vue'
    import Footer from '../../src/components/Footer.vue'
    import CardIndex from '@/components/CardIndex.vue';
    import { onMounted, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { useUsuarioStore } from '@/stores/usuarios';
    import { FrasesMotivadoras } from '@/assets/frases';
    import { jwtDecode } from 'jwt-decode';

    const reuniones = ref([])
    const store = useReunionStore()
    const storeUs = useUsuarioStore()
    const usuario = ref({})
    const arrayFrases = ref([]);
    const frase = ref({})
    
    onMounted(async ()=>{
        
        const decoded = jwtDecode(sessionStorage.getItem('token'))
        console.log(decoded)
        usuario.value = await storeUs.obtenerUsuario(decoded.id)
        MostrarFrase()

        if(usuario.value.id_rol != 1){
            const response = await store.obtenerReuniones(3,3,null, null, decoded.id, 1)
            reuniones.value = response.data
            
        } else {
            const response = await store.obtenerReuniones(3,3,null, null, null, 1)
            reuniones.value = response.data
        }
        

    })

    function MostrarFrase() {
        const fechaActual = new Date()
        arrayFrases.value = FrasesMotivadoras
        frase.value = arrayFrases.value.find( frase => frase.dia === fechaActual.getDate()).frase
    }

</script>

<template>
  
  <Header />
  
  <div class="container mx-auto py-4 min-h-screen text-white">
      
      <picture class="flex flex-col md:flex-row-reverse gap-4 md:gap-16 justify-end items-center mt-12 py-12">
          <div class="text-center ">
              <h2 class="text-2xl font-bold uppercase">
                  Bienvenido/a de nuevo, {{ usuario.nombre }}
              </h2>
              <span class="text-lg">
                  {{ frase }}
              </span>
          </div>
          <img 
              src="/images/Reulito-4.svg" 
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
