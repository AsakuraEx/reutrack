<script setup>
    import BtnSubmit from '@/components/BtnSubmit.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, ref, watch } from 'vue';
    import { useReunionStore } from '@/stores/reuniones';
    import { Field, ErrorMessage, Form } from 'vee-validate';
    import AlertaError from '@/components/AlertaError.vue';

    //Variables del sistema
    const route = useRoute()
    const {id} = route.params;     //Se obtiene el id de la reunion actual
    const idReunion = id;
    const store = useReunionStore()
    const router = useRouter()
    const reunion = ref({})

    //Variable que representa el formulario
    const formData = ref({
        participante: '',
        institucion: '',
        cargo: '',
        doc_identidad: '',
        telefono: '',
        correo: '',
        id_reunion: idReunion,
    })

    //Variable que representa la lista de participantes
    const participantes = ref([]);
    
    const extranjero = ref(false);
    const error = ref('')

    //Pull de funciones que se cargan al montar el componente
    onMounted(async ()=>{
        reunion.value = await store.obtenerReunion(idReunion)
        participantes.value = await store.obtenerParticipantes(idReunion)
    })

    watch(formData, ()=>{
        if (formData.value.doc_identidad.length === 8 && !formData.value.doc_identidad.includes('-')) {
            formData.value.doc_identidad += '-';
        }

        if (formData.value.telefono.length === 4 && !formData.value.telefono.includes('-')) {
            formData.value.telefono += '-';
        }
    }, {deep:true})

    // Variables con diferentes funcionalidades del sistema
    const agregarParticipante = async (values, { resetForm }) => {
        
        if(participantes.value.find(participante => participante.doc_identidad === formData.value.doc_identidad) && !extranjero){
            error.value = 'El participante ya fue agregado segun documento de identidad...'
            setTimeout(()=>{
                error.value = ''
            }, 3000)
            return
        }

        if(participantes.value.find(participante => participante.telefono === formData.value.telefono) && !extranjero){
            error.value = 'El participante ya fue agregado segun número de teléfono...'
            setTimeout(()=>{
                error.value = ''
            }, 3000)
            return
        }
        
        if(participantes.value.find(participante => participante.correo === formData.value.correo)){
            error.value = 'El participante ya fue agregado segun correo electrónico...'
            setTimeout(()=>{
                error.value = ''
            }, 3000)
            return
        }

        try{
            await store.agregarParticipante(formData.value)
            participantes.value = await store.obtenerParticipantes(idReunion)
            
            
            resetForm();
            Object.assign(formData.value, {
                participante: '',
                institucion: '',
                cargo: '',
                doc_identidad: '',
                telefono: '',
                correo: '',
                id_reunion: idReunion,
                
            })

            router.push({name: 'agradecimiento'})
        }catch(e){
            console.error('Error al agregar participante: ', error.message)
        }
        

    }

</script>

<template>
    
    

    <h1 class="text-3xl font-extrabold text-center py-12 text-purple-300">Registro de Reunión</h1>
    
    <div class="container mx-auto min-h-screen">

        <h1 class="text-xl font-extrabold text-center pt-12 uppercase px-4">Lista de Asistencia</h1>
        
        <AlertaError class="mt-8" :error="error" v-if="error"/>
        
        <div class="flex justify-center lg:justify-between pt-4 pb-12">
            <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text text-white px-4">Extranjero</span>
                  <input type="checkbox" checked="checked" class="checkbox checkbox-primary" v-model="extranjero"/>
                </label>
              </div>
        </div>

        
        <Form class="flex flex-col gap-8 md:gap-0 pb-4" @submit="agregarParticipante" v-slot="{ resetForm, errors }">

            <div 
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                :class="extranjero ? 'lg:grid-cols-2':'lg:grid-cols-3'"
            >

                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="participante" class="text-xl px-4 md:text-left text-center">
                        Nombre de participante *:
                    </label>
                    <Field
                        type="text" 
                        name="participante"
                        maxLength="50"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.participante ? 'ring ring-red-500': ''"
                        v-model="formData.participante"
                        rules="required|alfanumeric"
                    />
                    <ErrorMessage name="participante" class="text-red-500 text-sm" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="institucion" class="text-xl px-4 md:text-left text-center">
                        Institución o Dependencia *:
                    </label>
                    <Field
                        type="text" 
                        name="institucion"
                        maxLength="50"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.institucion ? 'ring ring-red-500': ''"
                        v-model="formData.institucion"
                        rules="required"
                    />
                    <ErrorMessage name="institucion" class="text-red-500 text-sm" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="cargo" class="text-xl px-4 md:text-left text-center">
                        Cargo *:
                    </label>
                    <Field
                        type="text" 
                        name="cargo"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.cargo ? 'ring ring-red-500': ''"
                        v-model="formData.cargo"
                        maxLength="50"
                        rules="required"
                    />
                    <ErrorMessage name="cargo" class="text-red-500 text-sm" />
                </div>
    
                <div class="flex flex-col gap-4 items-center px-4" v-if="!extranjero">
                    <label for="doc_identidad" class="text-xl px-4 md:text-left text-center">
                        DUI *:
                    </label>
                    <Field
                        type="text" 
                        name="doc_identidad"
                        placeholder="00000000-0"
                        maxLength="10"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.doc_identidad ? 'ring ring-red-500': ''"
                        v-model="formData.doc_identidad"
                        rules="required|dui"
                    />
                    <ErrorMessage name="doc_identidad" class="text-red-500 text-sm" />
                </div>
                
                <div class="flex flex-col gap-4 items-center px-4" v-if="!extranjero">
                    <label for="telefono" class="text-xl px-4 md:text-left text-center">
                        Teléfono *:
                    </label>
                    <Field
                        type="text" 
                        name="telefono"
                        placeholder="0000-0000"
                        maxLength="9"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.telefono ? 'ring ring-red-500': ''"
                        v-model="formData.telefono"
                        rules="required|telefono"
                    />
                    <ErrorMessage name="telefono" class="text-red-500 text-sm" />
                </div>
                    
                <div class="flex flex-col gap-4 items-center px-4">
                    <label for="correo" class="text-xl px-4 md:text-left text-center">
                        Correo Electrónico *:
                    </label>
                    <Field
                        type="text" 
                        name="correo"
                        class="p-2 text-center rounded border bg-transparent w-full focus:outline-purple-400"
                        :class="errors.correo ? 'ring ring-red-500': ''"
                        v-model="formData.correo"
                        rules="required|email"
                    />
                    <ErrorMessage name="correo" class="text-red-500 text-sm" />
                </div>

            </div>

            
            <div class="mx-auto mt-6 w-full lg:w-32">
                <BtnSubmit />
            </div>
            
        </Form>
        
        
    </div>


</template>