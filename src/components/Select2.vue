<template>
    <div 
        class="w-full" 
        :class="label ? 'flex flex-col':''"
    >
        <label v-if="label" class="text-xl">{{label}}</label>
        <select 
            class="select p-2 rounded border border-white bg-transparent w-full focus:outline-purple-400 overflow-y-auto" 
            :required="requerido == true ? 'required':''"
            @change="$emit('update:campo', Number($event.target.value))"
            :value="campo" 
        >
            <option class="text-gray-900" value="0" selected disabled>Seleccione...</option>
            <option v-for="opcion in opciones" class="text-gray-900" :value="opcion.id">{{ opcion.nombre }}</option>
        </select>
    </div>
</template>

<script setup>

    defineProps({
        label: {
            type: String,
            required: false
        },
        opciones: {
            type: Array,
            required: true
        },
        campo: {
            type: Number,
            required: true,
            default: ''
        },
        requerido: {
            type: Boolean,
            required: true
        }
    })

    defineEmits(['update:campo'])

</script>

<style>
  /* Aplica el estilo solo a la lista desplegable del select */
  select {
    max-height: 160px; /* Limita la altura de la lista */
    overflow-y: auto; /* Agrega scroll cuando sea necesario */
  }
</style>