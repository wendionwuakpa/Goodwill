<template>
    <div class="item-container">
        <div class="content">
            <img :src="item.image"/>
            <div class="details">
                <div class="row"> <h4> {{item.title}} </h4></div>
                <div class="row"> Type: {{item.clothing_type}} </div>
                <div class="row"> Type: {{item.brand}} </div>
                <div class="row"> Type: {{item.size}} </div>
                <div class="row"> Type: {{item.condition}} </div>
                <div class="row"> Donated: {{ item.date_uploaded.split("T")[0]}} </div>
                <input class="delete" type="button" value="Delete"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ClothingItem',
        props: ['item'],
        data() {
            return {
            }
        },
        mounted() {
            console.log(this.item);
        },
        methods: {
        }
    }
</script>

<style scoped>

    h4 {
        margin: 0px;

    }

    .delete {
        margin: 0px;
        padding: 5px;
        padding-left: 6px;
        padding-right: 6px;
        height: 28px;
    }

    .item-container {
        width: calc(50% - 5px);
        background: var(--orange);
    }

    .content {
        width: calc(100% - 20px);
        display: flex;
        flex-direction: row;
        padding: 10px;
    }

    .details {
        flex-grow: 1;
        padding: 10px;
        padding-top: 0px;
        padding-bottom: 0px;
        height: 150px;

    }

    img {
        height: 150px;
    }

</style>