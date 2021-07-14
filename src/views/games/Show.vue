<template>
  <div class="games-show">
    <div v-for="game in games" v-bind:key="game.igdb_game_id" class="main-container">
      <!-- <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav aria-label="breadcrumb" role="navigation" class="pull-left">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="event-home.html"><i class="icon-home fa"></i></a>
                </li>
                <li class="breadcrumb-item"><a href="event-category.html">Events</a></li>
                <li class="breadcrumb-item active" aria-current="page">Search Results</li>
              </ol>
            </nav>

            <div class="pull-right backtolist">
              <a href="event-category.html">
                <i class="fa fa-angle-double-left"></i>
                Back to Results
              </a>
            </div>
          </div>
        </div>
      </div> -->
      <div class="container">
        <div class="row">
          <div class="col-md-6 page-content col-thin-right">
            <div class="event-details-title">
              <h1 class="title">
                <span class="auto-title left">{{ game.name }}</span>
                <span class="auto-price pull-right">{{ Math.round(game.rating) }}/100</span>
              </h1>
            </div>
            <div class="ev-image">
              <img v-if="game.cover" :src="game.cover.url.replace('t_thumb', 't_1080p')" :alt="game.name" />
              <img v-else src="/no_image_found.jpeg" />
            </div>
            <!-- <div class="inner inner-box ads-details-wrapper event">
              <div class="Ads-Details">
                <h4 class="text-uppercase"><strong>Summary</strong></h4>

                <div class="ads-details-info">
                  <p>
                    {{ game.summary }}
                  </p>
                  <h4 class="text-uppercase"><strong>Similar Games:</strong></h4>

                  <ul class="list-circle">
                    <li v-for="similar_game in game.similar_games" v-bind:key="similar_game.id">
                      <router-link :to="`/games/${similar_game.id}`">{{ similar_game.name }}</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
            <!--/.ads-details-wrapper-->
          </div>
          <!--/.page-content-->

          <div class="col-md-6 page-sidebar-right">
            <aside>
              <!-- <div class="block-cell user">
                <div class="cell-media"><img src="/images/users/2.jpg" alt="" /></div>
                <div class="cell-content">
                  <h5 class="title">Organize by</h5>
                  <span class="name"><a href="#">David Jhone Jr.</a></span>
                  <span class="rating">top rated</span>
                </div>
              </div> -->

              <div class="card sidebar-card">
                <div class="card-header">GAME DETAILS</div>
                <div class="card-content">
                  <div class="card-body text-left">
                    <h5 class="text-uppercase"><strong>PLATFORMS</strong></h5>
                    <div class="ev-info-details">
                      <div class="ev-details">
                        <li v-for="platform in game.platforms" v-bind:key="platform.id">
                          {{ platform.name }}
                        </li>
                        <br />
                      </div>
                    </div>
                    <h5 class="text-uppercase"><strong>GENRES</strong></h5>
                    <div class="ev-info-details">
                      <div class="ev-details">
                        <li v-for="genre in game.genres" v-bind:key="genre.id">
                          {{ genre.name }}
                        </li>
                        <br />
                      </div>
                    </div>
                    <h5 class="text-uppercase"><strong>SUMMARY</strong></h5>
                    <div class="ev-info-details">
                      <div class="ev-details">
                        <p>{{ game.summary }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="ev-action">
                    <form v-on:submit.prevent="addToList()">
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label for="inputList">Choose List</label>
                          <select v-model="listId" id="inputList" class="form-control">
                            <option v-for="list in lists" v-bind:key="list.id" :value="list.id">
                              {{ list.title }}
                            </option>
                            >
                          </select>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputEmail4">Quantity</label>
                          <input
                            type="number"
                            v-model="quantity"
                            class="form-control"
                            id="inputEmail4"
                            placeholder="Qty"
                          />
                        </div>
                      </div>

                      <button type="submit" class="btn btn-success btn-block btn-post">Add to List</button>
                    </form>
                    <!-- <form v-on:submit.prevent="addToList()">
                      <label for="lists">Add to list:</label>
                      <select v-model="listId" id="lists">
                        <option v-for="list in lists" v-bind:key="list.id" :value="list.id">{{ list.title }}</option>
                      </select>
                      <input type="number" v-model="quantity" placeholder="Quantity" />
                      <input class="btn btn-success btn-block btn-post" type="submit" value="Submit" />
                    </form> -->
                  </div>
                </div>
              </div>
              <div class="card sidebar-card">
                <div class="card-header">SIMILAR GAMES</div>
                <div class="card-content">
                  <div class="card-body text-left">
                    <div class="ev-info-details">
                      <div class="ev-details">
                        <li v-for="similar_game in game.similar_games" v-bind:key="similar_game.id">
                          <router-link :to="`/games/${similar_game.id}`">{{ similar_game.name }}</router-link>
                        </li>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--/.categories-list-->
            </aside>
          </div>

          <!--/.page-side-bar-->
        </div>
      </div>
    </div>
    <!-- /.main-container -->
    <!-- <div v-if="games"> -->
    <!-- <div v-for="game in games" v-bind:key="game.igdb_game_id">
        <img v-if="game.cover" :src="game.cover.url.replace('t_thumb', 't_1080p')" :alt="game.name" />
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
         <h2>Involved Companies:</h2>
        <div v-for="company in game.involved_companies.company" v-bind:key="company.id">
          <p>{{ involved_companies.company.name }}</p>
        </div> -->
    <!-- </div> -->
    <!-- </div> -->
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
  },
};
</script>
