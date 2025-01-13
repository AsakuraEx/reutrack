<script setup>

    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';

    let minuta = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n"
    minuta = minuta.replace(/\n/g, ' <br> ')
</script>

<template>

    <Header />

    <div class="container mx-auto px-4 mt-16">

        <h1 class="text-2xl font-bold uppercase text-center">Dirección de tecnologías de Información y Comunicación</h1>
        <h2 class="text-xl font-light text-slate-400 text-center">Minuta de Reunión</h2>

        <div class="mt-8">
            <p class="text-2xl text-center font-bold">
                Reunión para la verificación de la implementación de RRI
            </p>
            <p class="text-xl font-light text-center">
                Lugar: <b>Megacentro de Vacunación</b>
            </p>
            <p class="text-xl font-light text-center mb-4">Fecha hora inicio de reunión: <b>08/01/2025 11:30 A.M</b></p>

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
                        <tr class="border-b">
                            <td class="py-2">Francisco Josue Escobar Quintanilla</td>
                        </tr>
    
                        <tr class="border-b">
                            <td class="py-2">Ivan Alessandro Mendoza Landaverde</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-2xl font-bold mt-4">Puntos a tratar</h3>

            <div class="py-4 space-y-4">

                <p>1. Se realizar el principal...</p>
                <p>2. Se accede al...</p>
                <p>3. Se brinda asistencia para realizar...</p>
                <p>4. ESTA TEMBLANDO FUERTISIMO...</p>

            </div>

            <h3 class="text-2xl font-bold">Desarrollo de la reunión</h3>

            <div class="overflow-x-auto">
                <p class="py-4 text-justify" v-html="minuta">
                </p>
            </div>

            <h3 class="text-2xl font-bold">Acuerdos y compromisos</h3>

            <div class="py-4 space-y-4">

                <p>1. Acuerdo: queda como acuerdo realizar...</p>
                <p>2. Acuerdo: queda como acuerdo realizar...</p>
                <p>3. Acuerdo: queda como acuerdo realizar...</p>
                <p>4. Acuerdo: queda como acuerdo realizar...</p>

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
                        <tr class="border-b">
                            <td class="py-2">Francisco Josue Escobar Quintanilla</td>
                            <td class="py-2">05482299-1</td>
                            <td class="py-2">Técnico Informático</td>
                            <td class="py-2">Ministerio de Salud</td>
                            <td class="py-2">7008-6814</td>
                            <td class="py-2">francisco.escobar@salud.gob.sv</td>
                        </tr>
        
                        <tr class="border-b">
                            <td class="py-2">Ivan Alessandro Mendoza Landaverde</td>
                            <td class="py-2">05482299-1</td>
                            <td class="py-2">Técnico Informático</td>
                            <td class="py-2">Ministerio de Salud</td>
                            <td class="py-2">7008-6814</td>
                            <td class="py-2">ivan.mendoza@salud.gob.sv</td>

                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="text-xl font-light text-center lg:text-right mt-8">Fecha hora fin de la reunión: <b>08/01/2025 1:15 P.M</b></p>
        </div>

        <Footer />

    </div>

</template>

