<script setup>

    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';

</script>

<template>
    
    <Header />

    <div class="container mx-auto px-4 mt-16 min-h-[75vh]">
        <h1 class="text-purple-300 font-extrabold text-center text-2xl uppercase">Nuevo Proyecto</h1>

        <form>

            <div class="space-y-4 mt-8">
                <div class="flex flex-col gap-4 items-center px-4">
                    <label class="text-xl px-4 md:text-left text-center">
                        Nombre del proyecto:
                    </label>
                    <input 
                        type="text" 
                        name="nombreReunion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    >
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label class="text-xl px-4 md:text-left text-center">
                        Version o sprint del proyecto:
                    </label>
                    <input 
                        type="text" 
                        name="lugarReunion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                    >
                </div>
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

