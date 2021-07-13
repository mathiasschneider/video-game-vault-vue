<template>
  <div class="lists-show">
    <h1>{{ list.title }}</h1>
    <p>
      <strong>Author:</strong>
      {{ list.user.username }}
    </p>
    <router-link :to="`/lists/${list.id}/edit`">Edit List</router-link>
    <button v-on:click="destroyList()">Delete list</button>
    <br />
    <br />
    <div v-for="list_game in list.list_games" v-bind:key="list_game.id">
      <router-link :to="`/games/${list_game.igdb_game_id}`"><img :src="list_game.image_url" alt="" /></router-link>
      <h3>{{ list_game.title }}</h3>
      <p>Quantity: {{ list_game.quantity }}</p>
      <button v-on:click="increaseListGame(list_game)">+</button>
      <button v-on:click="decreaseListGame(list_game)">-</button>
      <button v-on:click="removeListGame(list_game)">Remove from list</button>
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
      list: { user: { username: "" } },
      user: {},
      currentUserId: localStorage.getItem("user_id"),
      editListGameParams: {},
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
          return (this.list = response.data);
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
    removeListGame: function (list_game) {
      if (confirm("Are you sure you want to remove this game from this list?")) {
        axios.delete(`/list_games/${list_game.id}`).then((response) => {
          console.log(response.data);
          var index = this.list.list_games.indexOf(list_game);
          this.list.list_games.splice(index, 1);
        });
      }
    },
    increaseListGame: function (list_game) {
      this.editListGameParams.quantity = list_game.quantity + 1;
      axios.patch(`/list_games/${list_game.id}`, this.editListGameParams).then((response) => {
        console.log(response.data);
        list_game.quantity++;
      });
    },
    decreaseListGame: function (list_game) {
      this.editListGameParams.quantity = list_game.quantity - 1;
      axios.patch(`/list_games/${list_game.id}`, this.editListGameParams).then((response) => {
        console.log(response.data);
        list_game.quantity--;
      });
    },
  },
};
</script>
