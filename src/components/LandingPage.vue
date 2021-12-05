<template>
    <section class="landing-container">
        <h3 class="header"> Welcome to Goodwill Donation Service! </h3>
        <span class="forms-container">
            <!-- Sign In Section -->
            <section class="sign-in form">
                <h3 class="form-header"> Sign In </h3>
                <div>
                    <label>Username</label>
                    <input type="text" v-model="usernameSignIn">
                </div> 
                <div>
                    <label>Password</label>
                    <input type="password" v-model="passwordSignIn">
                </div>
                <input :disabled="signInDisabled" type="button" value="Sign In" v-on:click="signInHandler"/>
                <p class="form-end"> {{ errorSignIn }} </p>
            </section>
            <!-- Create Account Section -->
            <section class="create-account form">
                <h3 class="form-header"> Create Account </h3>
                <div>
                    <label for="types">Account Type</label>
                    <select class="dropdown" v-model="account">
                        <option v-for="option in accountOptions" v-bind:key="option.value" v-bind:value="option.value">
                            {{ option.text }}
                        </option> 
                    </select>
                </div>
                <div v-if="account == 'Administrator'">
                    <label>Admin Token</label>
                    <input type="password" v-model="tokenAdmin">
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" v-model="usernameCreate">
                </div> 
                <div>
                    <label>Password</label>
                    <input type="password" v-model="passwordCreate1">
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input :class="{nomatch: !passwordsMatch}" type="password" v-model="passwordCreate2">
                    <p v-if="!passwordsMatch"> passwords don't match </p>
                </div>
                <input :disabled="createDisabled" type="button" value="Create Account" v-on:click="createAccountHandler"/>
                <p class="form-end"> {{ errorCreate }} </p>
            </section>
        </span>
    </section>
</template>

<script src="../public/services.js"></script>
<script>
    export default {
        name: 'LandingPage',
        data() {
            return {
                usernameSignIn: '',
                passwordSignIn: '',
                errorSignIn: null,
                usernameCreate: '',
                passwordCreate1: '',
                passwordCreate2: '',
                tokenAdmin: '',
                staticToken: '1234', // administrators need to know this token
                errorCreate: null,
                account: 'Donator',
                accountOptions: [
                    {text: 'Donator', value: 'Donator'},
                    {text: 'Administrator', value: 'Administrator'}
                ]
            }
        },
        computed: {
            passwordsMatch: function() {
                return (this.passwordCreate1 == this.passwordCreate2);
            },
            createDisabled: function() {
                return !(this.passwordCreate1 != '' && this.usernameCreate != '' && this.passwordsMatch);
            },
            signInDisabled: function() {
                return !(this.passwordSignIn != '' && this.usernameSignIn != '' && this.passwordsMatch);
            }
        },
        methods: {
            signInHandler() {
                this.errorSignIn = null;
                const fields = {
                    username: this.usernameSignIn,
                    password: this.passwordSignIn
                };
                getUser(fields, this.success, this.signInError);
            },
            createAccountHandler() {
                this.errorCreate = null;
                
                if (this.account == 'Donator') {
                    const fields = {
                        username: this.usernameCreate,
                        password: this.passwordCreate1,
                        admin: false
                    };
                    addUser(fields, this.success, this.createAccountError);
                } 
                else if (this.account == 'Administrator') {
                    if (this.tokenAdmin != this.staticToken) {
                        this.errorCreate = 'Token is inavlid';
                    } else {
                        const fields = {
                            username: this.usernameCreate,
                            password: this.passwordCreate1,
                            admin: true
                        };
                        addUser(fields, this.success, this.createAccountError);
                    }
                }
            },
            success(obj) {
                const username = obj.data.username;
                const password = obj.data.password;
                const isAdmin = obj.data.isAdmin;
                console.log(obj);
                this.$emit('user', username, password, isAdmin); 
            },
            signInError(obj) {
                this.errorSignIn = obj.data;
            },
            createAccountError(obj) {
                this.errorCreate = obj.data;
            }
            
        }
    }
</script>

<style scoped>
    .header {
        background: var(--orange);
        margin: 0px !important;
        padding: 10px;
    }

    .form-header {
        margin-top: auto;
    }

    h3 {
        text-align: center;
    }

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

    .nomatch {
        border-color: red !important;
    }

    p {
        margin: 0px;
        color: red;
    }

    .form-end {
        margin-bottom: auto;
    }

    .landing-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .forms-container {
        width: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: row;
    }

    .form {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 20px;
        padding-top: 0px;
    }

    .sign-in {
        background: var(--gray);
    }

    .create-account {
        background: white;
    }

    section > div {
        margin-bottom: 10px;
    }

</style>