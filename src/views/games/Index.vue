<template>
  <div class="games-index">
    <h2>Search for a Game</h2>
    <div>
      <form v-on:submit.prevent="findGame()">
        <input type="text" v-model="search" placeholder="Search" />
        <input type="submit" v-on:click="findGame" value="Submit" />
      </form>
    </div>

    <div v-if="games">
      <div v-for="game in games" v-bind:key="game.igdb_game_id">
        <!-- <img :src="game.cover.url" alt="/src/assets/no_image_found.jpeg" /> -->
        <h2>{{ game.name }}</h2>
        <div v-for="platform in game.platforms" v-bind:key="platform.id">
          <p>{{ platform.name }}</p>
        </div>
        <router-link v-bind:to="`/games/${game.id}`">More Details</router-link>
      </div>
    </div>

    <div v-else><p>No results</p></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      games: [],
      search: "",
    };
  },
  methods: {
    findGame: function () {
      axios
        .post("/games", {
          search: this.search,
        })
        .then((response) => {
          this.games = response.data;
          console.log(response.data);
        });
    },
  },
};
</script>
