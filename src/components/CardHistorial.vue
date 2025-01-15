<template>
    <!-- CARD DE REUNION -->
    <div class="border bg-transparent p-3 flex flex-col lg:flex-row gap-4 justify-between items-center rounded">
        <div>
            <p>{{ id }}</p>
            <p class="text-xl font-bold">{{ titulo }}</p>
            <p class="font-light text-slate-300">Lugar de Reunion: <b>{{ lugar }}</b></p>
            <span class="font-light italic">{{ fecha }}</span>
            <div 
                class="w-fit px-3 py-1 rounded font-bold"
                :class="claseEstado(estado)"
            >
                {{ estado }}
            </div>
        </div>

        <div class="flex flex-col gap-2 w-full lg:w-fit">
            <RouterLink 
                :to="{name:'detalle', params:{id: props.id}}" 
                class="border rounded bg-transparent hover:bg-sky-400 hover:border-sky-400 inline-flex gap-2  px-3 py-1 transition-colors duration-300 text-center"
                v-if="estado === 'Finalizado'"
            >
                <svg-icon type="mdi" :path="path2"></svg-icon>
                Detalle de Reunión
            </RouterLink>
            <button 
                class="bg-transparent hover:border-purple-500 hover:bg-purple-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300"
                v-if="estado === 'Finalizado'"
            >
                <svg-icon type="mdi" :path="path1"></svg-icon>
                Generar PDF
            </button>
            <button
                onclick="modal.showModal()"
                class="bg-transparent hover:border-red-500 hover:bg-red-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300"
                v-if="estado === 'Iniciado' " 
                @click="$emit('modal-mostrado')"   
            >
                <svg-icon type="mdi" :path="path"></svg-icon>
                Cancelar Reunión
            </button>
        </div>
    </div>

</template>

<script setup>

    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline, mdiFilePdfBox, mdiEyeOutline } from '@mdi/js';

    const path = mdiTrashCanOutline;
    const path1 = mdiFilePdfBox;
    const path2 = mdiEyeOutline;

    const props = defineProps({
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
        },
        id: {
            type: String,
            required: true
        }
    })

    const estados = {
        Iniciado: 'bg-yellow-500',
        Finalizado: 'bg-blue-500',
        Cancelado: 'bg-red-500'
    }

    const claseEstado = (estado) => {
        return `${estados[estado]}`
    }

    defineEmits(['modal-mostrado'])


</script>