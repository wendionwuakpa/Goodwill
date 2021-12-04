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
                activePage: 'LandingPage'
            }
        },
        mounted() {
          if (localStorage.user) {
            // not very secure
            let username = localStorage.user;
            let password = localStorage.pass;
            this.signInHandler(username, password);
          }
        },
        methods: {
            getUserSuccess(obj) { // obj returned in response
              let username = obj.data.username;
              let password = obj.data.password;
              this.signInHandler(username, password)
            },
            getUserFailure(obj) { // obj returned in reponse
              // console.log(obj); // uncomment for debugging
              this.signOutHandler();
            },
            signInHandler(username, password) {
              this.username = username;
              this.password = password;
              localStorage.user = username;
              localStorage.pass = password;
              this.activePage = 'UserDashboard';
            },
            signOutHandler() {
              this.username = null;
              this.password = null;
              localStorage.user = null;
              localStorage.pass = null;
              this.activePage = 'LandingPage';
            }
        }
    } 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
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
  border: none;
  border-radius: 4px;
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

input[type="button"]:focus {
  outline: none;
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

h1:hover {
  color: var(--lightblue);
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



.close {
  float: right;
  font-weight: bold;
}

.toggle {
  display: flex;
  visibility: hidden;
  width: 1px;
}
</style>
