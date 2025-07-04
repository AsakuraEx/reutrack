<script setup>
    import { onMounted, ref } from 'vue';
    import { jwtDecode } from 'jwt-decode';
    import { useRoute } from 'vue-router';
    import { useProyectoStore } from '@/stores/proyectos';
    import { useReunionStore } from '@/stores/reuniones';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';

    const decoded = jwtDecode(localStorage.getItem('token'))
    const route = useRoute()
    const storeProyecto = useProyectoStore()
    const storeReunion = useReunionStore()
    const idProyecto = route.params.id
    const proyecto = ref({})
    const reuniones = ref([])

    onMounted(async () => {

        console.log('ID del proyecto:', idProyecto)
        proyecto.value = await storeProyecto.consultarProyecto(idProyecto)
        const { data } = await storeReunion.obtenerReuniones(null, null, null, idProyecto, null, null, null, null)
        reuniones.value = data.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));

    })

    //Función que transforma la fecha nativa de javascript a un formato especifico
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

    const numeroPar = (index) => index % 2 === 0;

    // Objeto que ayuda a seleccionar la clase de background color de acuerdo al estado
    // En caso que se agreguen mas estados, se debe agregar aqui y la clase de tailwindcss correspondiente
    const estados = {
        Iniciado: 'bg-yellow-500',
        Finalizado: 'bg-blue-500',
        Cancelado: 'bg-red-500'
    }


    //Funcion que retorna la clase de color de acuerdo al estado que se pase por parametro
    const claseEstado = (estado) => {
        return `${estados[estado]}`
    }

</script>

<template>

    <main class="min-h-screen">
        <Header :rol="decoded.id_rol"/>
    
        <div class="container mx-auto p-4">
            
            <div class="flex flex-col gap-4 mb-8 justify-center">
                <h1 class="text-2xl text-purple-500 font-black text-center">Seguimiento del proyecto: {{ proyecto.nombre }}</h1>
                <span class="text-lg font-light text-gray-400 text-center">Fecha de registro de proyecto en reutrack: {{ transformarFecha(proyecto.createdAt) }}</span>
            </div>

            <!-- Punto central -->
            <div class="hidden lg:flex justify-center w-full">
                <div class="w-8 h-8 bg-gray-500 rounded-full border-4 border-white z-10 mx-auto md:mx-0"></div>
            </div>

            <div class="relative">

                <!-- Línea central de la linea cronologica -->
                <div class="absolute left-1/2 top-0 h-full w-1 bg-purple-100 transform -translate-x-1/2 hidden lg:block"></div>
    
                <!-- Items de al linea cronologica -->
                <div
                    v-for="(item, index) in reuniones"
                    :key="index"
                    class="flex flex-col md:flex-row lg:mb-8 items-center w-full"
                >
                    <!-- Lado izquierdo -->
                    <div class="w-full md:w-1/2 md:pr-8 text-right text-white mb-2 md:mb-0 lg:flex lg:justify-end">
                        <div v-if="numeroPar(index)">
    
                            <!-- Card -->
                            <div 
                                class="border-2 pb-4 border-gray-700 shadow-md rounded-md w-full lg:w-[450px] h-48 text-black bg-white"
                            >
                                <!-- Titulo de card -->
                                <h1 
                                    class="text-center text-xl font-bold py-2 text-white"
                                    :class="claseEstado(item.estado.nombre)"
                                >
                                    {{ item.nombre }}
                                </h1>
    
                                <!-- Contenido de card -->
                                <div class="relative flex flex-col items-center gap-2 font-medium justify-center text-center py-2 h-full w-full">
                                    
                                    <p>{{ item.version.nombre }}</p>
                                    <p>{{ item.lugar }}</p>
                                    <p class="lg:hidden">{{ transformarFecha(item.createdAt) }}</p>
                                    <p class="bg-purple-500 rounded-md px-2 py-1 text-white w-fit mx-auto mb-2 text-md">{{ item.user.nombre }}</p>
                                    <br>
                                </div>
                            </div>
    
                        </div>
                        <div v-else>
                            <p class="bg-purple-500 rounded-md px-4 py-2 text-white w-full lg:w-fit mb-2 hidden lg:block">{{ transformarFecha(item.createdAt) }}</p>
                        </div>
                    </div>
    
                    <!-- Punto central -->
                    <div class="w-8 h-8 bg-purple-500 rounded-full border-4 border-white z-10 mx-auto md:mx-0 hidden lg:block"></div>
    
                    <!-- Lado derecho -->
                    <div class="w-full md:w-1/2 md:pl-8 text-left text-white mt-2 md:mt-0">
                        <div v-if="numeroPar(index)">
    
                            <p class="bg-purple-500 rounded-md px-4 py-2 text-white w-full lg:w-fit text-start mb-2 hidden lg:block">{{ transformarFecha(item.createdAt) }}</p>
    
                        </div>
                        <div v-else>
    
                            <!-- Card -->
                            <div 
                                class="border-2 pb-4 border-gray-700 shadow-md rounded-md lg:w-[450px] h-48 text-black bg-white"
                            >
                                <!-- Titulo de card -->
                                <h1 
                                    class=" flex justify-evenly items-center gap-4 text-center text-xl font-bold py-2 text-white"
                                    :class="claseEstado(item.estado.nombre)"
                                >
                                    {{ item.nombre }}
                                    
                                </h1>
    
                                <!-- Contenido de card -->
                                <div class="relative flex flex-col items-center gap-2 font-medium justify-center text-center py-2 h-full">

                                    <p>{{ item.version.nombre }}</p>
                                    <p>{{ item.lugar }}</p>
                                    <p class="lg:hidden">{{ transformarFecha(item.createdAt) }}</p>
                                    <p class="bg-purple-500 rounded-md px-2 py-1 text-white w-fit mx-auto mb-2 text-md">{{ item.user.nombre }}</p>
                                    <br>
                                </div>
                            </div>
    
                        </div>
                    </div>
    
                </div>

                <!-- Punto central -->
                <div class="hidden lg:flex justify-center w-full">
                     <div class="w-8 h-8 bg-gray-500 rounded-full border-4 border-white z-10 mx-auto md:mx-0"></div>
                </div>
    
            </div>

            <div class="flex justify-center items-center mt-8">
                <div class="px-6 py-1 bg-purple-200 text-purple-700">
                    Estado de las reuniones
                </div>
                <div :class="claseEstado('Iniciado')" class="px-3 py-1">
                    Iniciado
                </div>
                <div :class="claseEstado('Finalizado')" class="px-3 py-1">
                    Finalizado
                </div>
                <div :class="claseEstado('Cancelado')" class="px-3 py-1">
                    Cancelado
                </div>
            </div>
    
        </div>

        <Footer />
    </main>
</template>
