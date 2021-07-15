<template>
  <div class="main-container">
    <div v-if="currentUserId" class="container">
      <div class="col-md-12 page-content col-thin-right">
        <div class="content-box col-xl-12">
          <div class="row row-featured row-featured-category">
            <div class="col-xl-12 box-title no-border">
              <div class="inner">
                <h2>
                  Your Lists
                  <router-link to="/lists/new" class="sell-your-item">
                    <strong>Create a new list</strong>
                    <i class="icon-th-list"></i>
                  </router-link>
                </h2>
              </div>
            </div>

            <div class="category-list-wrapper jobs-list">
              <div v-for="list in lists" v-bind:key="list.id" class="item-list job-item">
                <div class="row">
                  <div class="col-sm-1 col-2 col-xs-2 no-padding photobox">
                    <div class="add-image">
                      <router-link :to="`/lists/${list.id}`">
                        <img
                          v-if="list.list_games.length > 0"
                          :src="list.list_games[0].image_url"
                          class="thumbnail no-margin"
                        />
                        <img v-else src="/no_image_found.jpeg" class="thumbnail no-margin" />
                      </router-link>
                    </div>
                  </div>
                  <!--/.photobox-->
                  <div class="col-sm-10 col-10 col-xs-10 add-desc-box">
                    <div class="ads-details jobs-item">
                      <br />
                      <h4 class="job-title">
                        <router-link :to="`/lists/${list.id}`">{{ list.title }}</router-link>
                      </h4>

                      <div class="job-actions">
                        <ul class="list-unstyled list-inline">
                          <li>
                            <router-link class="save-job" v-bind:to="`/lists/${list.id}`">View List</router-link>
                          </li>
                          <li>
                            <router-link class="save-job" v-bind:to="`/lists/${list.id}/edit`">Edit List</router-link>
                          </li>
                          <!-- <li>
                            <a type="button" class="btn btn-link" v-on:click="destroyList()">Delete list</a>
                          </li> -->
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
    <div v-else class="main-container">
      <div class="container">
        <div class="inner-box">
          <div class="welcome-msg">
            <div class="row">
              <div class="col-md-12">
                <h1 class="page-sub-header2 clearfix no-padding">
                  You need to be logged in if you want to create lists.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="main-container">
    <div class="container">
      <div class="col-md-12 page-content col-thin-left">
        <div class="category-list">
          <div class="category-list-wrapper jobs-list">
            <div class="item-list job-item">
              <div v-for="list in lists" v-bind:key="list.id" class="row">
                <div class="col-sm-1 col-2 col-xs-2 no-padding photobox">
                  <div class="add-image">
                    <a href="">
                      <img :src="list.list_games[0].image_url" alt="" class="thumbnail no-margin" />
                    </a>
                  </div>
                </div>
                <div class="col-sm- col-10 col-xs-10 add-desc-box">
                  <div class="ads-details jobs-item">
                    <br />
                    <h4 class="job-title">
                      <a href="job-details.html">{{ list.title }}</a>
                    </h4>

                    <div class="job-actions">
                      <ul class="list-unstyled list-inline">
                        <li>
                          <router-link class="save-job" v-bind:to="`/lists/${list.id}`">More Details</router-link>
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
  </div> -->
</template>

<style>
.more-info {
  margin-bottom: 35px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      lists: [],
      newlistTitle: "",
      newlistPublic: "",
      newlistUser_id: "",
      currentUserId: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    this.indexLists();
  },
  methods: {
    indexLists: function () {
      axios.get("/lists").then((response) => {
        console.log(response.data);
        return (this.lists = response.data);
      });
    },
    // destroyList: function () {
    //   if (confirm("Are you sure you want to delete this list?")) {
    //     axios.delete(`/lists/${this.lists.id}`).then((response) => {
    //       console.log(response.data);
    //       this.$router.push("/lists");
    //     });
    //   }
    // },
  },
};
</script>
