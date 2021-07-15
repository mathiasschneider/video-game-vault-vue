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
              <form role="form" class="signupForm" v-on:submit.prevent="submit()">
                <div class="form-group">
                  <label for="sender-email" class="control-label">Email:</label>
                  <div class="input">
                    <input
                      id="sender-email"
                      type="email"
                      placeholder="Email"
                      class="form-control email"
                      v-model="newUserParams.email"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="sender-email" class="control-label">Username:</label>
                  <div class="input">
                    <input
                      id="sender-email"
                      type="text"
                      placeholder="Username"
                      class="form-control username"
                      v-model="newUserParams.username"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="user-pass" class="control-label">Password:</label>
                  <div class="input">
                    <input
                      type="password"
                      v-model="newUserParams.password"
                      class="form-control"
                      placeholder="Password"
                      id="user-pass"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="user-pass" class="control-label">Password Confirmation:</label>
                  <div class="input">
                    <input
                      type="password"
                      v-model="newUserParams.password_confirmation"
                      class="form-control"
                      placeholder="Password Confirmation"
                      id="user-pass"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input name="submit" class="btn btn-primary btn-block" value="Submit" type="submit" />
                </div>
              </form>
            </div>
            <!-- <div class="card-footer">
              <div class="checkbox pull-left">
                <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                  <input type="checkbox" class="custom-control-input" />
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">Keep me logged in</span>
                </label>
              </div>

              <p class="text-center pull-right"><a href="forgot-password.html">Lost your password?</a></p>

              <div style="clear: both"></div>
            </div> -->
          </div>
          <div class="login-box-btm text-center">
            <p>
              Already have an account?
              <br />
              <router-link to="/login"><strong>Log In !</strong></router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="newUserParams.username" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="newUserParams.email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="newUserParams.password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="newUserParams.password_confirmation" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div> -->
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
