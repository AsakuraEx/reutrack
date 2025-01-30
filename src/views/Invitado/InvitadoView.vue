<template>
    <div class="min-h-screen py-12">
        <h1 class="text-xl font-extrabold text-center py-12 uppercase px-4">Lista de Asistencia</h1>  
        
        <Form class="flex flex-col gap-8 md:gap-0" @submit="agregarParticipante">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="participante" class="text-xl px-4 md:text-left text-center">
                        Nombre de participante *:
                    </label>
                    <Field
                        type="text" 
                        name="participante"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.participante"
                        mode="aggressive"
                        rules="required"
                    />
                    <ErrorMessage name="participante" class="text-red-500" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="institucion" class="text-xl px-4 md:text-left text-center">
                        Institución o Dependencia *:
                    </label>
                    <Field
                        type="text" 
                        name="institucion"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.institucion"
                        mode="aggressive"
                        rules="required"
                    />
                    <ErrorMessage name="institucion" class="text-red-500" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="cargo" class="text-xl px-4 md:text-left text-center">
                        Cargo *:
                    </label>
                    <Field
                        type="text" 
                        name="cargo"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.cargo"
                        mode="aggressive"
                        rules="required"
                    />
                    <ErrorMessage name="cargo" class="text-red-500" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="doc_identidad" class="text-xl px-4 md:text-left text-center">
                        DUI *:
                    </label>
                    <Field
                        type="text" 
                        name="doc_identidad"
                        placeholder="########-#"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.doc_identidad"
                        mode="aggressive"
                        rules="required|dui"
                    />
                    <ErrorMessage name="doc_identidad" class="text-red-500" />
                </div>
                
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="telefono" class="text-xl px-4 md:text-left text-center">
                        Teléfono *:
                    </label>
                    <Field
                        type="text" 
                        name="telefono"
                        placeholder="########"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.telefono"
                        mode="aggressive"
                        rules="required|telefono"
                    />
                    <ErrorMessage name="telefono" class="text-red-500" />
                </div>
                    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="correo" class="text-xl px-4 md:text-left text-center">
                        Correo Electrónico *:
                    </label>
                    <Field
                        type="text" 
                        name="correo"
                        class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
                        v-model="formData.correo"
                        mode="aggressive"
                        rules="required|email"
                    />
                    <ErrorMessage name="correo" class="text-red-500" />
                </div>

            </div>
            <div class="mx-auto mt-6 w-full lg:w-32">
                <BtnSubmit />
            </div>

        </Form>
    </div>
</template>

<script setup>
    import { useReunionStore } from '@/stores/reuniones';
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import BtnSubmit from '@/components/BtnSubmit.vue';

    const route = useRoute()
    const router = useRouter()
    const {id} = route.params     //Se obtiene el id de la reunion actual
    const idReunion = id
    const store = useReunionStore()
    const formData = ref({
            participante: '',
            institucion: '',
            cargo: '',
            dui: '',
            telefono: '',
            correo: '',
            id_reunion: idReunion,
        })

    const agregarParticipante = async () => {
        
        await store.agregarParticipante(formData.value)
        router.push({name: 'agradecimiento'})

    }
</script>
