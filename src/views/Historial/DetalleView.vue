<script setup>

    import { useRoute } from 'vue-router';
    import { jwtDecode } from 'jwt-decode';
    import { onMounted, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import axios from 'axios';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';

    //LIBRERIA DE ICONOS
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiFilePdfBox } from '@mdi/js';
    const path1 = mdiFilePdfBox;


    const reunionCompleta = ref({})
    const minuta = ref({})
    const pdf = ref('')
    const decoded = jwtDecode(localStorage.getItem('token'))
    const usuarioRol = decoded.id_rol

    const store = useReunionStore()
    const route = useRoute()

    let version
    let proyecto

    //Contiene la URL del backend
    const baseURL = import.meta.env.VITE_BASE_URL

    //Identifica el id de la reunión, se obtiene desde la url
    const { id } = route.params

    onMounted(async ()=>{

        //Se hacen multiples llamadas para recuperar la información de la reunión consultada
        reunionCompleta.value = await store.obtenerDetalleReunion(id)
        minuta.value = await store.obtenerMinuta(id)
        version = reunionCompleta.value.version.nombre
        proyecto = reunionCompleta.value.version.proyecto.nombre

        //Se asigna un valor de URL al pdf
        pdf.value = baseURL + `/reuniones/pdf/${id}`
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


    //redirecciona para descargar el pdf
    const generarPDF = async () => {
        //window.location.replace(pdf.value)
        try {
            const response = await axios.get(baseURL + `/reuniones/pdf/${id}`, {
                'Access-Control-Allow-Origin': baseURL,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                responseType: 'blob', // Permite manejar archivos binarios
            });

            // Crear una URL para el blob
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

            // Crear un enlace para descargar
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${reunionCompleta.value.nombre}.pdf`); // Nombre del archivo
            document.body.appendChild(link);
            link.click();

            // Limpiar recursos
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al descargar el PDF', error);
        }
    }
</script>

<template>


    <Header :rol="usuarioRol"/>

    <div class="container mx-auto text-right">
        
        <!-- botón para generar el pdf -->
        <button 
            class="bg-transparent hover:border-blue-500 hover:bg-blue-500 focus:scale-95 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300"
            @click="generarPDF()"
        >
            <svg-icon type="mdi" :path="path1"></svg-icon>
            Descargar PDF
        </button>

    </div>

    <!-- Minuta de reunión -->
    <div class="container mx-auto px-4 mt-16" id="pdf">

        <h1 class="text-2xl font-bold uppercase text-center">Dirección de tecnologías de Información y Comunicación</h1>
        <h2 class="text-xl font-light text-slate-400 text-center">Minuta de Reunión</h2>

        <p class="text-3xl text-center font-bold mt-8">
            {{ proyecto }} - {{ version }}
        </p>

        <div class="mt-8">
            <p class="text-2xl text-center font-bold">
                {{ reunionCompleta.nombre }}
            </p>
            <p class="text-xl font-light text-center">
                Lugar: <b>{{ reunionCompleta.lugar }}</b>
            </p>
            <p class="text-xl font-light text-center mb-4">Fecha hora inicio de reunión: <b>{{ transformarFecha(reunionCompleta.createdAt) }}</b></p>

            <hr>

            <div class="space-y-4 mb-12">
                <h3 class="text-2xl font-bold mt-4">Encargados de la reunión</h3>
                <table class="w-full text-center">
                    <thead>
                        <tr class="font-bold text-lg border-b-2">
                            <td class="py-2">Encargado</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b" v-for="e in reunionCompleta['encargado de reunion']">
                            <td class="py-2">{{ e.usuario.nombre }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-2xl font-bold mt-4">Puntos a tratar</h3>

            <div class="py-4 space-y-4">

                <ul class="list-disc">
                    <li  v-for="p in reunionCompleta['puntos de reunion']">{{ p.nombre }}</li>
                </ul>

            </div>

            <h3 class="text-2xl font-bold">Desarrollo de la reunión</h3>

            <div class="overflow-x-auto">
                <p class="py-4 text-justify" v-html="minuta.minuta">
                </p>
            </div>

            <h3 class="text-2xl font-bold">Acuerdos y compromisos</h3>

            <div class="py-4 space-y-4">

                <ul class="list-disc">
                    <li v-for="a in reunionCompleta['acuerdos de reunion']">{{ a.nombre }}</li>
                </ul>

            </div>

            <h3 class="text-2xl font-bold">Lista de Asistencia</h3>

            <div class="overflow-x-auto px-4 lg:px-0">
                <table class="w-full mt-8">
                    <thead>
                        <tr class="font-bold text-lg border-b-2">
                            <td class="py-2">Participante</td>
                            <td class="py-2">DUI</td>
                            <td class="py-2">Cargo</td>
                            <td class="py-2">Institución</td>
                            <td class="py-2">Teléfono</td>
                            <td class="py-2">Correo Electrónico</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b" v-for="x in reunionCompleta['asistencia reunion']">
                            <td class="py-2">{{ x.participante }}</td>
                            <td class="py-2">{{ x.doc_identidad }}</td>
                            <td class="py-2">{{ x.cargo }}</td>
                            <td class="py-2">{{ x.institucion }}</td>
                            <td class="py-2">{{ x.telefono }}</td>
                            <td class="py-2">{{ x.correo }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="text-xl font-light text-center lg:text-right mt-8">Fecha hora fin de la reunión: <b>{{ transformarFecha(minuta.updatedAt) }}</b></p>
        </div>

        <Footer />

    </div>

</template>

<style>

    ul {
        list-style-type: disc;
        padding-left: 1.25rem; /* Tailwind: pl-5 */
    }
  
    li {
        margin-bottom: 0.5rem; /* Tailwind: mb-2 */
    }


</style>