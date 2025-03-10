<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100 px-6 md:px-0">

        <div class="max-w-[420px] min-w-32 mx-auto bg-white border shadow-md py-8 px-4 space-y-4">

            <div>
                <img src="/images/Logo-reutrack-fondo-blanco.svg" alt="">
                <h2 class="text-gray-600 font-light text-center">Control y gestión de reuniones y asistencia</h2>
            </div>

            <div class="w-full">
                <AlertaError 
                    :error="error"
                    v-if="error"
                />

                <AlertWarning
                    :error="store.errorInactividad"
                    v-if="store.errorInactividad"
                />
            </div>

            <div class="space-y-4" v-if="!exitoLogin">
                <Form class="space-y-4 text-center" @submit="iniciarSesion" v-slot="{ errors, resetForm }">
                    <Field 
                        type="text" 
                        name="correo"
                        class="bg-white border rounded-sm w-full w-max-[400px] p-2 text-black focus:outline focus:outline-purple-600"
                        placeholder="Correo Electrónico"
                        v-model="login.correo"
                    />
    
                    <!-- ingreso de contraseña -->
                    <div class="relative">
                        <Field 
                            :type="passwordVisible ? 'text':'password'" 
                            name="contraseña"
                            class="bg-white border rounded-sm w-full w-max-[400px] p-2 text-black focus:outline focus:outline-purple-600"
                            placeholder="Contraseña"
                            v-model="login.contraseña"
                        />
                        <button type="button" class="absolute right-2 top-2.5" @click="passwordVisible=true" v-if="passwordVisible==false">
                            <svg-icon type="mdi" class="text-gray-700 hover:text-gray-500" :path="path"></svg-icon>
                        </button>
                        <button type="button" class="absolute right-2 top-2.5" @click="passwordVisible=false" v-if="passwordVisible==true">
                            <svg-icon type="mdi" class="text-gray-700 hover:text-gray-500" :path="path2"></svg-icon>
                        </button>
                    </div>
    
                    <button 
                        class="bg-purple-500 border w-full lg:max-w-72 py-2 rounded-md hover:bg-purple-600 transition-all duration-300"
                        type="submit"
                    >
                        <Spinner v-if="spinnerActivo" />
                        <p v-if="!spinnerActivo">
                            Iniciar sesión
                        </p>
                    </button>
                </Form>
    
                <hr>

                <form class="space-y-4" @submit.prevent="registrarAsistencia()">
                    <p class="text-gray-600 text-center">¿Desea registrar su asistencia en una reunión activa?</p>
    
                    <div class="flex justify-center">
                        <div class="text-black uppercase font-bold border-2 text-center bg-gray-50 rounded-l-md py-3 px-4 w-1/3">
                            Reunión
                        </div>
                        <input type="text" class="bg-gray-100 border rounded-r-md text-black text-center w-2/3" v-model="codigo">
                    </div>
                    <div class="text-center">
                        <button 
                            class=" border w-full lg:max-w-72 py-2 rounded-md focus:scale-95 transition-all duration-300"
                            :class="codigo ? 'bg-gray-500 hover:bg-gray-600':'bg-gray-300'"
                            type="submit"
                            :disabled="!codigo"
                        >
                            Registrar mi asistencia
                        </button>
                    </div>
                </form>
            </div>
            
            <Form class="space-y-4 text-center" @submit="validarInicio()" v-if="exitoLogin">

                <div role="alert" class="alert bg-purple-100 border-0 text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="h-6 w-6 shrink-0 stroke-current">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ exitoLogin }}</span>
                </div>

                <Field 
                    type="text" 
                    name="dfa"
                    class="bg-white text-center border rounded-sm w-full w-max-[400px] p-2 text-black focus:outline focus:outline-purple-600"
                    placeholder="Código 2FA"
                    v-model="dfa.codigo"
                />

                <div>
                    <button 
                        class="bg-purple-500 border w-full lg:max-w-72 py-2 rounded-md hover:bg-purple-600 transition-all duration-300"
                        type="submit"
                    >
                        <Spinner v-if="spinnerActivo" />
                        <p v-if="!spinnerActivo">
                            Ingresar código
                        </p>
                    </button>
                    <button 
                        class="bg-gray-500 hover:bg-gray-600 border w-full lg:max-w-72 py-2 rounded-md focus:scale-95 transition-all duration-300"
                        type="button"
                        @click="exitoLogin=''"
                    >
                        Cancelar
                    </button>
                </div>

            </Form>


        </div>

    </div>
</template>

<script setup>
    
    import { reactive, ref } from 'vue';
    import { useUsuarioStore } from '@/stores/usuarios';
    import AlertaError from '@/components/AlertaError.vue';
    import AlertWarning from '@/components/AlertWarning.vue';
    import { useRouter } from 'vue-router';
    import { useReunionStore } from '@/stores/reuniones';
    import Spinner from '@/components/Spinner.vue';


    //VEE VALIDATE
    import { Form, Field } from 'vee-validate';

    //ICONOGRAFIA
    import svgIcon from '@jamescoyle/vue-icon';
    import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

    
    const path= mdiEyeOutline
    const path2 = mdiEyeOffOutline
    const passwordVisible = ref(false)

    const spinnerActivo = ref(false)

    const store = useUsuarioStore()
    const storeReu = useReunionStore()
    const router = useRouter()
    
    const error = ref("")
    const exitoLogin = ref("")
    const codigo = ref("")
    const reu = ref([])

    const login = reactive({
        correo: '',
        contraseña: ''
    })

    const dfa = reactive({
        correo: '',
        password: '',
        codigo: ''

    })

    const iniciarSesion = async (values, {resetForm}) => {

        spinnerActivo.value = true

        try {
            if(!login.correo){
                error.value = 'No ha ingresado un correo electrónico'
                setTimeout(()=>{
                    error.value = ""
                },3000)

                return
            }

            if(!login.contraseña){
                error.value = 'No ha ingresado una contraseña'
                setTimeout(()=>{
                    error.value = ""
                },3000)

                return
            }

            const { status, data } = await store.iniciarSesion(login.correo, login.contraseña)

            if(status === 200){

                if(data.exito){
                    exitoLogin.value = data.exito
                    dfa.password = login.contraseña
                    dfa.correo = login.correo
    
                }
    
                if(data.error){
                    error.value = data.error
                }

            }

        }catch(e){
            error.value = "Error de red"

        } finally {
            spinnerActivo.value = false

            resetForm()
            Object.assign(login, {
                correo: '',
                contraseña: ''
            })

            setTimeout(()=>{
                error.value = ""
            },3000)
        }
    }

    const validarInicio = async () => {

        spinnerActivo.value = true

        try {
            if(!dfa.codigo){
                error.value = 'No ha ingresado el código de autorización'
                setTimeout(()=>{
                    error.value = ""
                },3000)

                return
            }

            const { token } = await store.verify2FA(dfa.correo, dfa.codigo)

            if(token){

                localStorage.setItem('token', token)
                if(dfa.password.length <= 4){
                    router.push({name:'contraseña'})
                }else{
                    router.push({name:'home'})
                }


            } else {
                error.value = "El código 2FA ya fue utilizado o ha expirado"
                setTimeout(()=>{
                    error.value = ""
                }, 3000)

            }

        }catch(e){
            
            error.value = 'El código ingresado ya fue utilizado o no es válido.'
            setTimeout(()=>{
                error.value = ""
            }, 2000)
            

        } finally {
            spinnerActivo.value = false

            Object.assign(dfa, {
                codigo: ''
            })
        }
        }

    const registrarAsistencia = async () => {
        
        try{

            const response = await storeReu.obtenerReunionActual(codigo.value)

            if(response.data.error){
                error.value = response.data.error
                setTimeout(()=>{
                    error.value = ""
                },3000)
                return
            }

            reu.value = response.data
        
            const fechaActual = new Date().getTime() / 1000             //Fecha convertida a segundos
            const expiracion =  new Date(reu.value.expiracion).getTime() / 1000         //Fecha convertida a segundos

            if(fechaActual > expiracion){
                error.value = "El código de la reunión ha caducado."
                setTimeout(()=>{
                    error.value = ""
                },3000)
                return
            }
    
           router.push({name:'invitado',params:{id: reu.value.id} })

        } catch(e){
            console.log(e)
        }

    }

</script>