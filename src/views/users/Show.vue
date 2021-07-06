<template>
  <div class="user-show">
    <div v-for="user in users" v-bind:key="user.id">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <router-link v-if="`${user.id}` === `${currentUserId}`" :to="`/users/${user.id}/edit`" tag="button">
        Edit Info
      </router-link>
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
        console.log(this.user);
      });
    },
  },
};
</script>
