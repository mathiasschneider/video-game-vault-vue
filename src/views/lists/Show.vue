<template>
  <div class="lists-show">
    <h1>{{ listDetails.title }}</h1>
    <p>
      <strong>Public:</strong>
      {{ listDetails.public }}
    </p>
    <p>
      <strong>Author:</strong>
      {{ listDetails.user.username }}
    </p>
    <p>Current User ID: {{ currentUserId }}</p>
    <p>User ID: {{ this.listDetails.user.id }}</p>
    <!-- <span v-if="$parent.getUserId() == this.listDetails.user.id"> -->
    <router-link :to="`/`">Edit List</router-link>
    <button v-on:click="destroyList()">Delete list</button>
    <br />
    <br />
    <!-- </span> -->
    <!-- <span v-else>You may only edit your own lists</span> -->
    <div v-for="list_game in listDetails.list_games" v-bind:key="list_game.id">
      <img :src="list_game.image_url" alt="" />
      <h3>{{ list_game.title }}</h3>
      <p>Quantity: {{ list_game.quantity }}</p>
    </div>
  </div>
</template>

<style>
.more-info {
  margin-bottom: 35px;
}
button {
  margin-top: 35px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      lists: [],
      listDetails: { user: { username: "" } },
      user: {},
      currentUserId: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    this.showList();
    // this.showUser();
  },
  methods: {
    showList: function () {
      axios
        .get(`/lists/${this.$route.params.id}`)
        .then((response) => {
          console.log("list show:", response.data);
          return (this.listDetails = response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    // showUser: function () {
    //   axios.get(`/users/${this.listDetails.user.id}`).then((response) => {
    //     this.user = response.data;
    //     console.log(this.user);
    //   });
    // },
    destroyList: function () {
      if (confirm("Are you sure you want to delete this list?")) {
        axios.delete(`/lists/${this.$route.params.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/lists");
        });
      }
    },
  },
};
</script>
