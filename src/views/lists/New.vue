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
                    <input id="list-title" type="text" class="form-control" v-model="newListParams.title" />
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-12">
                    <button class="btn btn-primary btn-block btn-post" v-on:click="createList()">
                      Create new list
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="login-box-btm text-center">
            <p>
              <router-link :to="`/lists/`"><strong>Back to my lists</strong></router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="lists-new">
    <form v-on:submit.prevent="createList()">
      <h1>Create a new list</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" required class="form-control" v-model="newListParams.title" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div> -->
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: () => ({
    newListParams: {},
    errors: [],
  }),
  methods: {
    createList: function () {
      this.newListParams.public = true;
      // this.newListParams.public = this.checked();
      axios
        .post("/lists", this.newListParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/lists");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    // checked: function () {
    //   return document.querySelector(".checkbox").checked;
    // },
  },
};
</script>
