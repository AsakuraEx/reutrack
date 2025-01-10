<template>
    <!-- CARD DE REUNION -->
    <div class="border bg-transparent p-3 flex flex-col lg:flex-row gap-4 justify-between items-center rounded">
        <div>
            <p class="text-xl font-bold">{{ titulo }}</p>
            <p class="font-light text-slate-300">Lugar de Reunion: <b>{{ lugar }}</b></p>
            <span class="font-light italic">{{ hora }}</span>
            <div class="bg-blue-500 w-fit px-3 py-1 rounded font-bold">
                {{ estado }}
            </div>
        </div>

        <div class="flex flex-col gap-2 w-full lg:w-fit">
            <RouterLink :to="{name:'detalle'}" class="border rounded bg-transparent hover:bg-sky-400 hover:border-sky-400 px-3 py-1 transition-colors duration-300 text-center">
                Ver Detalle de Reunión
            </RouterLink>
            <button class="bg-transparent hover:border-purple-500 hover:bg-purple-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300">
                <svg-icon type="mdi" :path="path1"></svg-icon>
                Generar PDF
            </button>
            <button class="bg-transparent hover:border-red-500 hover:bg-red-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300">
                <svg-icon type="mdi" :path="path"></svg-icon>
                Eliminar Reunión
            </button>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        titulo: {
            type: String,
            required: true
        },
        lugar: {
            type: String,
            required: true
        },
        fecha: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        }
    })
</script>