<template>
  <div v-if="$parent.getUserId() == user.id" class="main-container">
    <div class="container">
      <div class="row">
        <div class="col-md-3 page-sidebar">
          <aside>
            <div class="inner-box">
              <div class="user-panel-sidebar">
                <div class="collapse-box">
                  <h5 class="collapse-title no-border">
                    My Lists
                    <span class="badge">{{ user.lists.length }}</span>
                    <a href="#MyClassified" aria-expanded="true" data-bs-toggle="collapse" class="pull-right">
                      <i class="fa fa-angle-down"></i>
                    </a>
                  </h5>
                  <div class="panel-collapse collapse show" id="MyClassified">
                    <ul class="acc-list">
                      <div v-for="list in user.lists" v-bind:key="list.id">
                        <li>
                          <router-link :to="`/lists/${list.id}`">{{ list.title }}</router-link>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
                <div class="collapse-box">
                  <h5 class="collapse-title">
                    Terminate Account
                    <a href="#TerminateAccount" aria-expanded="true" data-bs-toggle="collapse" class="pull-right">
                      <i class="fa fa-angle-down"></i>
                    </a>
                  </h5>
                  <div class="panel-collapse collapse show" id="TerminateAccount">
                    <ul class="acc-list">
                      <li>
                        <a v-on:click="destroyUser()">
                          <i class="icon-cancel-circled"></i>
                          Delete account
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div class="col-md-9 page-content">
          <div class="inner-box">
            <div id="accordion" class="panel-group">
              <div class="card card-default">
                <div class="card-header">
                  <h4 class="card-title">
                    <a href="#collapseB1" aria-expanded="true" data-bs-toggle="collapse">Account details</a>
                  </h4>
                </div>
                <div class="panel-collapse collapse show" id="collapseB1">
                  <div class="card-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Email:</label>

                        <div class="col-sm-9">
                          <h4>{{ user.email }}</h4>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Username:</label>

                        <div class="col-sm-9">
                          <h4>{{ user.username }}</h4>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="card card-default">
                <div class="card-header">
                  <h4 class="card-title">
                    <a href="#collapseB2" aria-expanded="true" data-bs-toggle="collapse">Edit Account</a>
                  </h4>
                </div>
                <div class="panel-collapse collapse" id="collapseB2">
                  <div class="card-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Email:</label>

                        <div class="col-sm-9">
                          <input type="text" class="form-control" v-model="editUserParams.email" placeholder="Email" />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Username:</label>

                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="editUserParams.username"
                            placeholder="Username"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">New Password:</label>

                        <div class="col-sm-9">
                          <input
                            type="password"
                            class="form-control"
                            v-model="editUserParams.password"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Confirm Password:</label>

                        <div class="col-sm-9">
                          <input
                            type="password"
                            class="form-control"
                            v-model="editUserParams.password_confirmation"
                            placeholder="Confirm Password"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                          <button type="submit" class="btn btn-default btn-block" v-on:click="editUser()">
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
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
                You may only view your own account information. Please log in if this is your account.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="user-show">
    <span v-if="$parent.getUserId() == user.id">
      <p>User ID: {{ user.id }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <router-link :to="`/users/${user.id}/edit`">Edit Info</router-link>
    </span>
    <span v-else>You may only view your own information</span>
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
      user: {},
      lists: [],
      currentUserId: localStorage.getItem("user_id"),
      editUserParams: {},
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
    editUser: function () {
      console.log(this.editUserParams);
      axios
        .patch(`users/${this.$route.params.id}`, this.editUserParams)
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
