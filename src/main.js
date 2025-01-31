import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vee-Validate
import { defineRule } from 'vee-validate'


import App from './App.vue'
import router from './router'


defineRule('required', value => {
    if(!value || !value.length || value === 0 || (Array.isArray(value) && value.length === 0)){
        return 'El campo es requerido'
    }
    return true
})

defineRule('min', (value, [min]) => {
    if(value.length < min){
        return `El campo debe poseer un minimo de ${min} caracteres`
    }

    return true
})

defineRule('dui', value => {
    const regexDui = /^[0-9]{8}-[0-9]{1}$/;

    if(!regexDui.test(value)){
        return 'El formato de dui es el siguiente: 00000000-0'
    }
    return true
})

defineRule('telefono', value => {
    const regexTel = /^[2,6,7]{1}[0-9]{7}$/

    if(!regexTel.test(value)){
        return 'Ingrese un número de telefono valido.'
    }
    return true
})

defineRule('email', value => {
    
    const regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

    if (!regexEmail.test(value)) {
        return 'Ingrese un correo electrónico válido';
    }

    return true;
})


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
