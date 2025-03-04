<template>
    <!-- CARD DE REUNION MOSTRADA EN EL HISTORIAL DE REUNIONES -->
    <div class="border bg-transparent p-3 flex flex-col lg:flex-row gap-4 justify-between items-center rounded">
        <div class="w-[340px] lg:w-fit">

            <!-- SE MUESTRA LA INFORMACIÓN DE LA REUNIÓN MEDIANTE PROPS -->
            <p class="text-xl font-bold">{{ titulo }}</p>
            <p class="font-light text-slate-300">Lugar de Reunion: <b>{{ lugar }}</b></p>
            <span class="font-light italic">{{ transformarFecha(fecha) }}</span>
            <div 
                class="w-fit px-3 py-1 rounded font-bold"
                :class="claseEstado(estado.nombre)"
            >
                {{ estado.nombre }}
            </div>
        </div>

        <!-- BOTONES DE ACCIÓN DE ACUERDO AL ESTADO DE LA REUNIÓN -->
        <div class="flex flex-col gap-2 w-full lg:w-fit">
            <RouterLink 
                :to="{name:'detalle', params:{id: props.id}}" 
                class="border rounded bg-transparent hover:bg-sky-400 hover:border-sky-400 inline-flex gap-2  px-3 py-1 transition-colors duration-300 text-center"
                v-if="estado.nombre=== 'Finalizado'"
            >
                <svg-icon type="mdi" :path="path2"></svg-icon>
                Detalle de Reunión
            </RouterLink>

            <RouterLink 
                class="bg-transparent hover:border-yellow-500 hover:bg-yellow-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300"
                v-if="estado.nombre=== 'Iniciado'"
                :to="{name:'encargados', params:{id: props.id}}"
            >
                <svg-icon type="mdi" :path="path1"></svg-icon>
                Continuar Reunión
            </RouterLink>

            <button
                onclick="modal.showModal()"
                class="bg-transparent hover:border-red-500 hover:bg-red-500 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300"
                v-if="estado.nombre=== 'Iniciado' " 
                @click="$emit('modal-mostrado')"   
            >
                <svg-icon type="mdi" :path="path"></svg-icon>
                Cancelar Reunión
            </button>
        </div>
    </div>

</template>

<script setup>

    // Imports de librería de iconos
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiTrashCanOutline, mdiCircleEditOutline, mdiEyeOutline } from '@mdi/js';

    // Variables de iconos
    const path = mdiTrashCanOutline;
    const path1 = mdiCircleEditOutline;
    const path2 = mdiEyeOutline;

    // Props recibidos por el componente padre
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
            type: Object,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    })

    // Objeto que ayuda a seleccionar la clase de background color de acuerdo al estado
    // En caso que se agreguen mas estados, se debe agregar aqui y la clase de tailwindcss correspondiente
    const estados = {
        Iniciado: 'bg-yellow-500',
        Finalizado: 'bg-blue-500',
        Cancelado: 'bg-red-500'
    }

    // Eventos que se pasan a traves del componente padre
    defineEmits(['modal-mostrado'])

    //Funcion que retorna la clase de color de acuerdo al estado que se pase por parametro
    const claseEstado = (estado) => {
        return `${estados[estado]}`
    }

    //Función que ayuda a transformar cualquier fecha a formato dd-mm-yyyy hh:mm tt
    const transformarFecha = (fecha) => {
        
        const nuevaFecha = new Date(fecha)

        const fechaFormateada = nuevaFecha.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',   // Hora en formato de dos dígitos
            minute: '2-digit', // Minutos en formato de dos dígitos
            second: '2-digit', // Segundos en formato de dos dígitos
            hour12: true        // Asegura que se muestre a.m o p.m
        });

        return fechaFormateada
    }

</script>