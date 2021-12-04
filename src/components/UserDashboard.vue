<template>
    <section class="dashboard">
        <h3 class="header"> Dashboard </h3>
        <span class="dash-container">
            <section class="dash-area add-form">
                <h3> Donate Item </h3>
                <div>
                    <label>Title</label>
                    <input type="text" v-model="title">
                </div> 
                <div>
                    <label for="types">Clothing Type</label>
                    <select class="dropdown" v-model="clothingType">
                        <option v-for="option in typeOptions" v-bind:key="option.value" v-bind:value="option.value">
                            {{ option.text }}
                        </option> 
                    </select>
                </div>
                <div>
                    <label>Brand</label>
                    <input type="text" v-model="brand">
                </div>
                <div>
                    <label for="types">Size</label>
                    <select class="dropdown" v-model="size">
                        <option v-for="option in sizeOptions" v-bind:key="option.value" v-bind:value="option.value">
                            {{ option.text }}
                        </option> 
                    </select>
                </div>
                <div>
                    <label for="types">Condition</label>
                    <select class="dropdown" v-model="condition">
                        <option v-for="option in conditionOptions" v-bind:key="option.value" v-bind:value="option.value">
                            {{ option.text }}
                        </option> 
                    </select>
                </div>
                <div>
                    <label>Image Link</label>
                    <input type="text" v-model="imageLink">
                </div>
                <input :disabled="!formComplete" type="button" value="Upload" v-on:click="uploadHandler"/>
                <p class="form-end"> {{ errorDonate }} </p>
            </section>
            <section class="dash-area list">
                <h3> Clothing Items </h3>
                <div class="toggle-container">
                    <input :class="{active: activeList=='donated'}" type="button" value="All Donated" v-on:click="getDonated"/>
                    <input :class="{active: activeList=='pending'}" type="button" value="Pending" v-on:click="getPending"/>
                    <input :class="{active: activeList=='pickedUp'}" type="button" value="Picked Up" v-on:click="getPickedUp"/>
                </div>
                <section class="item-list scrollbox" v-if="activeList == 'donated'">
                    <ClothingItem 
                        v-for="item in donatedClothingItems"
                        v-bind:key="item._id"
                        v-bind:item="item"
                    />
                </section>
                <section class="item-list scrollbox" v-if="activeList == 'pending'">
                    <ClothingItem 
                        v-for="item in pendingClothingItems"
                        v-bind:key="item"
                        v-bind:item="item"
                    />
                </section>
                <section class="item-list scrollbox" v-if="activeList == 'pickedUp'">
                    <ClothingItem 
                        v-for="item in pickedUpClothingItems"
                        v-bind:key="item"
                        v-bind:item="item"
                    />
                </section>
            </section>
        </span>
    </section>
</template>

<script src="../../public/services.js"></script>
<script>
    import ClothingItem from './ClothingItem.vue';
    export default {
        name: 'UserDashboard',
        components: {ClothingItem},
        props: ['username'],
        data() {
            return {
                activeList: 'donated',
                donatedClothingItems: [],
                pendingClothingItems: [],
                pickedUpClothingItems: [],
                title: '',
                imageLink: '',
                errorDonate: null,
                clothingType: '',
                condition: '',
                size: '',
                typeOptions: [
                    { text: 'Shirt', value: 'Shirt'},
                    { text: 'Sweater', value: 'Sweater'},
                    { text: 'Pants', value: 'Pants'},
                    { text: 'Jacket', value: 'Jacket'},
                    { text: 'Shorts', value: 'Shorts'},
                ],
                sizeOptions: [
                    { text: 'Extra Small', value: 'Extra Small'},
                    { text: 'Small', value: 'Small'},
                    { text: 'Medium', value: 'Medium'},
                    { text: 'Large', value: 'Large'},
                    { text: 'Extra Large', value: 'Extra Large'},
                ],
                conditionOptions: [
                    { text: 'Brand New', value: 'Brand New'},
                    { text: 'Like New', value: 'Like New'},
                    { text: 'Used', value: 'Used'},
                ],
                brand: ''
            }
        },
        computed: {
            formComplete: function() {
                return (
                    this.title != '' && 
                    this.imageLink != '' && 
                    this.clothingType != '' && 
                    this.condition != '' && 
                    this.size != '' && 
                    this.brand != ''
                );
            }
        },
        mounted() {
            this.getDonated();
        },
        methods: {
            getDonated() {
                const fields = {
                    username: this.username
                };
                getUserDonatedClothing(fields, this.donatedSuccess, this.donatedError);
                this.activeList = 'donated';
            },
            getPending() {
                const fields = {
                    username: this.username
                };
                getUserPendingClothing(fields, this.pendingSuccess, this.pendingError);
                this.activeList = 'pending';
            },
            getPickedUp() {
                const fields = {
                    username: this.username
                };
                getUserPickedUpClothing(fields, this.pickedUpSuccess, this.pickedUpError);
                this.activeList = 'pickedUp';
            },
            uploadHandler() {
                const fields = {
                    title: this.title,
                    clothing_type: this.clothingType,
                    size: this.size,
                    brand: this.brand,
                    condition: this.condition,
                    image: this.imageLink,
                    donator: this.username
                }
                donateClothingItem(fields, this.uploadSuccess, this.uploadFailure);
            },
            donatedSuccess(obj) {
                this.donatedClothingItems = obj.data;
            },
            donatedError(obj) {
                console.log(obj);
            },
            pendingSuccess(obj) {
                this.pendingClothingItems = obj.data;
            },
            pendingError(obj) {
                console.log(obj);
            },
            pickedUpSuccess(obj) {
                this.pickedUpClothingItems = obj.data;
            },
            pickedUpError(obj) {
                console.log(obj);
            },
            uploadSuccess(obj) {
                this.getDonated();
                this.getPending();
            },
            uploadFailure(obj) {
                console.log(obj);
            }
        }
    }
</script>

<style scoped>
    label {
        margin-right: 5px;
    }

    input {
        width: 100%;
    }

    input:disabled {
        background-color: lightgray;
        color: gray;
    }

    input:hover:disabled {
        background-color: lightgray;
        color: gray;
    }

    .active {
        background: var(--blue);
    }

    section > div {
        margin-bottom: 10px;
    }

    p {
        margin: 0px;
        color: red;
    }

    .dropdown {
        width: 100%;
        height: 40px;
        padding: 1px;
    }

    .form-end {
        margin-bottom: auto;
    }

    .dash-container {
        width: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: row;
    }

    .dash-area {
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-top: 0px;
    }

    .toggle-container {
        display: flex;
        width: 100%;
    }

    .add-form {
        background: var(--gray);
        width: 30%;
    }

    .list {
        background: white;
        width: 70%;
        color: black;
    }

    .item-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        max-height: calc(100vh - 220px);
        overflow-y: auto;
    }


    h3 {
        text-align: center;
    }

    .header {
        background: var(--orange);
        margin: 0px !important;
        padding: 10px;
    }

    /* OLD */

    .scrollbox {
        visibility: visible;
        flex-grow: 1;
        padding-right: 20px;
        margin: 0px;
        width: calc(100% - 20px);
        overflow-x: hidden;
    }

</style>