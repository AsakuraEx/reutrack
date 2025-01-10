<script setup>

    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Textfield from '@/components/Textfield.vue';

</script>

<template>
    
    <Header />

    <div class="container mx-auto px-4 mt-16 min-h-[75vh]">
        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Nuevo Proyecto</h1>

        <form>

            <div class="space-y-4 mt-8">

                <Textfield 
                    :label="'Nombre del proyecto: *'"
                />

                <Textfield
                    :label="'Version del proyecto: *'"
                />

            </div>

            <div class="flex justify-center gap-4 px-4 mt-8">

                <button class="bg-purple-400 hover:bg-purple-300 w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center">
                    Crear
                </button>

                <RouterLink 
                    :to="{name: 'proyectos'}"
                    class="bg-slate-200 hover:bg-slate-100 text-black w-full md:w-36 py-2 transition-colors duration-150 font-bold rounded text-center"
                >
                    Cancelar
                </RouterLink>

            </div>

        </form>
    </div>

    <Footer />
</template>

