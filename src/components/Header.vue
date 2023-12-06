<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import counter from '../stores/counter'
export default {
    data() {
        return {

        }
    },
    components: {
        RouterLink,
    },
    computed: {
        ...mapState(counter, ["location"])
    }
}
</script>

<template>
    <div class="headerShow">
        <div class="box">
            <RouterLink to="/" class="header" :class="{ 'cass': this.location === 1 }">Home</RouterLink>
        </div>
        <div class="box">
            <RouterLink to="/Person" class="header" :class="{ 'cass': this.location === 2 }">
                <p>人口</p>
            </RouterLink>
        </div>
        <div class="box">
            <RouterLink to="/res" class="header" :class="{ 'cass': this.location === 3 }">
                <p>餐廳</p>
            </RouterLink>
        </div>
        <div class="box">
            <RouterLink to="/Attration" class="header" :class="{ 'cass': this.location === 4 }">
                <p>景點</p>
            </RouterLink>
        </div>
        <div class="box">
            <RouterLink to="/ParkingSpace" class="header" :class="{ 'cass': this.location === 5 }">
                <p>停車位</p>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.headerShow {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #F0DBDB;

    display: flex;
    justify-content: space-around;
    align-items: center;

    .box {
        height: 100%;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        // border: black 1px solid;
    }
    
    .header {
        // border: black 1px solid;
        color: #DBA39A;
        font-size: 32px;
        text-decoration: none;
        z-index: 9;
        transition: 0.5s;
    }
    .header :hover{
        transition: 0.5s;
        // background-color: #DBA39A;
        color: #A8645A;
    }
    .cass {
        height: 100%;
        width: 100%;
        background-color: #DBA39A;
        color: #F0DBDB;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.7s;
    }
}
</style>