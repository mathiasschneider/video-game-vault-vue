<template>
  <div class="users-edit">
    <div>
      Username:
      <input type="text" v-model="editUserParams.username" placeholder="Username" />
      <br />
      Email:
      <input type="text" v-model="editUserParams.email" placeholder="Email" />
      <br />
      Password:
      <input type="password" v-model="editUserParams.password" placeholder="Password" />
      <br />
      Password Confirmation:
      <input type="password" v-model="editUserParams.password_confirmation" placeholder="Password Confirmation" />
      <br />

      <button class="more-info" v-on:click="editUser()">Save</button>
      <button v-on:click="destroyUser()">Delete Account</button>
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
      users: [],
      editUserParams: {},
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios
        .get(`/users/${this.$route.params.id}`)
        .then((response) => {
          console.log("user show:", response.data);
          return (this.editUserParams = response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    editUser: function () {
      console.log(this.editUserParams);
      axios
        .patch(`users/${this.editUserParams.id}`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/users/${response.data.id}`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyUser: function () {
      if (confirm("Are you sure you want to delete this account?")) {
        axios.delete(`/users/${this.$route.params.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/logout");
        });
      }
    },
  },
};
</script>
