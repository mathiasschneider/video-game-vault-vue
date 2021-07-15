<template>
  <div class="main-container">
    <div class="container">
      <div class="col-md-12 page-content col-thin-right">
        <div class="content-box col-xl-12">
          <div class="row row-featured row-featured-category">
            <div class="col-xl-12 box-title no-border">
              <div class="inner">
                <h2>
                  {{ list.title }}
                  <strong class="sell-your-item">
                    <strong>{{ list.user.username }}</strong>
                    <i class="icon-user fa"></i>
                  </strong>
                </h2>
              </div>
            </div>

            <div class="category-list-wrapper jobs-list">
              <div v-for="list_game in list.list_games" v-bind:key="list_game.id" class="item-list job-item">
                <div class="row">
                  <div class="col-sm-1 col-2 col-xs-2 no-padding photobox">
                    <div class="add-image">
                      <router-link :to="`/games/${list_game.igdb_game_id}`">
                        <img v-if="list_game.image_url" :src="list_game.image_url" class="thumbnail no-margin" />
                        <img v-else src="/no_image_found.jpeg" class="thumbnail no-margin" />
                      </router-link>
                    </div>
                  </div>
                  <!--/.photobox-->
                  <div class="col-sm-10 col-10 col-xs-10 add-desc-box">
                    <div class="ads-details jobs-item">
                      <br />
                      <h4 class="job-title">
                        <router-link :to="`/games/${list_game.igdb_game_id}`">{{ list_game.title }}</router-link>
                      </h4>
                      <div class="job-desc">Quantity: {{ list_game.quantity }}</div>

                      <div v-if="$parent.getUserId() == list.user.id" class="job-actions">
                        <ul class="list-unstyled list-inline">
                          <li>
                            <button
                              class="btn btn-border btn-primary nav-link"
                              v-on:click="increaseListGame(list_game)"
                            >
                              Qty +
                            </button>
                          </li>
                          <li>
                            <button
                              class="btn btn-border btn-primary nav-link"
                              v-on:click="decreaseListGame(list_game)"
                            >
                              Qty -
                            </button>
                          </li>
                          <li>
                            <button class="btn btn-border btn-primary nav-link" v-on:click="removeListGame(list_game)">
                              Remove from list
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="lists-show">
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
  </div> -->
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
    this.showUser();
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
    showUser: function () {
      axios.get(`/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        // console.log("User Info:", this.user);
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
