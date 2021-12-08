<template>
    <div class="item-container">
        <div class="content">
            <img :src="item.image"/>
            <div class="details">
                <div class="row"> <h4> {{item.title}} </h4></div>
                <div class="row"> Type: {{item.clothing_type}} </div>
                <div class="row"> Brand: {{item.brand}} </div>
                <div class="row"> Size: {{item.size}} </div>
                <div class="row"> Condition: {{item.condition}} </div>
                <div class="row"> Pickup Address: {{item.address}} </div>
                <div class="row"> Donated: {{ item.date_uploaded.split("T")[0]}} </div>
                <div class="row"> Picked Up: {{ item.picked_up }} </div>
                <div v-if="isAdmin==true" class="row"> Donator: {{ item.donator }} </div>
                <input v-if="isAdmin==false && !item.picked_up" class="delete" type="button" value="Delete" v-on:click="deleteHandler">
                <input v-if="isAdmin==true && activeList == 'pending'" class="delete" type="button" value="Picked Up" v-on:click="pickUpHandler"/>
            </div>
        </div>
    </div>
</template>

<script src="../../public/services.js"></script>
<script>
    export default {
        name: 'ClothingItem',
        props: ['item', 'isAdmin', 'activeList'],
        data() {
            return {
            }
        },
        mounted() {
            console.log(this.item);
        },
        methods: {
            deleteHandler() {
                console.log('delete handler');
                const fields = {
                    id: this.item._id
                };
                deleteClothingItem(fields, this.deleteSuccess, this.deleteError);
            },
            deleteSuccess(obj) {
                this.$emit('delete');
            },
            deleteError(obj) {
                console.log(obj);
            },

            pickUpHandler() {
                console.log('pick up handler');
                const fields = {
                    id: this.item._id //specific clothing 
                };
                pickUpUserClothing(fields, this.pickSuccess, this.pickError);
            },
            pickSuccess(obj) {
                this.$emit('pickUp');
            },
            pickError(obj) {
                console.log(obj);
            }
            
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