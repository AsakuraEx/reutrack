<template>
    <div class="border p-2 flex flex-col w-full md:w-1/3 gap-4">
        <p class="text-xl font-bold">{{ reunion.nombre }}</p>
        <p class="font-light text-slate-300">Lugar de Reunion: <b>{{ reunion.lugar }}</b></p>
        <span class="font-light italic">Fecha y hora: {{ transformarFecha(reunion.createdAt) }}</span>

        <RouterLink :to="{name:'detalle', params: {id: reunion.id}}" class="border rounded bg-transparent hover:bg-slate-400 px-3 py-1 transition-colors duration-300 text-center">Ver Detalle de Reunión</RouterLink>
    </div>
</template>

<script setup>

    defineProps({
        reunion: {
            type:Object,
            required:true
        }
    })

    const transformarFecha = (fecha) => {
        
        const nuevaFecha = new Date(fecha)

        const fechaFormateada = nuevaFecha.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',   // Hora en formato de dos dígitos
            minute: '2-digit', // Minutos en formato de dos dígitos
            second: '2-digit', // Segundos en formato de dos dígitos
            hour12: true
        });

        return fechaFormateada
    }

</script>