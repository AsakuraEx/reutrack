<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100 px-6 md:px-0">

        <div class="max-w-[420px] min-w-32 mx-auto bg-white border shadow-md py-8 px-4 space-y-4">

            <div>
                <h1 class="font-black text-center text-3xl text-black">REUTRACK</h1>
                <h2 class="text-gray-600 font-light text-center">Control y Gestión de Reuniones y Asistencia</h2>
            </div>

            <div class="w-full">
                <AlertaError 
                    :error="error"
                    v-if="error"
                />
            </div>

            <form class="space-y-4 text-center" @submit.prevent="iniciarSesion()">
                <input 
                    type="text" 
                    class="bg-white border rounded-sm w-full p-2 text-black focus:outline focus:outline-purple-600"
                    :class="errorCorreo ? 'outline-red-300 outline':''"
                    @focus="errorCorreo = false"
                    placeholder="Correo Electronico"
                    v-model="login.correo"
                >
                <p v-if="errorCorreo" class="text-red-700">El correo es obligatorio</p>
                <input 
                    type="password" 
                    class="bg-white border rounded-sm w-full p-2 text-black focus:outline focus:outline-purple-600"
                    placeholder="Contraseña"
                    :class="errorContra ? 'outline-red-300 outline':''"
                    @focus="errorContra = false"
                    v-model="login.contraseña"
                >
                <p v-if="errorContra" class="text-red-700">La contraseña es obligatoria</p>
                <button 
                    class="bg-purple-500 border w-full lg:max-w-72 py-2 rounded-md hover:bg-purple-600 focus:scale-95 transition-all duration-300"
                    type="submit"
                >
                    Iniciar Sesión
                </button>
            </form>

            <hr>

            <form class="space-y-4" @submit.prevent="registrarAsistencia()">
                <p class="text-gray-600 text-center">¿Desea registrar su asistencia en una reunión activa?</p>

                <div class="flex justify-center">
                    <div class="text-black uppercase font-bold border-2 text-center bg-gray-50 rounded-l-md py-3 px-4 w-1/3">
                        Reunion
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

    </div>
</template>

<script setup>
    
    import { reactive, ref } from 'vue';
    import { useUsuarioStore } from '@/stores/usuarios';
    import AlertaError from '@/components/AlertaError.vue';
    import { uid } from 'uid';
    import { useRouter } from 'vue-router';
    import { useReunionStore } from '@/stores/reuniones';

    const store = useUsuarioStore()
    const storeReu = useReunionStore()
    const router = useRouter()
    
    const usuario = ref([])
    const error = ref("")
    const token = ref("")
    const errorCorreo = ref(false)
    const errorContra = ref(false)
    const codigo = ref("")
    const reu = ref([])

    const login = reactive({
        correo: '',
        contraseña: ''
    })

    const iniciarSesion = async () => {

        if(!login.correo){
            errorCorreo.value = true
            return
        }

        if(!login.contraseña){
            errorContra.value = true
            return
        }

        usuario.value = await store.iniciarSesion(login.correo)

        if(usuario.value.length === 0){
            error.value = "No existe un correo asociado a un usuario del sistema."

            setTimeout(()=>{
                error.value = ""
            },3000)

            return
        }

        if(login.contraseña != usuario.value[0].contraseña){
            error.value = "Las contraseña es incorrecta, valide la información ingresada."

            setTimeout(()=>{
                error.value = ""
            },3000)

            return
        }

        if(usuario.value[0].estado === 'inactivo'){
            error.value = "El usuario al que intenta acceder está deshabilitado."

            setTimeout(()=>{
                error.value = ""
            },3000)

            return
        }

        token.value = uid(16)
        sessionStorage.setItem('token', token.value)
        sessionStorage.setItem('usuario', usuario.value[0].nombre)
        sessionStorage.setItem('rol', usuario.value[0].rol)
        sessionStorage.setItem('id', usuario.value[0].id)

        if(login.contraseña.length <= 4){
            router.push({name:'contraseña'})
        }else{
            router.push({name:'home'})
        }
    }

    const registrarAsistencia = async () => {
        reu.value = await storeReu.obtenerReuniones(null,null,codigo.value)

        if(reu.value.length === 0){
            error.value = "No existe la reunión, validar el código"
            setTimeout(()=>{
                error.value = ""
            },3000)
            return
        }

        const fechaActual = new Date().toLocaleString()

        if(reu.value[0].expiracion < fechaActual){
            error.value = "El código de la reunión a expirado"
            setTimeout(()=>{
                error.value = ""
            },3000)
            return
        }

        router.push({name:'invitado',params:{id: reu.value[0].id} })
    }

</script>