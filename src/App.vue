<template>
  <div id="app">
    <div id="nav">
      <img src="/images/aoe2icon.png" style="display: inline-block;">
      <router-link to="/">Home</router-link> |
      <router-link to="/units">Unit Information</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Felipa', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image:url(/images/rockywall.png);
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding-right: 20px;
  background-color: #000000 !important;
  text-align: left;
}

#nav a {
  text-decoration: none;
  padding-left: 20px;
  font-weight: bold;
  color: rgba(255,255,255,.5);
}
#nav a:hover {

}

#nav a.router-link-exact-active {
  color: #fff;
}

#nav img{
  margin-left: 15px;
  width: 60px;
  height: 60px;
}

#carouselExampleControls {
  position: relative;
  left: 5%;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.carousel-inner {
  width: 100% !important;
  height: 550px !important;
}

.carousel-inner img{
  width: 100%;
  height: 100%;
}

footer a{
  text-decoration: none;
  color: #000000;
}
</style>
