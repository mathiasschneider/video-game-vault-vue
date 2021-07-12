<template>
  <div class="user-show">
    <span v-if="$parent.getUserId() == user.id">
      <p>User ID: {{ user.id }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <router-link :to="`/users/${user.id}/edit`">Edit Info</router-link>
    </span>
    <span v-else>You may only view your own information</span>
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
      user: {},
      lists: [],
      currentUserId: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get(`/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        console.log("User Info:", this.user);
      });
    },
  },
};
</script>
