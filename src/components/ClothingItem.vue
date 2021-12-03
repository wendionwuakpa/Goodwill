<template>
    <section class="item-container">
        <div class="row"> <h4> {{item.title}} </h4></div>
        <div class="row"> Type: {{item.clothing_type}} </div>
    </section>
</template>

<script>
    export default {
        name: 'ClothingItem',
        props: ['item'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style scoped>



</style>