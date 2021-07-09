<template>
  <div class="games-show">
    <div v-if="games">
      <div v-for="game in games" v-bind:key="game.igdb_game_id">
        <img :src="game.cover.url" alt="" />
        <p>{{ game.name }}</p>
        <h2>Platform:</h2>
        <div v-for="platform in game.platforms" v-bind:key="platform.id">
          <p>{{ platform.name }}</p>
        </div>
        <h2>Genre:</h2>
        <div v-for="genre in game.genres" v-bind:key="genre.id">
          <p>{{ genre.name }}</p>
        </div>
        <h2>Similar Games:</h2>
        <div v-for="similar_game in game.similar_games" v-bind:key="similar_game.id">
          <a :href="`/games/${similar_game.id}`">{{ similar_game.name }}</a>
        </div>
        <h2>Rating:</h2>
        <p>{{ game.rating }}</p>
        <h2>Summary:</h2>
        <p>{{ game.summary }}</p>
        <!-- <h2>Involved Companies:</h2>
        <div v-for="company in game.involved_companies.company" v-bind:key="company.id">
          <p>{{ involved_companies.company.name }}</p>
        </div> -->

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
