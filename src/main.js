import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vee-Validate
import { defineRule } from 'vee-validate'


import App from './App.vue'
import router from './router'


defineRule('required', value => {
    if(value === 0 || (Array.isArray(value) && value.length === 0)){
        console.log(value)
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


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
