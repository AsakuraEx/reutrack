<template>
    <div class="h-screen flex flex-col md:flex-row gap-2 justify-center items-center">
        <img src="/public/images/Reulito-5.svg" alt="" class="w-1/4">
        <div class="block">
            <h1 class="text-5xl font-black text-purple-500 mb-4 text-center uppercase">No estas autenticado</h1>
            <h2 class="font-black leading-3 text-xl text-center">Debes iniciar sesión para acceder al sitio, seras redirigido al inicio de sesión en 5 segundos.</h2>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

    onMounted(()=>{
        setTimeout(()=>{
            router.push({name: 'login'})
        }, 5000)
    })

</script>