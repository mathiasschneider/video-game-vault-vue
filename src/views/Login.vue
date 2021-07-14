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
                  <label for="sender-email" class="control-label">Email:</label>
                  <div class="input-icon">
                    <i class="icon-user fa"></i>
                    <input
                      id="sender-email"
                      type="email"
                      placeholder="Email"
                      class="form-control email"
                      v-model="email"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="user-pass" class="control-label">Password:</label>
                  <div class="input-icon">
                    <i class="icon-lock fa"></i>
                    <input
                      type="password"
                      v-model="password"
                      class="form-control"
                      placeholder="Password"
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
              Don't have an account?
              <br />
              <router-link to="/signup"><strong>Sign Up !</strong></router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="login">
    <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div> -->
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push(`/users/${this.$parent.getUserId()}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
