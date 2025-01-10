<script setup>

    defineProps({
        step: {
            type: Number,
            required: true
        }
    })

</script>

<template>
    <div class="flex items-center justify-between mb-4">
        <!-- Paso 1 -->
        <div class="w-1/3 text-center">
            <div 
                class="w-8 h-8 mx-auto rounded-full  text-white flex items-center justify-center"
                :class="step===1?'bg-purple-400 animate-bounce':'bg-gray-300'"
            >
                1
            </div>
            <p class="mt-2">Datos Generales</p>
        </div>

        <!-- Paso 2 -->
        <div class="w-1/3 text-center">
            <div 
                class="w-8 h-8 mx-auto rounded-full  text-white flex items-center justify-center"
                :class="step===2?'bg-purple-400 animate-bounce':'bg-gray-300'"
            >
                2
            </div>
            <p class="mt-2">Encargados de la reunión</p>
        </div>
        
        <!-- Paso 3 -->
        <div class="w-1/3 text-center">
            <div 
                class="w-8 h-8 mx-auto rounded-full  text-white flex items-center justify-center"
                :class="step===3?'bg-purple-400 animate-bounce':'bg-gray-300'"
            >
                3
            </div>
            <p class="mt-2">Lista de asistencia</p>
        </div>

        <!-- Paso 4 -->
        <div class="w-1/3 text-center">
            <div 
                class="w-8 h-8 mx-auto rounded-full  text-white flex items-center justify-center"
                :class="step===4?'bg-purple-400 animate-bounce':'bg-gray-300'"
            >
                4
            </div>
            <p class="mt-2">Descripción de la reunión</p>
        </div>
    </div>
</template>

