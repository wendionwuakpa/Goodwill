<template>
    <main id="app" v-cloak>
      <header class="topbar">
        <h1>
          Goodwill Donation Service
        </h1> 
        <AccountBar 
          v-if="username && username != 'null'"
          v-on:signout="signOutHandler"
          v-bind:username="username"
        />
      </header>
      
      <span class="main">
        <LandingPage
          v-if="activePage == 'LandingPage'"
          v-on:user="signInHandler"
        />
        <UserDashboard 
          v-bind:username="username"
          v-bind:isAdmin="isAdmin"
          v-if="activePage == 'UserDashboard'"
        />
      </span>
    </main>
</template>
    
<script src="../public/services.js"></script>
<script>
     import AccountBar from './components/AccountBar.vue';
     import UserDashboard from './components/UserDashboard.vue';
     import LandingPage from './components/LandingPage.vue';

     export default {
        name: 'app',
        components: {
          AccountBar, 
          UserDashboard,
          LandingPage
        },
        data() {
            return {
                username: null,
                password: null,
                isAdmin: null,
                activePage: 'LandingPage'
            }
        },
        mounted() {
          if (localStorage.user && localStorage.user != 'null') {
            // not very secure
            let username = localStorage.user;
            let password = localStorage.pass;
            let isAdmin = localStorage.admin;
            this.signInHandler(username, password, isAdmin);
          }
        },
        methods: {
            // getUserSuccess(obj) { // obj returned in response
            // console.log('hii');
            // console.log(obj);
            //   let username = obj.data.username;
            //   let password = obj.data.password;
            //   this.signInHandler(username, password)
            // },
            // getUserFailure(obj) { // obj returned in reponse
            //   // console.log(obj); // uncomment for debugging
            //   this.signOutHandler();
            // },
            signInHandler(username, password, isAdmin) {
              this.username = username;
              this.password = password;
              this.isAdmin = isAdmin;
              localStorage.user = username;
              localStorage.pass = password;
              localStorage.admin = isAdmin;
              if (isAdmin) {
                this.activePage = 'UserDashboard';
                // this.activePage = 'AdminDashboard';
              } else {
                this.activePage = 'UserDashboard';
              }
            },
            signOutHandler() {
              this.username = null;
              this.password = null;
              this.isAdmin = null;
              localStorage.user = null;
              localStorage.pass = null;
              localStorage.admin = null;
              this.activePage = 'LandingPage';
            }
        }
    } 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  --std-color: #2c3e50;
  --blue:  #3C8DAD;
  --darkblue:      #125D98;
  --offblue:   #ADC4DD;
  --lightblue: #CAD5E3;
  --offlightblue: #E5ECF5;
  --orange: #FAC898;
  --gray: gainsboro;
  --stdheight: 34px;
  --topbar-height: 42px;
  display: flex;
  flex-direction: column;
}

.dashboard {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

input {
  height: var(--stdheight);
}

input[type="button"] {
  background-color: var(--darkblue);
  color: white;
  padding: 10px;
  font-weight: bold;
  text-align: center;
}


input[type="button"]:hover {
    cursor: pointer;
    background-color: var(--blue);
}

.topbar {
  display: inline-flex;
  width: calc(100% - 10px);
  justify-content: space-between;
  background-color: var(--blue);
  padding: 7px;
  padding-left: 5px;
  padding-right: 5px;
  height: var(--topbar-height);
}

h1 {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
  color: white;
  font-weight: normal;
  margin-right: auto;
}

.main {
  display: inline-flex;
  width: 100%;
  height: calc(100vh - var(--topbar-height));
  overflow: hidden;
}

html, body, #app {
  height: 100vh;
  margin: 0px;
  overflow: hidden;
}
</style>
