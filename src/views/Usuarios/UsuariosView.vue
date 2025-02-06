<script setup>
import Header from '@/components/Header.vue';
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUsuarioStore } from '@/stores/usuarios';

const usuarioRol = sessionStorage.getItem('rol')
const store = useUsuarioStore();
const listaUsuarios = ref([]);
const usuarioActivo = sessionStorage.getItem('id');
const router = useRouter();

onMounted(async ()=>{

    if(usuarioRol != 1){
        router.push({name: 'home'})
    }

    listaUsuarios.value = await store.mostrarUsuarios()
})

const cambiarEstado = async (id, estado) => {
    await store.cambiarEstado(id,estado);
    listaUsuarios.value = await store.mostrarUsuarios()
    
}

</script>

<template>
    
    <Header :rol="usuarioRol" />

    <div class="container mx-auto px-4 min-h-screen">
        <div class="flex justify-center flex-col lg:flex-row lg:justify-between items-center border mt-16 p-4 rounded-md">
            <h1 class="text-purple-300 font-extrabold text-2xl uppercase">Usuarios del Sistema</h1>
            <RouterLink :to="{name: 'nuevousuario'}" class="border px-3 py-1 bg-purple-400 border-purple-400 hover:bg-purple-300 font-bold rounded">Nuevo Usuario</RouterLink>
        </div>

        <div class="overflow-x-auto mt-12">
            <table class="w-full">
                <thead class="uppercase text-xl font-bold border-b-2 w-full">
                    <tr>
                        <td class="px-3">Nombre</td>
                        <td class="px-3">Correo Electronico</td>
                        <td class="px-3">Estado</td>
                        <td class="px-3">Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-for="usuario in listaUsuarios">
                        <td class="py-2 px-3"> {{ usuario.nombre }} </td>
                        <td class="py-2 px-3"> {{ usuario.email }} </td>
                        <td class="py-2 px-3">
                            <button 
                                class="w-24 px-2 rounded-sm hover:scale-95 uppercase transition-transform duration-300"
                                :class="usuario.id_estado === 4 ? 'bg-green-100 text-green-700':'bg-red-100 text-red-700'"
                                @click="cambiarEstado(usuario.id, usuario.id_estado)"
                                :disabled="usuarioActivo == usuario.id"
                            >
                                {{ usuario.id_estado === 4 ? 'Activo' : 'Inactivo'  }}
                            </button>
                        </td>
                        <td class="py-2">
                            <RouterLink
                                :to="{name: 'editarusuario', params: {id: usuario.id}}"
                                class="border px-3 py-1 rounded hover:bg-yellow-500 hover:border-yellow-500 transition-colors duration-300 flex gap-2 w-fit"
                                v-if="!(usuarioActivo === usuario.id)"
                            >
                                Editar
                            </RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

