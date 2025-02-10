<template>
    <div class="flex justify-center items-center text-gray-300 text-xl md:text-2xl lg:text-3xl min-h-screen flex-col">
        <img src="/public/images/Reulito-1.svg" alt="" class="max-w-64">
        <h1>¡Muchas gracias!</h1>
    </div>
</template>

<script setup>
    
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()

    onMounted(()=>{
        setTimeout(()=>{
            router.push({name: 'login'})
        },5000)
    })

</script>
