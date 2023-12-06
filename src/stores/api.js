import {defineStore} from 'pinia';
import L from 'leaflet';

export default defineStore("counter",{
    // setup(){
    //     map=L.map('map').setView([22.9944063,120.1858614],13);
    //     L.map('map').setView([22.9944063,120.1858614],13);
    //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //             zoomControl: true , //是否要縮放的按鈕
    //             }).addTo(map);
    // },
    state(){
        return{
        obj:[],
        resInfo:{}, //放餐廳資訊陣列
        where: [], //放區的陣列
        syurui: [], //放種類的陣列
        searchedData: [], //放資料的陣列
        string:"", //各國語言的變數
        parkingSpaceData:[],
        }
    },
    
    getters:{
    
    },
    
    actions:{

        getParkingSpaceData(){
            fetch('https://opengov.tainan.gov.tw/OpenApi/api/service/get/c3604e1d-c4e1-4224-9d41-084ce299c3bf')
            .then(response => response.json())
            .then(data => {                
            this.parkingSpaceData = data;
            console.log(this.parkingSpaceData);          
            })
        },
         //根據語言抓取行政區的資料
        getList1(lenguage1){ //這邊要先篩選選取的語言 
            switch(lenguage1){ //使用switch判別式 有以下三種選項 中文 日文和韓文
                case  "chinese": //不同的結果the string會等於不同的資料
                this.string = "../json/food.json"
                    break;
                case "japanese":
                this.string = "../json/foodJp.json"
                    break;
                case "korean":
                    this.string = "../json/foodKr.json"
                    break;
            }
            
                this.where=[]; //行政區資料陣列 每一次展開下拉選單的時候會清空資料
                //再來提取上方已經篩選好該語言的對應資料
            fetch(this.string)
                .then(response => response.json())
                .then(deta => {
                    this.obj = deta;
                    this.obj.forEach(item => { //用foreach將需要的資訊放入where陣列
                        // console.log(item.district)
                        if (!this.where.includes(item.district)) { //不包含再加入 避免重複
                            this.where.push(item.district)
                        }
                    })
                    
                    // console.log(this.obj)
                    // console.log(this.where)
                    // console.log(this.syurui)
                }
                )
        },
        //根據語言抓取種類的資料   
        getList2(lenguage1){
            this.string="";
            switch(lenguage1){
                case  "chinese":
                this.string = "../json/food.json"
                    break;
                case "japanese":
                this.string = "../json/foodJp.json"
                    break;
                case "korean":
                    this.string = "../json/foodKr.json"
                    break;
            }
                this.syurui=[]; //種類陣列
            fetch(this.string)
                .then(response => response.json())
                .then(deta => {
                    this.obj = deta;
                    this.obj.forEach(item => {
                        for (let i = 0; i < item.category.length; i++) {
                            // console.log(item.category)
                            if (!this.syurui.includes(item.category[i])) {
                                this.syurui.push(item.category[i])
                            }
                        }
                    })
                    // console.log(this.obj)
                    // console.log(this.where)
                    // console.log(this.syurui)
                }
                )
        },
        getData_res(lenguage1,whereA,syuruiA){
            this.string="";
            this.searchedData=[];
            switch(lenguage1){
                case  "chinese":
                this.string = "../json/food.json"
                    break;
                case "japanese":
                this.string = "../json/foodJp.json"
                    break;
                case "korean":
                    this.string = "../json/foodKr.json"
                    break;
            }
            //單獨選擇行政區 / 單獨選擇種類 / 選擇行政區又選擇種類得出3種的結果 
            if(this.string != ""){
            fetch(this.string)
                .then(response => response.json())
                .then(deta => {
                    this.resInfo = deta;
                    console.log(this.resInfo);
                })
                switch(true){ //一次只會做一種 得出一個結果
                    case whereA != "" && syuruiA =="": //只有選擇行政區的結果
                        // console.log(whereA,syuruiA);
                        // this.searchedData.push(["a","b","c"])
                        this.obj.forEach( item =>{ //遍歷放入行政區的美食餐廳資訊
                            if(whereA == item.district){
                                this.searchedData.push({name:item.name, tel:item.tel, openTime:item.open_time, address:item.address})
                            }
                        })
                        console.log(this.searchedData);
                    break;
                    case whereA == "" && syuruiA != "": //只有選擇種類的結果
                        this.obj.forEach( item =>{
                            if(syuruiA == item.category){ //遍歷放入種類的美食餐廳資訊
                                this.searchedData.push({name:item.name, tel:item.tel, openTime:item.open_time, address:item.address})
                            }
                        })
                        console.log(this.searchedData);
                    break;
                    case whereA != "" && syuruiA != "": //選擇行政區又選擇種類的結果
                        this.obj.forEach( item =>{
                            if(whereA == item.district && syuruiA == item.category) //變歷放入行政區和種類對應的美食餐廳資訊
                            this.searchedData.push({name:item.name, tel:item.tel, openTime:item.open_time, address:item.address})
                        })
                        // console.log(this.searchedData);
                    break;
            }
            }
        },
        // getData_resJp(){
        //     fetch("https://opengov.tainan.gov.tw/OpenApi/api/service/get/c2ee0901-af20-4306-a56a-a3eab95bd24f")
        //         .then(response => response.json())
        //         .then(deta => {
        //             this.resJpInfo = deta;
        // })
        // },
        // getData_resKr(){
        //     fetch("https://opengov.tainan.gov.tw/OpenApi/api/service/get/7a833dba-017b-4f63-87fa-7922c83708bc")
        //         .then(response => response.json())
        //         .then(deta => {
        //             this.resKrInfo = deta;
        // })
        // },
    }
    })
