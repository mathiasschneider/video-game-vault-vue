<template>
  <div class="games-show">
    <div v-if="games">
      <div v-for="game in games" v-bind:key="game.igdb_game_id">
        <img v-if="game.cover" :src="game.cover.url.replace('t_thumb', 't_cover_big')" :alt="game.name" />
        <img v-else src="/no_image_found.jpeg" />
        <h1>{{ game.name }}</h1>
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
        <p>{{ listId }}</p>
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
          <router-link :to="`/games/${similar_game.id}`">{{ similar_game.name }}</router-link>
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
      games: {},
      quantity: "",
      cover: "",
      lists: [],
      listId: "",
      // user: {},
      // currentUserId: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    axios.post(`/games/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.games = response.data;
    });
    axios.get("/lists").then((response) => {
      console.log(response.data);
      this.lists = response.data;
    });
    // this.showUser();
  },
  methods: {
    addToList: function () {
      axios.post("/list_games", {
        list_id: this.listId,
        igdb_game_id: this.$route.params.id,
        quantity: this.quantity,
        title: this.games[0].name,
        image_url: this.games[0].cover.url,
      });
    },
    // showUser: function () {
    //   axios.get(`/users/${this.gameDetails.user.id}`).then((response) => {
    //     this.user = response.data;
    //     console.log(this.user);
    //   });
    // },
  },
};
</script>
