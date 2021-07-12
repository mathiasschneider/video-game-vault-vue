<template>
  <div class="lists-show">
    <h1>{{ listDetails.title }}</h1>
    <!-- <p>
      <strong>Public:</strong>
      {{ listDetails.public }}
    </p> -->
    <p>
      <strong>Author:</strong>
      {{ listDetails.user.username }}
    </p>
    <!-- <p>Current User ID: {{ currentUserId }}</p>
    <p>User ID: {{ this.listDetails.user.id }}</p> -->
    <router-link :to="`/lists/${listDetails.id}/edit`">Edit List</router-link>
    <button v-on:click="destroyList()">Delete list</button>
    <br />
    <br />
    <div v-for="list_game in listDetails.list_games" v-bind:key="list_game.id">
      <img :src="list_game.image_url" alt="" />
      <h3>{{ list_game.title }}</h3>
      <p>Quantity: {{ list_game.quantity }}</p>
      <p>ID: {{ list_game.id }}</p>
      <button v-on:click="removeListGame()">Remove from list</button>
      <br />
      <br />
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
    destroyList: function () {
      if (confirm("Are you sure you want to delete this list?")) {
        axios.delete(`/lists/${this.$route.params.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/lists");
        });
      }
    },
    removeListGame: function () {
      if (confirm("Are you sure you want to remove this game from this list?")) {
        axios.delete(`/list_games/${this.listDetails.list_games.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/logout");
        });
      }
    },
  },
};
</script>
