<template>
  <div class="lists-show">
    <h1>{{ listDetails.title }}</h1>
    <p>
      <strong>Title:</strong>
      {{ this.listDetails.title }}
    </p>
    <p>
      <strong>Public:</strong>
      {{ this.listDetails.public }}
    </p>
    <p>
      <strong>User ID:</strong>
      {{ this.listDetails.user_id }}
    </p>
    <router-link :to="`/lists/${this.listDetails.id}/edit`">Edit List</router-link>
    <br />
    <button v-on:click="destroyList()">Delete list</button>
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
      lists: [],
      listDetails: {},
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
          return (this.listDetails = response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
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
  },
};
</script>
