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
                    <label>Clothing Type</label>
                    <input type="text" v-model="clothingType">
                </div>
                <div>
                    <label>Image Link</label>
                    <input type="text" v-model="imageLink">
                </div>
                <input type="button" value="Upload" v-on:click="uploadHandler"/>
                <p class="form-end"> {{ errorDonate }} </p>
            </section>
            <section class="dash-area list">
                <h3> Clothing Items </h3>
                <div class="toggle-container">
                    <input type="button" value="Available" v-on:click="getUnclaimed"/>
                    <input type="button" value="Donated"/>
                    <input type="button" value="Claimed"/>
                </div>
                <li v-if="activeList == 'unclaimed'">
                    <ClothingItem 
                        v-for="item in unclaimedClothingItems"
                        v-bind:key="item"
                        v-bind:item="item"
                    />
                </li>
                <li v-if="activeList == 'donated'">
                    <ClothingItem 
                        v-for="item in donatedClothingItems"
                        v-bind:key="item"
                        v-bind:item="item"
                    />
                </li>
                <li v-if="activeList == 'claimed'">
                    <ClothingItem 
                        v-for="item in claimedClothingItems"
                        v-bind:key="item"
                        v-bind:item="item"
                    />
                </li>
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
                activeList: 'unclaimed',
                donatedClothingItems: null,
                claimedClothingItems: null,
                unclaimedClothingItems: null,
                title: '',
                imageLink: '',
                clothingType: '',
                errorDonate: null
            }
        },
        mounted() {
            this.getUnclaimed();
        },
        methods: {
            getUnclaimed() {
                getAllUnclaimedClothing(this.unclaimedSuccess, this.unclaimedError);
            },
            uploadHandler() {
                const fields = {
                    title: this.title,
                    clothing_type: this.clothingType,
                    image: this.imageLink,
                    donator: this.username
                }
                donateClothingItem(fields, this.uploadSuccess, this.uploadFailure);
            },
            unclaimedSuccess(obj) {
                this.unclaimedClothingItems = obj.data;
            },
            unclaimedError(obj) {
                console.log(obj);
            },
            uploadSuccess(obj) {
                this.getUnclaimed();
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

    input[type="text"], input[type="password"] {
        box-sizing: border-box;
        border: solid;
        border-color: var(--lightblue);
    }
    section > div {
        margin-bottom: 10px;
    }

    p {
        margin: 0px;
        color: red;
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
        width: 50%;
        padding: 20px;
        padding-top: 0px;
    }

    .toggle-container {
        display: flex;
        width: 100%;
    }

    .toggle-container > * {
        border-radius: 0px;
    }

    .toggle-container > *:first-child {
        border-radius: 4px 0px 0px 4px;
    }

    .toggle-container > *:last-child {
        border-radius: 0px 4px 4px 0px;
    }

    .add-form {
        background: var(--gray);
    }

    .list {
        background: white;
        color: black;
    }

    ol {
        list-style-type: none;
        visibility: 'hidden';
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
        padding-left: 20px;
        padding-right: 20px;
        margin: 0px;
        width: calc(100% - 40px);
        overflow-x: hidden;
    }

    /* customize scrollbar for dark theme */
    ::-webkit-scrollbar {
        width: 2vh;  /* for vertical scrollbars */
        height: 2vh; /* for horizontal scrollbars */
    }
    ::-webkit-scrollbar-track {
        background: rgba(111, 143, 186, 0.1);
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(111, 143, 186, 0.2);
    }
</style>