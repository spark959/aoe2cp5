<template>
  <div class="home">

<div class="topCont">
<h1>Age of Empires II HD Edition Information site</h1>
<h2>Here you will find all that you need to defeat the enemy</h2>
</div>

  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="/images/AOE2bck.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/images/aoe2gameplayboat.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/images/aoe2gameplayInfantry.jpg" alt="Third slide">
        </div>
      </div>

      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>

      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {
  }
};
</script>

<style>

  body {
    font-family: 'Felipa', cursive;
    background-image:url(/images/rockywall.png);
    text-align: center;
    color: #000000;
  }

  .topCont {
    margin-top: 15px;
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
