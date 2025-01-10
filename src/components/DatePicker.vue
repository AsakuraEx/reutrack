<template>
    <div class="flex flex-col w-full">
        <label class="text-xl">{{ label }}</label>
        <input type="date" class="p-1.5 rounded border bg-transparent w-full focus:outline-purple-400">
    </div>
</template>

<script setup>

    defineProps({
        label: {
            type: String,
            required: true
        }
    })

</script>