<template>
  <div class="main-container">
    <div class="container">
      <div class="row">
        <div class="col-sm-5 login-box">
          <div class="card card-default">
            <!-- <div class="panel-intro text-center">
              <h2 class="logo-title"> -->
            <!-- Original Logo will be placed here  -->
            <!-- <span class="logo-icon"><i class="icon icon-search-1 ln-shadow-logo shape-0"></i></span>
                BOOT
                <span>CLASSIFIED</span>
              </h2>
            </div> -->
            <div class="card-body">
              <form role="form" class="loginForm" v-on:submit.prevent="submit()">
                <div class="form-group">
                  <label for="list-title" class="control-label">List Title:</label>
                  <div class="input">
                    <input id="list-title" type="text" class="form-control" v-model="editListParams.title" />
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <button class="btn btn-primary btn-block btn-post" v-on:click="editList()">Update</button>
                  </div>
                  <div class="form-group col-md-6">
                    <button class="btn btn-primary btn-block btn-post" v-on:click="deleteList()">Delete</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="login-box-btm text-center">
            <p>
              <router-link :to="`/lists/${editListParams.id}`"><strong>Back to list view</strong></router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="lists-edit">
    <div>
      Title:
      <input type="text" v-model="editListParams.title" placeholder="Title" />
      <button class="more-info" v-on:click="editList()">Save</button>
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
      editListParams: {},
    };
  },
  created: function () {
    this.showList();
  },
  methods: {
    showList: function () {
      axios
        .get(`/lists/${this.$route.params.id}`)
        .then((response) => {
          console.log("list show:", response.data);
          return (this.editListParams = response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    editList: function () {
      console.log(this.editListParams);
      axios
        .patch(`lists/${this.editListParams.id}`, this.editListParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/lists/${this.editListParams.id}`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    deleteList: function () {
      if (confirm("Are you sure you want to delete this list?")) {
        axios.delete(`/lists/${this.editListParams.id}`).then((response) => {
          console.log(response.data);
          this.$router.push(`/lists/`);
        });
      }
    },
  },
};
</script>
