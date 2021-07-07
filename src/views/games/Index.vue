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
        <h3>{{ game.name }}</h3>
        <h3>{{ game.platforms }}</h3>
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
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.games = response.data.Search;
          console.log(response.data.Search);
        });
    },
  },
};
</script>
