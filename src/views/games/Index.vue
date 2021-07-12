<template>
  <div class="games-index">
    <h2>Search for a Game</h2>
    <div>
      <form v-on:submit.prevent="findGame()">
        <input type="text" v-model="search" placeholder="Search" />
        <input type="submit" value="Submit" />
      </form>
      <br />
    </div>

    <div v-if="games">
      <div v-for="game in games" v-bind:key="game.igdb_game_id">
        <img v-if="game.cover" :src="game.cover.url" :alt="game.name" />
        <img v-else src="/no_image_found.jpeg" />
        <h2>{{ game.name }}</h2>
        <div v-for="platform in game.platforms" v-bind:key="platform.id">
          <p>{{ platform.name }}</p>
        </div>
        <div>
          <form v-on:submit.prevent="addToList(game)">
            <label for="lists">Add to list:</label>
            <select v-model="game.listId" id="lists">
              <option v-for="list in lists" v-bind:key="list.id" :value="list.id">{{ list.title }}</option>
            </select>
            <input type="number" v-model="game.quantity" placeholder="Quantity" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <router-link v-bind:to="`/games/${game.id}`">More Details</router-link>
        <br />
        <br />
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
      lists: [],
      cover: "",
    };
  },
  created: function () {
    axios.get("/lists").then((response) => {
      console.log(response.data);
      this.lists = response.data;
    });
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
    addToList: function (game) {
      axios.post("/list_games", {
        list_id: game.listId,
        igdb_game_id: game.id,
        quantity: game.quantity,
        title: game.name,
        image_url: game.cover.url,
      });
      console.log("Added game to list");
      game.listId = "";
      game.quantity = "";
    },
  },
};
</script>
