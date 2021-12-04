<template>
    <section class="dashboard">
        <h3 class="message"> Rental Agency Add Listing</h3> 
        <input type="button" class="back" value="Back to Rental Agency Dashboard" v-on:click="handleBack"/>
        <span class="addListingContainer">
        <h4 class="title" style="padding-top:50px">
            Submit Form to Add a Listing
        </h4> 
        <div class = "listingInputSection">
        <div class = "addListingInput">
            <label>Address</label>
            <input type="text" v-model="address">
        </div> 
        <div class = "addListingInput">
            <label>Rent</label>
            <input type="text" v-model="rent">
        </div> 
        <div class = "addListingInput">
            <label>Beds</label>
            <input type="text" v-model="beds">
        </div> 
        <div class = "addListingInput">
            <label>Baths</label>
            <input type="text" v-model="baths">
        </div> 
        <div class = "addListingInput">
            <label>Duration</label>
            <input type="text" v-model="time">
        </div> 
        <div class = "addListingInput">
            <label>Pets Allowed</label>
            <span class="petsAllowed" v-if="this.petsAllowed" v-on:click="petsAllowedToggle" >
                    <div class="chosenPet">YES</div>    
                    <div>NO</div>
            </span>
            <span class="petsAllowed" v-if="!this.petsAllowed" v-on:click="petsAllowedToggle" >
                    <div>YES</div>     
                    <div class="chosenPet">NO</div>
            </span>
        </div> 
        <div class = "addListingInput"> 
            <label>Capacity</label>
            <input type="text" v-model="capacity">
        </div>
        </div>
        <input class="submitFormButton" type="button" v-on:click="submitHandler" value="Submit"/>
        </span>
    </section>
</template>

<script src="../../public/services.js"></script>
<script>
    export default {
        name: 'AddListing',
        props: ['user'],
        data() {
            return {
                address: "",
                rent: 0,
                beds: 0,
                time: 0,
                baths: 0,
                petsAllowed: false,
                capacity: 0,
            }
        },

        watch: {
            
        },

        methods: {
            handleBack() {
                this.$emit('dash');
            },
            submitHandler() { 
                console.log(this.user);
                const fields = {
                    creator: this.user, 
                    address: this.address,
                    time: this.time, 
                    beds: this.beds,
                    baths: this.baths,
                    rent: this.rent,
                    petsAllowed: this.petsAllowed,
                    capacity: this.capacity
                }; 
                createListing(fields, this.success, this.error);
            }, 
            petsAllowedToggle() {
               this.petsAllowed = !this.petsAllowed;
            },
            success(obj) {
                this.message = obj.data.message;
                this.$emit('dash');
            },
            error(obj) {
                this.error = obj.data.error;
            }
        }
    }
</script>

<style scoped>
    .back {
        width: fit-content;
    }
    .chosenPet {
        color: var(--orange);
        background-color: white;
        padding: 2px;
    }
    .petsAllowed {
        color: white;
        display: grid;

    }
    h3 {
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 15px;
        padding-bottom: 15px;
        margin-top: 0px;
        margin-bottom: 0px;
        background-color: var(--orange);
        color: var(--std-color);
        text-align: center !important;
    }

    .dashboard {
        --padding: 5px;
    }

    .addListingContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .listingInputSection {
        padding: 20px;
        background-color: var(--orange);
    }
    .addListingInput {
        display: flex;
        width: 300px;
        flex-direction: row;
        background-color: var(--orange);
        justify-content: space-between;
        padding: 5px;
        height: 40px;
    }
    .submitFormButton {
        width: 200px;
        align-self: center;
        margin-top: 20px;
    }
    .title {
        text-align: center;
        margin: 5px;
    }

</style>