<template>
  <div class="games-index">
    <div class="intro" style="background-image: url(/game_pile_blurry.jpg)">
      <div class="container text-center">
        <h1 class="intro-title animated fadeInDown">Find Video Games</h1>

        <!-- <p class="sub animateme fittext3 animated fadeIn">Find local classified ads on bootclassified in Minutes</p> -->

        <form v-on:submit.prevent="findGame()" class="row search-row animated fadeInUp">
          <div class="col-xl-8 col-sm-8 search-col relative locationicon">
            <div class="search-col-inner">
              <i class="icon-search icon-append"></i>
              <div class="search-col-input">
                <input
                  class="form-control locinput input-rel searchtag-input has-icon"
                  id="autocomplete-ajax"
                  name="country"
                  placeholder="Title/Keyword..."
                  type="text"
                  v-model="search"
                  value=""
                />
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-sm-4 search-col">
            <button class="btn btn-primary btn-search btn-block btn-gradient" value="Submit" style="margin-top: 0px">
              <strong>Search</strong>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="main-container">
      <div class="container">
        <div class="col-xl-12 content-box">
          <div class="row row-featured row-featured-category">
            <div class="col-xl-12 box-title no-border">
              <div v-if="sentSearch && games.length > 0" class="inner">
                <h2>
                  <span><strong>Results</strong></span>
                </h2>
              </div>
              <div v-if="sentSearch && games.length == 0" class="inner">
                <h2>
                  <span><strong>No Results Found</strong></span>
                </h2>
              </div>
            </div>

            <!-- <div v-if="games">
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

            <div v-else><p>No results</p></div> -->

            <div
              v-for="game in games"
              v-bind:key="game.igdb_game_id"
              class="col-xl-2 col-md-3 col-sm-3 col-xs-4 f-category"
            >
              <div class="inner">
                <router-link v-bind:to="`/games/${game.id}`">
                  <span class="imgBox">
                    <img
                      v-if="game.cover"
                      :src="game.cover.url.replace('t_thumb', 't_720p')"
                      :alt="game.name"
                      class="img-responsive"
                    />
                    <img v-else src="/no_image_found.jpeg" />
                  </span>

                  <h6>{{ game.name }}</h6>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div style="clear: both"></div>
      </div>
    </div>
    <!-- <div class="games-index">
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
  </div> -->
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
      sentSearch: false,
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
          this.sentSearch = true;
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
