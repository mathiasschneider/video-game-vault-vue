<template>
  <div class="home">
    <p>HOME PAGE</p>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
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
  // created: function () {
  //   axios.get("/users/1").then((response) => {
  //     this.user = response.data;
  //   });
  // },
};
</script>
