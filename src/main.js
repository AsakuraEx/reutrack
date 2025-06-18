import './assets/main.css'
import App from './App.vue'
import router from './router'

// Pinia
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vee-Validate
import { defineRule } from 'vee-validate'



//Definicion de reglas globales de vee-validate

//Campo requerido
defineRule('required', value => {
    if(!value || !value.length || value === 0 || (Array.isArray(value) && value.length === 0)){
        return 'El campo es requerido'
    }
    return true
})

// Valor minimo numerico
defineRule('min', (value, [min]) => {
    if(value.length < min){
        return `El campo debe poseer un minimo de ${min} caracteres`
    }

    return true
})

//Validacion de formato de dui
defineRule('dui', value => {
    const regexDui = /^[0-9]{8}-[0-9]{1}$/;

    if(!regexDui.test(value)){
        return 'El formato de dui es el siguiente: 00000000-0'
    }
    return true
})

//Validacion de formato de telefono
defineRule('telefono', value => {
    const regexTel = /^[2,6,7]{1}[0-9]{3}-[0-9]{4}$/

    if(!regexTel.test(value)){
        return 'Ingrese un número de telefono valido, el formato es ####-#### y debe iniciar con 2, 6 o 7.'
    }
    return true
})

//Validación de formato de email
defineRule('email', value => {
    
    const regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

    if (!regexEmail.test(value)) {
        return 'Ingrese un correo electrónico válido';
    }

    return true;
})

//Validación que verifica si dos campos son iguales
defineRule('equal', (value, [target], ctx) => {
    if (value === ctx.form[target]){
        return true
    }

    return 'Las contraseñas deben coincidir'
})

//Validación de contraseña
defineRule('password', value => {
    const password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-{}\[\]:;<>,.?/~]).{8,}$/;
    if(!password.test(value)){
        return 'La contraseña debe contener al menos 8 caracteres, mayúsculas, minúsculas, números y caracteres especiales'
    }

    return true
})

//Validación de ingreso de sitio web valido
defineRule('website', value => {
    const website = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/

    if(!website.test(value)){
        return 'Debes ingresar la URL del sitio donde se almacena tu acta de aceptación de prototipo, valida que ingresaste una URL válida'
    }

    return true
})

//Validación de aceptar únicamente campos alfanumericos
defineRule('alfanumeric', value => {
    const alfanumeric = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ,.";: ]+$/

    if(!alfanumeric.test(value)){
        return 'El valor que ha ingresado no es válido, el campo solo acepta letras y espacios.'
    }

    return true
})

const app = createApp(App)

app.use(createPinia())  //Agrega pinia al proyecto
app.use(router)

app.mount('#app')
