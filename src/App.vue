<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar fixed-top navbar-site navbar-light bg-light navbar-expand-md" role="navigation">
        <div class="container">
          <div class="navbar-identity">
            <router-link to="/" class="navbar-brand logo logo-title">
              <span class="logo-icon"><i class="icon icon-search-1 ln-shadow-logo"></i></span>
              <span>VIDEO GAME</span>
              VAULT
            </router-link>
          </div>

          <div class="navbar-collapse collapse" id="navbarsDefault">
            <ul class="nav navbar-nav me-md-auto navbar-left"></ul>
            <ul class="nav navbar-nav ml-auto navbar-right">
              <li v-if="isLoggedIn()" class="nav-item">
                <router-link class="nav-link" :to="`/users/${getUserId()}`">
                  <i class="icon-user fa"></i>
                  My Account
                </router-link>
              </li>
              <li v-if="isLoggedIn()" class="nav-item">
                <router-link class="nav-link" to="/lists">
                  <i class="icon-th-list"></i>
                  Lists
                </router-link>
              </li>
              <li v-if="isLoggedIn()" class="nav-item">
                <router-link class="nav-link" to="/games">
                  <i class="icon-th-thumb"></i>
                  Games
                </router-link>
              </li>
              <li v-if="!isLoggedIn()" class="nav-item">
                <router-link class="btn btn-border btn-post btn-default nav-link" to="/signup">Sign Up</router-link>
              </li>
              <!-- <li class="dropdown no-arrow nav-item">
                <a
                  href="#"
                  class="nav-link dropdown-toggle"
                  id="dropdown-nav-01"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>Jhon Doe</span>
                  <i class="icon-user fa"></i>
                  <i class="icon-down-open-big fa"></i>
                </a>
                <ul class="dropdown-menu user-menu dropdown-menu-right" aria-labelledby="dropdown01">
                  <li class="active dropdown-item">
                    <a href="account-home.html">
                      <i class="icon-home"></i>
                      Personal Home
                    </a>
                  </li>
                  <li class="dropdown-item">
                    <a href="account-myads.html">
                      <i class="icon-th-thumb"></i>
                      My ads
                    </a>
                  </li>
                  <li class="dropdown-item">
                    <a href="account-favourite-ads.html">
                      <i class="icon-heart"></i>
                      Favourite ads
                    </a>
                  </li>
                  <li class="dropdown-item">
                    <a href="account-saved-search.html">
                      <i class="icon-star-circled"></i>
                      Saved search
                    </a>
                  </li>
                  <li class="dropdown-item">
                    <a href="account-archived-ads.html">
                      <i class="icon-folder-close"></i>
                      Archived ads
                    </a>
                  </li>
                  <li class="dropdown-item">
                    <a href="account-pending-approval-ads.html">
                      <i class="icon-hourglass"></i>
                      Pending approval
                    </a>
                  </li>
                  <li class="dropdown-item">
                    <a href="statements.html">
                      <i class="icon-money"></i>
                      Payment history
                    </a>
                  </li>
                  <li class="dropdown-item">
                    <a href="login.html">
                      <i class="icon-logout"></i>
                      Log out
                    </a>
                  </li>
                </ul>
              </li> -->
              <li v-if="isLoggedIn()" class="postadd nav-item">
                <router-link class="btn btn-block btn-border btn-post btn-danger nav-link" to="/logout">
                  Log Out
                </router-link>
              </li>
              <li v-if="!isLoggedIn()" class="postadd nav-item">
                <router-link class="btn btn-block btn-border btn-post btn-primary nav-link" to="/login">
                  Log In
                </router-link>
              </li>
              <!-- <li class="dropdown lang-menu nav-item">
                <a
                  href="#"
                  class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="dropdown-nav-02"
                >
                  <span class="lang-title">EN</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-right user-menu" role="menu" aria-labelledby="dropdown-nav-02">
                  <li class="dropdown-item">
                    <a class="active">
                      <span class="lang-name">English</span>
                    </a>
                  </li>
                  <li class="dropdown-item">
                    <a><span class="lang-name">Dutch</span></a>
                  </li>
                  <li class="dropdown-item">
                    <a><span class="lang-name">fran&#xE7;ais</span></a>
                  </li>
                  <li class="dropdown-item">
                    <a><span class="lang-name">Deutsch</span></a>
                  </li>
                  <li class="dropdown-item">
                    <a><span class="lang-name">Arabic</span></a>
                  </li>
                  <li class="dropdown-item">
                    <a><span class="lang-name">Spanish</span></a>
                  </li>
                </ul>
              </li> -->
            </ul>
          </div>
          <!--/.nav-collapse -->
        </div>
        <!-- /.container-fluid -->
      </nav>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      user: {},
      errors: [],
    };
  },

  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
