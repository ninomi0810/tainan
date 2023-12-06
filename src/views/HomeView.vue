<script >
import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return {

    }
  },
  action: {
  },
  components: {
    RouterLink,
  },
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <div class="alll">
    <div class="tainan">
      <h1 class="h1">台南市相關資訊</h1>
    </div>

    <div class="all">

      <div class="one title">
        <button>
          <RouterLink to="/Person" class="header">
            <i class="fa-solid fa-user-large-slash"></i>
            人口
          </RouterLink>
        </button>
      </div>

      <div class="two title">
        <button>
          <RouterLink to="/res" class="header">
            <i class="fa-solid fa-utensils"></i>餐廳
          </RouterLink>
        </button>
      </div>

      <div class="three title">
        <button>
          <RouterLink to="/Attration" class="header">
            <i class="fa-solid fa-map-location-dot"></i>景點
          </RouterLink>
        </button>
      </div>

      <div class="four title">
        <button>
          <RouterLink to="/ParkingSpace" class="header">
            <i class="fa-solid fa-square-parking"></i>停車位
          </RouterLink>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.alll {
  width: 100%;
  height: 85vh;
  background-color: #F5EBE0;
  position: relative;
  z-index: 30;

  .tainan {
    position: absolute;
    top: -40px;
    width: 100%;
    height: 20%;
    z-index: 1000;

    .h1 {
      width: 100%;
      height: 100%;
      z-index: 1000;
      color: #DBA39A;
      font-size: 4em;
      text-align: center;
    }
  }

  .all {
    width: 100%;
    height: 90%;
    top: -20%;
    position: absolute;
    z-index: -1;
    background-color: #F5EBE0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .title {
      width: 18%;
      height: 70%;
      position: relative;

      button {
        transition: 0.3s;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 10px;
        top: 40%;
        border-radius: 20px;
        border: 1.7px solid #DBA39A;
        background-color: #FEFCF3;
        box-shadow: 1px 1px 4px rgba(20%, 20%, 40%, 0.5);

        .header {
          width: 100%;
          height: 100%;
          display: flex;
          text-decoration: none;
          color: #DBA39A;
          font-size: 2.5em;
          justify-content: center;
          align-items: center;
        }

        i {

          color: #DBA39A;
          font-size: 35px;
          position: absolute;
          bottom: 70%;
          left: 43%;
        }

        &:hover {
          scale: (1.15);
          background-color: #DBA39A;
          border: 1.7px solid #F5EBE0;

          .header {
            color: #F5EBE0;

          }

          i {
            color: #F5EBE0;
          }
        }
      }
    }


  }
}
</style>
