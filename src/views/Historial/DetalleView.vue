<script setup>

    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';

    //LIBRERIA PARA PDF


    //LIBRERIA DE ICONOS
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiFilePdfBox } from '@mdi/js';
    const path1 = mdiFilePdfBox;


    const reunion = ref({})
    const asistencia = ref([])
    const puntos = ref([])
    const acuerdos = ref([])
    const encargados = ref([])
    const minuta = ref({})
    const usuarioRol = sessionStorage.getItem('rol')

    const store = useReunionStore()
    const route = useRoute()

    const { id } = route.params

    onMounted(async ()=>{
        reunion.value = await store.obtenerReunion(id)
        encargados.value = await store.obtenerEncargados(id)
        puntos.value = await store.obtenerPuntos(id)
        acuerdos.value = await store.obtenerAcuerdos(id)
        asistencia.value = await store.obtenerParticipantes(id)
        minuta.value = await store.obtenerMinuta(id)
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

<template>

    <Header :rol="usuarioRol"/>

    <div class="container mx-auto text-right">
        
        <!-- <button 
            class="bg-transparent hover:border-blue-500 hover:bg-blue-500 focus:scale-95 p-1 rounded inline-flex gap-2 justify-center border text-white transition-colors duration-300"
            @click="generarPDF()"
        >
            <svg-icon type="mdi" :path="path1"></svg-icon>
            Generar PDF
        </button> -->

    </div>
    <div class="container mx-auto px-4 mt-16" id="pdf">

        <h1 class="text-2xl font-bold uppercase text-center">Dirección de tecnologías de Información y Comunicación</h1>
        <h2 class="text-xl font-light text-slate-400 text-center">Minuta de Reunión</h2>

        <div class="mt-8">
            <p class="text-2xl text-center font-bold">
                {{ reunion.nombre }}
            </p>
            <p class="text-xl font-light text-center">
                Lugar: <b>{{ reunion.lugar }}</b>
            </p>
            <p class="text-xl font-light text-center mb-4">Fecha hora inicio de reunión: <b>{{ transformarFecha(reunion.createdAt) }}</b></p>

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
                        <tr class="border-b" v-for="e in encargados">
                            <td class="py-2">{{ e.usuario.nombre }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-2xl font-bold mt-4">Puntos a tratar</h3>

            <div class="py-4 space-y-4">

                <ul class="list-disc">
                    <li  v-for="p in puntos">{{ p.nombre }}</li>
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
                    <li v-for="a in acuerdos">{{ a.nombre }}</li>
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
                        <tr class="border-b" v-for="x in asistencia">
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