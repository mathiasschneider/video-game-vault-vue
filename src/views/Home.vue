<template>
  <div class="intro demo-intro" style="background-image: url(/TGoblinArt.0.jpg)">
    <div class="gradient-bg"></div>
    <div class="dtable hw100">
      <div class="dtable-cell hw100">
        <div class="container text-center">
          <h1 class="intro-title animated fadeInDown">Welcome!</h1>

          <p class="sub animateme fittext3 animated fadeIn">
            Video Game Vault is an all in one site for researching games, adding games to lists, and monitoring
            inventory for collecting or storefront use.
          </p>

          <div class="btn-box">
            <router-link v-if="!isLoggedIn()" to="/signup" class="btn btn-primary btn-round">Sign Up</router-link>
            <router-link v-if="!isLoggedIn()" to="/login" class="btn btn-primary btn-round">Log In</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="home">
    <p>HOME PAGE</p>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div> -->
</template>

<script>
// import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
      errors: [],
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
  // created: function () {
  //   axios.get("/users/1").then((response) => {
  //     this.user = response.data;
  //   });
  // },
};
</script>
