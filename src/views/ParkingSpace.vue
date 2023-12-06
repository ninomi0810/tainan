<script>
import { watch,toRaw} from 'vue';
import { onMounted,ref } from 'vue';
import { mapState, mapActions } from 'pinia'
import api from '../stores/api.js'
import '../../node_modules/leaflet/dist/leaflet.css'
import L, { marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import counter2 from '../stores/counter'

import { RouterLink, RouterView } from 'vue-router'
export default {
   data() {
      return {
         obj: [],
         zoneList: [],
         spaceTypeList: [],
         carTypeList: new Map([
            ["汽車", "car"],
            ["機車", "moto"],
         ]),
         serchedData: [],
         string: "",
         map:null,
         mapMarker:[],
         latlngArray:[],
         latlng:"",
         latitude:"",
         longitude:"",
         directionsService:new google.maps.DirectionsService(),
         directionsDisplay: new google.maps.DirectionsRenderer(),
         request:"",
         mokutekichiString:[],
         stringOk:"",
         option:{
         enableHighAccuracy : true,   //是否開啟高精度抓取位置
         timeout : 1000,   //超過1秒的話當作逾時
         maximumAge : 0    //設定為0的話代表不會抓取快取，每次都需要實際抓取目前位置
         }, 
         // polyLine:"",
         // line:[
         //    [22.982574,120.183662]
         // ],
      }
   },
   computed: {
      ...mapState(api, ["parkingSpaceData"])    //匯入pinia的變數
   },
   methods: {
      ...mapActions(api, ["getParkingSpaceData"]),
      ...mapActions(counter2,["setLocation"]),


      initMap(){     //函式_地圖初始化
         this.map=new google.maps.Map(document.getElementById("map"),{  //設定地圖顯示的div
            center: { lat: 22.982574, lng: 120.183662 }, //設定地圖起始中心點
            zoom:13,    //設定預設縮放尺寸
            maxZoom:20, //設定縮放最大尺吋
            streetViewControl: false,  //是否有黃色小人
            mapTypeControl: false,  //是否可切換地圖類型
         });
      },

      getUserLocation(){   //函式_取得使用者當前位置
         if(navigator.geolocation){    //判斷瀏覽器是否有支援
            //透過getCurrentPosition方法取得目前位置的經緯度，成功後執行success函式、失敗的話執行error函式，this.option為詳細設定
            navigator.geolocation.getCurrentPosition(this.success,this.error,this.option);  
            }
         else{
            console.log("您的瀏覽器不支援，請使用其他瀏覽器");
         }
      },
      showUserLocation(){  //函式在地圖上顯示使用者目前位置
         this.clearMarkerAndRoute();
         this.getUserLocation(); //先透過getUserLocation函式取得目前位置的經緯度
         setTimeout(() => {
            this.mapMarker.push(new google.maps.Marker({    //將相關參數放到mapMarker陣列
               position:this.latlng,   //要放置標誌的位置經緯度
               map:this.map,        //要在哪個地圖上顯示標誌
            }));
         }, 200);
         setTimeout(() => {
            this.map.panTo(this.latlng);  //將畫面中心變為使用者當前位置，並移動過去
         }, 210);
      },
      clearMarkerAndRoute(){  //清除標記和路線
         //Google MAP API手冊的清除方法似乎是vue2的寫法，在vue3將Marker物件儲存在陣列時，Vue3會將它轉為Proxy物件，這導致在呼叫setMap()方法時，其實是在呼叫Proxy.setMap(null)。
         //或許是因為這個Proxy物件並不===我們原先儲存的Matker物件，總之就是setMap()方法呼叫失敗，清除不了。
         //找到的解法是必須使用Vue的toRaw()去轉換Proxy物件，再去呼叫setMap()方法。
         this.mapMarker.map((marker)=> toRaw(marker).setMap(null));  //清除標記，避免有多處當前位置的標誌
         this.directionsDisplay.setMap(null);   //清除路線，避免先點導航再點"回到目前位置"的話會有路線在地圖上
      },
      route(mokutekichi){  //設定當前位置到目標地的導航路線
         this.clearMarkerAndRoute();
         this.getUserLocation();    
            this.mokutekichiString = mokutekichi.split(",");   //將點選到的目的地經緯度依照標點符號切開並放到陣列裡面
            // this.stringOk = {lat:parseFloat(this.string[0]),lng:parseFloat(this.string[1])}; //將字串轉型、組合成可使用的參數
            this.request = {  //組合route可使用的參數
            origin: {lat:this.latitude, lng:this.longitude}, //起始點經緯度，即當前位置
            destination: {lat:parseFloat(this.mokutekichiString[0]),lng:parseFloat(this.mokutekichiString[1])}, //將字串轉型、組合成可使用的目的地經緯度參數
            travelMode: 'DRIVING', //移動方式選為開車
            };
            this.directionsService.route(this.request,(response)=>{  //呼叫route函式，送出路線規劃請求
            this.directionsDisplay.setMap(this.map)   //設定路線顯示在哪個地圖
            this.directionsDisplay.setDirections(response) //設置一條有效的路線並顯示出來
         })
      },
      success(position){ //函式_取得當前位置成功時
         console.log("取得位置成功");
         this.latitude = position.coords.latitude;    //取出緯度放入變數
         this.longitude = position.coords.longitude;   //取出經度放入變數
         this.latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //組合成api可使用的參數
         // this.map.setView([position.coords.latitude,position.coords.longitude],13)  //OpenStressMap + leaflet的寫法
         // this.mapMarker = L.marker([position.coords.latitude,position.coords.longitude]).addTo(this.map);
         // this.line.push([position.coords.latitude,position.coords.longitude])
         // this.polyLine = L.polyline(this.line).addTo(this.map);
         // this.map.flyTo([position.coords.latitude,position.coords.longitude],13)
      },
      error(position){  //函式_取得當前位置失敗時
         console.log("取得位置失敗");
      },
      search() { //函式_篩選資料
         let zoneSelected = zoneSelect.value; 
         let spaceTypeSelected = spaceTypeSelect.value;
         let carTypeSelected = carTypeSelect.value
         //使用三元運算符組裝字串
         this.string = (zoneSelected ? "zoneSelected == item.zone" : "") + (spaceTypeSelected ? "&&spaceTypeSelected == item.typeName" : "") + (carTypeSelected ? "&&item." + carTypeSelected + ">0" : "")
         this.string = (this.string.startsWith("&&") ? this.string.slice(2) : this.string) //如果開頭是&&的話，將開頭的&&刪掉
         this.serchedData = [] //清空serchedData陣列，避免前一次篩選的資料存在
         this.parkingSpaceData.data.forEach(item => { //進行篩選，並取出要使用的資料
            //3種條件需要做事的組合有7種，原本想用switch寫，但我想寫得簡短一點，所以我使用了eval方法將我組裝的字串轉為可執行的條件式，但這個eval方法容易在資安方面造成問題，謹慎使用
            if (eval(this.string)) {
               this.serchedData.push({ name: item.name, typeName: item.typeName, zone: item.zone, address: item.address, carDis: item.carDis, car: item.car, carGreen: item.carGreen, carWoman: item.carWoman, largeCar: item.largeCar, moto: item.moto, motoDis: item.motoDis, chargeTime: item.chargeTime, position: item.lnglat})
            }
         });
         console.log(this.serchedData);
      },
   },
   created() {
      this.getParkingSpaceData();  //透過api獲取資料
      watch(() => this.parkingSpaceData, () => {         //偵測到變數內容的值被改變時，將下拉選單的內容產生出來
         this.parkingSpaceData.data.forEach(item => {
            if (item.zone != undefined && !this.zoneList.includes(item.zone)) {  //抓取"地區"的陣列
               this.zoneList.push(item.zone);
            }
            if (item.typeName != undefined && !this.spaceTypeList.includes(item.typeName)) { //抓取"停車場類型"的陣列
               this.spaceTypeList.push(item.typeName);
            }
         });
         this.showUserLocation(); //建立時先抓取一次使用者目前的位置
      })
   },
   mounted() {
      // this.map = L.map('map').setView([22.982574,120.183662],13)
      //    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      //    maxZoom:20,
      //    attribution: '© OpenStreetMap'
      // }).addTo(this.map)
      this.initMap(); //初始化地圖
      this.setLocation(5)
   }
}



</script>
<template>
   <div class="outer">
      <div class="left">
         <div  id="map" class="map"></div>
         <button class="positionNow" @click="showUserLocation()">回到目前位置</button>
      </div>
      <div class="right">
         <div class="rightTop">
            <div class="rightSelectArea">
               <select class="select" id="zoneSelect" @change="search()">
                  <option value="">請選擇地區</option>
                  <option v-for="item in zoneList">{{ item }}</option>
               </select>
               <select class="select" id="spaceTypeSelect" @change="search()">
                  <option value="">請選擇停車場類型</option>
                  <option v-for="item in spaceTypeList">{{ item }}</option>
               </select>
               <select class="select" id="carTypeSelect" @change="search()">
                  <option value="">請選擇車位類型</option>
                  <option v-for="item in carTypeList" :value="item[1]">{{ item[0] }}</option>
               </select>
            </div>
         </div>
         <div class="rightBottom">
            <div class="rightDataShowArea">
               <!-- 透過v-for，將篩選出來的資料，一筆一筆顯示在設定的版型上 -->
               <div v-for="item in serchedData" class="dataArea"> 
                  <div class="dataAreaOne">
                     <div class="dataAreaOneLeft">
                        <span class="text">停車場名字：</span>
                        <span class="text">{{ item.name }}</span>
                     </div>
                     <div class="dataAreaOneRight">
                        <span class="text">停車場類型：</span>
                        <span class="text">{{ item.typeName }}</span>
                     </div>
                  </div>
                  <div class="dataAreaTwo">
                     <div class="dataAreaTwoLeft">
                        <span class="text">地址：</span>
                        <span class="text">{{ item.address }}</span>
                     </div>
                     <div class="dataAreaTwoRight">
                        <button  class="btnRoute" @click="route(item.position)">導航到此</button>
                     </div>
                  </div>
                  <div class="dataAreaThree">
                     <span class="text psText">剩餘汽車車位：{{ item.car }}　　　剩餘機車車位：{{ item.moto }}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
.outer {
   height: 85vh;
   width: 100vw;
   background-color: #FEFCF3;
   display: flex;
   .left {
      height: 86%;
      width: 50%;
      margin-top: 1.5%;
      margin-left: 2%;
      margin-right: 1.5%;
      .map { 
      height: 100%;
      width: 100%;
      }
      .positionNow{
      height: 33px;
      width: 122px;
      margin-top: 1%;
      border-radius: 20px;
      border:0px;
      background-color: #F0DBDB;
      color: #DBA39A;
      font-weight:bold;

      }
   }

   .right {
      height: 100%;
      width: 50%;

      .rightTop {
         height: 20%;
         width: 100%;
         display: flex;
         justify-content: center;
         align-items: center;

         .rightSelectArea {
            height: 60%;
            width: 90%;
            border-radius: 20px;
            background-color: #F0DBDB;
            display: flex;
            align-items: center;

            .select {
               margin-left: 30px;
               margin-right: 15px;
               height: 40%;
               width: 35%;
               border-radius: 20px;
               text-align: center;
               background-color: #F5EBE0;
            }
         }
      }

      .rightBottom {
         height: 75%;
         width: 100%;
         display: flex;
         justify-content: center;
         align-items: center;

         .rightDataShowArea {
            height: 100%;
            width: 90%;
            border-radius: 20px;
            background-color: #F0DBDB;
            overflow: scroll;
            .dataArea {
               height: 25%;
               width: 90%;
               background-color: #F5EBE0;
               margin-top: 2%;
               margin-bottom: 2%;
               margin-left: 5%;
               .dataAreaOne{
                  height: 20%;
                  display: flex;
                  margin-top: 1%;
                  .dataAreaOneLeft{
                     width: 65%;
                     display: flex;
                     justify-content: start;
                     margin-left: 2%;
                  }
                  .dataAreaOneRight{
                     width: 35%;
                     display: flex;
                     justify-content: end;
                     margin-right: 3%;
                  }
               }
               .dataAreaTwo{
                  height: 40%;
                  margin-top: 2%;
                  margin-left: 2%;
                  display: flex;
                  .dataAreaTwoLeft{
                     display: flex;
                     justify-self: start;
                     width: 80%;
                  }
                  .dataAreaTwoRight{
                     margin-top: 0.5%;
                     width: 20%;
                     .btnRoute{
                     height: 32px;
                     width: 82px;
                     border-radius: 20px;
                     border:0px;
                     background-color: #F0DBDB;
                     color: #DBA39A;
                     font-weight:bold;
                  }
                  }
               }
               .dataAreaThree{
                  height: 20%;
                  margin-top: 1%;
               }
               .text {
                  margin-top: 10px;
                  margin-bottom: 3px;
                  font-size: 14px;
               }
               .psText{
                  color: red;
               }
            }
         }
      }
   }
}

// path {
//    // stroke: white;
//    transition: 0.5s;
//    cursor: pointer;
// }

// path:hover {
//    fill: rgb(255, 215, 0);
//    transform: translate(-5px, -5px);
// }</style>