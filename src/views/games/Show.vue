<template>
  <div class="games-show">
    <div v-if="games">
      <div v-for="game in games" v-bind:key="game.igdb_game_id">
        <img :src="game.cover.url.slice(2)" alt="" />
        <p>{{ game.cover.url.slice(2) }}</p>
        <p>{{ game.name }}</p>
        <p>{{ game.platforms }}</p>
      </div>
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
      games: [],
      // lists: [],
      // user: {},
      // currentUserId: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    console.log(this.$route.params.id);
    axios.post(`/games/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.games = response.data;
    });
    // this.showList();
    // this.showUser();
  },
  methods: {
    // showList: function () {
    //   axios
    //     .get(`/lists/${this.$route.params.id}`)
    //     .then((response) => {
    //       console.log("list show:", response.data);
    //       return (this.gameDetails = response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data);
    //     });
    // },
    // showUser: function () {
    //   axios.get(`/users/${this.gameDetails.user.id}`).then((response) => {
    //     this.user = response.data;
    //     console.log(this.user);
    //   });
    // },
  },
};
</script>
