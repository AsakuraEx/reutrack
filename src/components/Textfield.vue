<template>
    <div class="flex flex-col gap-4 items-center px-4">
        <label class="text-xl px-4 md:text-left text-center">
            {{ label }}
        </label>
        <input 
            type="text" 
            name="nombreReunion"
            class="p-2 rounded border bg-transparent w-full focus:outline-purple-400"
            :required="requerido ? 'required':''"
            @input="$emit('update:campo', $event.target.value)"
            
        >
    </div>
</template>

<script setup>

    defineProps({
        label: {
            type: String,
            required: true
        },
        requerido: {
            type: Boolean,
            required: false
        }
    })

    const emit = defineEmits(['update:campo'])

</script>