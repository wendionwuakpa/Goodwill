<template>
    <section class="account-container">
        <div class="profile">
            <img class="icon" src="../assets/profile.png" />
            <div class="name"> {{ username }} </div>
        </div>
        <input
            class="signout"
            type="button" 
            value="Sign Out"
            v-on:click="signOutHandler"
        />
    </section>
</template>

<script>
    export default { 
        name: 'AccountBar',
        props: ['username'],
        methods: {
            signOutHandler() {
                this.$emit('signout');
            }
        }
    }
</script>

<style scoped>

    .account-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .profile {
        display: inline-flex;
    }

    .name {
        height: 22px;
        margin-top: 12px;
        margin-right: 5px;
        font-size: 20px;
        border-right: solid;
        color: white;
        border-width: 2px;
        border-color: var(--lightblue);
        padding-right: 10px;
        padding-bottom: 1px;
    }

    .icon {
        width: 30px;
        height: 30px;
        margin-top: 8px;
        margin-bottom: 8px;
        margin-right: 5px;
    }

    .signout {
        margin-left: 5px;
        margin-right: 5px;
    }
</style>