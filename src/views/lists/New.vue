<template>
  <div class="lists-new">
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
      <!-- <div class="form-group">
        <label>Public:</label> -->
        <!-- <input type="checkbox" class="form-control checkbox" checked /> -->
      <!-- </div> -->
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
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
