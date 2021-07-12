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
      <div v-for="(game, index) in games" v-bind:key="game.igdb_game_id">
        <img v-if="game.cover" :src="game.cover.url" :alt="game.name" />
        <img v-else src="/no_image_found.jpeg" />
        <h2>{{ game.name }}</h2>
        <span>{{ index }}</span>
        <div v-for="platform in game.platforms" v-bind:key="platform.id">
          <p>{{ platform.name }}</p>
        </div>
        <div>
          <form v-on:submit.prevent="addToList()">
            <label for="lists">Add to list:</label>
            <select v-model="listId" id="lists">
              <option v-for="list in lists" v-bind:key="list.id" :value="list.id">{{ list.title }}</option>
            </select>
            <input type="number" v-model="quantity" placeholder="Quantity" />
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
      listId: "",
      quantity: "",
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
    addToList: function () {
      axios.post("/list_games", {
        list_id: this.listId,
        igdb_game_id: this.games[0].id,
        quantity: this.quantity,
        title: this.games[0].name,
        image_url: this.games[0].cover.url,
      });
      console.log("Added game to list");
    },
  },
};
</script>
