<template>
    <div class="flex flex-col gap-4 items-center px-4">
        <label class="text-xl px-4 md:text-left text-center">
            {{ label }}
        </label>
        <input 
            :type="tipo" 
            name="nombreReunion"
            class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
            :required="requerido"
            @input="$emit('update:campo', $event.target.value)"
            :pattern="pattern"
            :value="campo"
            :placeholder="mascara"
        >
    </div>
</template>

<script setup>

    defineProps({
        label: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        requerido: {
            type: Boolean,
            required: false
        },
        pattern: {
            type: String,
            required: false
        },
        campo: {
            type: String,
            required: false,
            default: '',
        },
        mascara: {
            type: String,
            required: false
        }
    })

    const emit = defineEmits(['update:campo'])

</script>