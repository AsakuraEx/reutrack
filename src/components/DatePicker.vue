<template>
    <div class="flex flex-col w-full">
        <label class="text-xl">{{ label }}</label>
        <input type="date" class="bg-transparent border p-1 rounded w-full">
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