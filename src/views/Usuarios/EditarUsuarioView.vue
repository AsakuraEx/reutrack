<script setup>
import Header from '@/components/Header.vue';
import Textfield from '@/components/Textfield.vue';
import { useUsuarioStore } from '@/stores/usuarios';
import { jwtDecode } from 'jwt-decode';
import { uid } from 'uid';
import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useUsuarioStore()
const error = ref('');
const decoded = jwtDecode(sessionStorage.getItem('token'))
const router = useRouter();
const route = useRoute();

const {id} = route.params

const usuarioNuevo = reactive({
    nombre: '',
    email: '',
    id: id
})

onMounted(async ()=>{
    const {nombre, email} = await store.obtenerUsuario(id)
    usuarioNuevo.nombre = nombre;
    usuarioNuevo.email = email;
})

const asignarContra = () => {
    usuarioNuevo.password = uid(4)
}

const actualizarUsuario = async (id, data) => {
    
    await store.actualizarUsuario(id,data)
    router.push({name: 'usuarios'})

}
</script>

<template>
    
    <Header :rol="decoded.id_rol" />
    
    <div class="container mx-auto px-4 mt-16 min-h-screen">

        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Editar Usuario</h1>

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

        <form class="space-y-4 mt-8" @submit.prevent="actualizarUsuario(id, usuarioNuevo)">
            
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
                    Reestablecer Contraseña
                </button>
                <h2 class="text-center font-black text-4xl"> {{ usuarioNuevo.password }} </h2>
            </div>

            <hr>

            <div class="flex justify-center gap-4 px-4 mt-8">

                <button class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center">
                    Actualizar
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
