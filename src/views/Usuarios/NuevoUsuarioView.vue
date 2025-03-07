<script setup>
import Header from '@/components/Header.vue';
import Textfield from '@/components/Textfield.vue';
import { useUsuarioStore } from '@/stores/usuarios';
import { jwtDecode } from 'jwt-decode';
import { uid } from 'uid';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useUsuarioStore()
const error = ref('');
const decoded = jwtDecode(localStorage.getItem('token'))
const router = useRouter();
const usuarioNuevo = reactive({
    nombre: '',
    email: '',
    password: '',
})

onMounted(()=>{
    const decoded = jwtDecode(localStorage.getItem('token'))
    if(decoded.id_rol != 1){
        router.push({name: 'home'})
    }

})

const asignarContra = () => {
    usuarioNuevo.password = uid(4)
}

const crearUsuario = async (data) => {
    
    if(!data.password){
        
        error.value = 'Se debe generar una contraseña generica para el usuario antes de crearlo.'
        setTimeout(()=>{
            error.value = '';
        },3000)

        return
    }
    usuarioNuevo.id = uid(6);
    await store.crearUsuario(data)
    router.push({name: 'usuarios'})

}
</script>

<template>
    
    <Header :rol="decoded.id_rol" />
    
    <div class="container mx-auto px-4 mt-16 min-h-screen">

        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Nuevo Usuario</h1>

        <div role="alert" class="alert alert-error mt-12" v-if="error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span> {{ error }} </span>
          </div>

        <form class="space-y-4 mt-8" @submit.prevent="crearUsuario(usuarioNuevo)">
            
            <Textfield 
                :label="'Nombre: *'"
                v-model:campo="usuarioNuevo.nombre"
                :requerido="true"
                :tipo="'text'"
            />

            <Textfield 
                :label="'Correo Electronico: *'"
                v-model:campo="usuarioNuevo.email"
                :requerido="true"
                :tipo="'email'"
            />

            <div class="flex flex-col gap-4 items-center px-4">
                <label class="text-xl px-4 md:text-left text-center">Contraseña</label>
                <button 
                    v-if="!usuarioNuevo.password" 
                    type="button" 
                    class="w-full lg:w-72 text-center py-2 bg-purple-500 hover:bg-purple-700 focus:scale-95 rounded-lg transition-colors duration-500"
                    @click="asignarContra()"
                >
                    Generar Contraseña
                </button>
                <h2 class="text-center font-black text-4xl"> {{ usuarioNuevo.password }} </h2>
            </div>

            <hr>

            <div class="flex justify-center gap-4 px-4 mt-8">

                <button class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center">
                    Crear
                </button>

                <RouterLink 
                    :to="{name: 'usuarios'}"
                    class="bg-slate-200 hover:bg-slate-100 text-black w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Cancelar
                </RouterLink>

            </div>

        </form>

    </div>

</template>
