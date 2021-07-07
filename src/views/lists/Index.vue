<template>
  <div class="index">
    <router-link to="/lists/new">Create a new list</router-link>
    <div v-for="list in lists" v-bind:key="list.id">
      <h2>{{ list.title }}</h2>
      <p>Public: {{ list.public }}</p>
      <router-link v-bind:to="`/lists/${list.id}`">More Details</router-link>
    </div>
  </div>
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
  },
};
</script>
