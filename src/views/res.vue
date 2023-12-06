<script>
import { mapState, mapActions } from 'pinia';
import counter from '../stores/api'
import { RouterLink, RouterView } from 'vue-router'
import counter2 from '../stores/counter'
export default {
    data() {
        return {
            // obj: [],
            // where: [],
            // syurui: [],
            // searchedData: {},
            language: "chinese", //預設語言為中文
        }
    },
    computed: {
        ...mapState(counter, ["resInfo", "where", "syurui", "searchedData"])
    },
    methods: { //把會重複運用到的方法放在methods 集中管理
        ...mapActions(counter, ["getData_res", "getList1", "getList2"]),//提取pinia的寫法
        ...mapActions(counter2,["setLocation"]),

        text() { //方法 抓取getList1
            this.getList1(this.language)
        },
        text1() {
            this.getList2(this.language)
        },
        setLanguage(value) { 
            this.language = value; //修改判斷語言的變數
            console.log(this.language);
            // this.language = num;
        },
        whereandsyurui() {
            // console.log(whereA.value);
            // console.log(syuruiA.value);
            let whereA = where.value;
            let syuruiA = syurui.value;
            this.getData_res(this.language, whereA, syuruiA);
        },
    },
    mounted(){
        this.setLocation(3)
    },
}

// }
</script>
<template>
    <div class="main">
        <div class="left">
            <div class="leftUp">
                <!-- 選取語言區塊 -->
                <div class="kotoba">
                    <!-- 利用 v-on 點擊啟用setLanguage方法  -->
                    <label for="" class="labelCss">中文</label>
                    <input type="radio" name="languageBTN" value="chinese" checked @click="setLanguage('chinese')">
                    <label for="" class="labelCss">日本語</label>
                    <input type="radio" name="languageBTN" value="japanese" @click="setLanguage('japanese')">
                    <label for="" class="labelCss">한국어</label>
                    <input type="radio" name="languageBTN" value="korean" @click="setLanguage('korean')">
                </div>
                <div class="foodSyoukai">
                    <div class="foodSyoukaiPic">
                        <div class="pic1">
                            <a
                                href="https://www.twtainan.net/zh-tw/shop/consumelist?query=%25e6%25a3%25ba%25e6%259d%2590%25e6%259d%25bf&page=1">
                                <div class="usoDiv1"></div>
                            </a>
                        </div>
                        <div class="setsumei test1">
                            <p class="foodP">棺材板<br>シチュー入り揚げパン<br>스튜 튀김 빵</p>
                            <!-- 詳細接紹 插入bootstrap互動視窗 -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#a">
                                read more
                            </button>

                            <!-- 內頁內容 id要分別改不同的 預設值會綁在同樣的 -->
                            <div class="modal fade" id="a" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">about 棺材板</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            棺材板的作法是先將吐司炸後中間挖空，另外以炒香的麵粉加洋蔥、高湯、奶水、雞肉、墨魚等食材，成了內餡，先吃的棺材蓋，再吃內餡。此點心因形狀很像棺材板，所以即以棺材板命名。
                                            48年時正式命名這種點心為「棺材板」。
                                            <br><br>シチュー入り揚げパン(棺材板)の作り方は、まずトーストを焼いて真ん中をくり抜き、玉ねぎ、だし汁、牛乳、鶏肉、イカなどを小麦粉で炒めて詰め物を作り、棺の蓋を先に食べてから食べます。詰め物。形が棺の板に似ていることから、このスナックの名前が付けられました。1948年、このスナックは正式に「棺材板」と名付けられました。
                                            <br><br>관판을 만드는 방법은 토스트를 먼저 튀겨 가운데를 비운 후 양파, 육수, 우유, 닭고기, 오징어 등의 재료를 볶은 밀가루와
                                            함께넣어 속을 채우는 것으로, 관 뚜껑을 먼저 먹은 다음, 충전물. 모양이 관판과 닮았다고 해서 관판이라는 이름이 붙은 과자입니다. 1948년에
                                            이스낵은 공식적으로 "관판"으로 명명되었습니다.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="foodSyoukaiPic">
                        <div class="setsumei test2">
                            <p class="foodP">牛肉湯<br>ビーフスープ<br>쇠고기 수프</p>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#b">
                                read more
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="b" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel"> about 牛肉湯</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            臺南牛肉湯 流行於臺南市的小吃。 特色在於使用當日清晨宰殺的新鮮溫體牛肉，全程不冷凍。 只用臺灣的本土牛肉作為材料，因為國外的牛肉經過長時間運送、
                                            冷藏，口感無法和新鮮牛肉相提並論。

                                            <br><br>台南牛肉湯は台南市で人気のグルメです。特徴は、全工程を冷凍しておらず、早朝に屠殺された新鮮な温かい牛肉を使用していることです。外国産牛肉は長時間冷蔵輸送されているため、原料となる牛肉は台湾産の国産牛肉のみを使用しており、その美味しさは生の牛肉とは比べものになりません。

                                            <br><br>타이난 쇠고기 수프는 타이난 시의 인기 간식입니다. 새벽에 도축한 신선하고 따뜻한 쇠고기를 사용하며, 전 과정을 얼리지 않는 것이
                                            특징이다. 외국산 쇠고기를 오랫동안 운송하여 냉장보관한 탓에 대만산 쇠고기만을 재료로 사용하고, 그 맛은 신선한 쇠고기와 비교할 수 없습니다.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pic2">
                            <a href="https://www.twtainan.net/zh-tw/shop/consumelist?query=%E7%89%9B%E8%82%89%E6%B9%AF">
                                <div class="usoDiv2"></div>
                            </a>
                        </div>
                    </div>
                    <div class="foodSyoukaiPic">
                        <div class="pic3">
                            <a
                                href="https://www.twtainan.net/zh-tw/shop/consumelist?query=%25e8%259d%25a6%25e6%258d%25b2&page=1">
                                <div class="usoDiv3"></div>
                            </a>
                        </div>
                        <div class="setsumei test3">
                            <p class="foodP">蝦捲<br>エビの包み揚げ<br>새우 튀김 </p>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#c">
                                read more
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="c" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">about 蝦捲</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            蝦捲最早的起源已不可考據，但也曾流傳有一說，蝦捲由明朝鄭成功與其軍隊來台灣時，由軍隊士兵帶入的福州小吃肉捲演變而來，這肉捲有高麗菜、肉末、蔥等食材，來到台灣後，由於台南周邊海域豐富海鮮，後來開始將蝦仁運用入捲中。

                                            <br><br>蝦捲(エビの包み揚げ)の最古の起源は不明ですが、明の時代に鄭成功とその軍隊が台湾に来たときに陸軍兵士が持ち込んだ福州スナックのミートロールから発展したという噂があります。このミートロールにはキャベツ、具材などが含まれています。台湾にはひき肉とネギが伝わり、台南近海は魚介類が豊富だったため、エビを巻き物に使うようになりました。

                                            <br><br>새우말이의 최초 유래는 알려져 있지 않으나, 명나라 정성공(鄭成功)과 그의 군대가 대만에 왔을 때 군병들이 가져온 푸저우(富州)
                                            스낵 고기말이에서 발전했다는 소문이 있다. 다진 고기와 파가 대만에 들어왔고, 타이난 주변 바다에는 해산물이 풍부하여 새우를 롤에 사용하기
                                            시작했습니다.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src="../img/777777.png" alt="" class="foodPic">
        </div>
        <div class="right">
            <div class="up">
                <!-- focus點擊後就會帶入資料 啟用text方法 抓取行政區資料-->
                <!-- 如果下拉選單change就會啟用whereandsyurui方法 篩選所有行政區 -->
                <select id="where" @focus="text()" @change="whereandsyurui()" class="choose1">
                    <option value="">行政區/行政区/행정구역</option>
                    <!-- 利用v-for把抓出來的行政區直接丟到select裡面 -->
                    <option v-for="item in this.where">{{ item }}</option>
                </select>
                <!-- focus點擊後就會帶入資料 啟用text2方法 抓取種類資料-->
                <!-- 如果下拉選單change就會啟用whereandsyurui方法 篩選所有種類-->
                <select id="syurui" @focus="text1()" @change="whereandsyurui()" class="choose2">
                    <option value="">種類/種類/유형</option>
                    <option v-for="item in this.syurui">{{ item }}</option>
                </select>
                <img src="../img/小車車.png" alt="" class="car">
                <p class="gogoP"> 　Welcome to Tainan</p>
                <img src="../img/1212-PhotoRoom.png-PhotoRoom.png" alt="" class="station">
            </div>
            <div class="down">
                <!-- 利用v-for把篩選出來的資料依照版型顯示出來 -->
                <ul v-for="item in this.searchedData"> 
                    <div class="infoSq">
                        <div class="infoUp">
                            <i class="fa-solid fa-minus "></i>
                            <i class="fa-regular fa-window-restore "></i>
                            <i class="fa-solid fa-xmark "></i>
                        </div>
                        <div class="infoDown">
                            <div class="resName">
                                <p class="nameP">{{ item.name }}</p>
                            </div>
                            <div class="dright">
                                <div class="resTel">
                                    <p>{{ item.tel }}</p>
                                </div>
                                <div class="resOpentime">
                                    <p>{{ item.openTime }}</p>
                                </div>
                                <div class="resAddress">
                                    <p>{{ item.address }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nameP {
    font-size: 15px;
    font-weight: bold;
}

p {
    font-size: 13px;
    color: black;
}

.btn-primary {
    background-color: #E4D0D0;
    border: 1pt solid #E4D0D0;

}

.btn-primary1 {
    background-color: #E4D0D0;
    color: aliceblue;
    border: 1pt solid #E4D0D0;
}

.btn-secondary {
    background-color: #a0736c ;
    border: 1pt solid #E4D0D0;
    margin-right: 200px;
}
.modal-content{
    background-color: #E4D0D0;
}

.foodP {
    font-size: 10pt;
    margin: 6px;
    color: #E4D0D0;
}
.modal-title{
    color:#a0736c;
    font-weight: bold;
    margin-left: 170px;
}
.modal-body{
    background-color: #fff0f0;
    color: #a0736c;
}


.fa-minus {
    font-size: 9px;
    margin-top: 3px;
    margin-left: 410px;
}

.fa-window-restore {
    font-size: 9px;
    margin-top: 2px;
    margin-left: 5px;
}

.fa-xmark {
    font-size: 9px;
    margin-top: 2px;
    margin-left: 5px;
}

.choose1 {
    height: 25px;
    width: 180px;
    border-radius: 10px;
    border: 1pt solid gray;
    background-color: #F0DBDB;
    text-align: center;
    margin-left: 10px;
    color: gray;

}

.choose2 {
    height: 25px;
    width: 150px;
    border-radius: 10px;
    border: 1pt solid gray;
    background-color: #F0DBDB;
    text-align: center;
    margin-left: 5px;
    color: gray;
}

.labelCss {
    margin-left: 5px;
    color: gray;
}

.station {
    width: 200px;
    height: 220px;
    margin-bottom: 40px;
}

.car { //會動的車車
    position: absolute; //固定在畫面上
    width: 35px;
    height: 27px;
    margin-top: 58px;
    margin-left: 300px;
    animation-name: runCar; //設定動畫名字
    animation-duration: 7s; //動畫時間
    animation-iteration-count: infinite; //重複次數
}
//動畫設定
@keyframes runCar {
    from {
        right: 15%; //從右邊15%到右邊38%
    }

    to {
        right: 38%;
    }
}

.gogoP{ //會動的字
    position: absolute;
    width: 200px;
    height: 27px;
    margin-top: 80px;
    animation-name: runP;
    animation-duration: 7s;
    animation-iteration-count: infinite;
}
@keyframes runP {
    from {
        right: 0%;
    }

    to {
        right: 22%;
    }
    //整個過程到百分之幾的時候 字的顏色會怎麼呈現
    0%{
      color:transparent;
  }
  30%{
    color:transparent;
  }
  40%{
    color:transparent;
  }
  80%{
    color: white;
  }
  100%{
    color: white;

  }

}

.foodPic {
    width: 620px;
    height: 80px;

}

.main {
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: #FEFCF3;

    .left {
        height: 85%;
        width: 50%;
        margin-left: 18px;

    }

    .leftUp {
        height: 95%;
        width: 100%;
        background-color: #F5EBE0;
        border-radius: 5Pt;
        margin-top: 20px;
        border: 3px solid #E4D0D0;
    }

    .kotoba {
        width: 31%;
        height: 6%;
        background-color: #F0DBDB;
        display: flex;
        margin-left: 415px;
        margin-top: 10px;
        border-radius: 5pt;
        border: 1pt solid #DBA39A;
    }

    .foodSyoukai {
        width: 100%;
        height: 88%;
    }

    .foodSyoukaiPic {
        width: 100%;
        height: 30%;
        margin-top: 10px;
        display: flex;
    }

    .pic1 {
        width: 50%;
        height: 100%;
        background-image: url(../img/棺材板.jpg);
        background-repeat: round;
        border-radius: 10px;
        margin-left: 10px;
        border: 2pt solid #DBA39A;
    }

    .usoDiv1 {
        width: 100%;
        height: 100%;

        &:hover {
            transition: cubic-bezier(0.6, 0.04, 0.98, 0.335);
            border-radius: 7px;
            background-color: #E4D0D0;
            opacity: 0.6;
            display: flex;

            &::before {
                content: "Let Eat!!!";
                white-space: pre;
                margin-left: 105px;
                margin-top: 40px;
                font-size: 15pt;
                color: rgb(83, 80, 80);
                font-weight: bold;
            }
        }
    }

    .usoDiv2 {
        width: 100%;
        height: 100%;

        &:hover {
            transition: cubic-bezier(0.6, 0.04, 0.98, 0.335);
            border-radius: 7px;
            background-color: #E4D0D0;
            opacity: 0.6;
            display: flex;

            &::before {
                content: "Let Eat!!!";
                white-space: pre;
                margin-left: 105px;
                margin-top: 40px;
                font-size: 15pt;
                color: rgb(83, 80, 80);
                font-weight: bold;
            }
        }
    }

    .usoDiv3 {
        width: 100%;
        height: 100%;
        //滑鼠移過去會出現
        &:hover {
            transition: cubic-bezier(0.6, 0.04, 0.98, 0.335);
            border-radius: 7px;
            background-color: #E4D0D0;
            opacity: 0.6;
            display: flex;
            //偽元素
            &::before {
                content: "Let Eat!!!";
                white-space: pre;
                margin-left: 105px;
                margin-top: 35px;
                font-size: 15pt;
                color: rgb(83, 80, 80);
                font-weight: bold;

            }
        }
    }
    //A連結消除底線
    a {
        text-decoration: none
    }

    a:hover {
        text-decoration: none
    }

    ;

    .setsumei {
        width: 45%;
        height: 100%;
        margin-right: 10px;
        margin-left: 10px;
        border-radius: 10px;
        background-color: #DBA39A;
    }

    .pic2 {
        width: 50%;
        height: 100%;
        background-image: url(../img/牛肉湯.jpg);
        background-repeat: round;
        border-radius: 10px;
        border: 2pt solid #DBA39A;

    }

    .pic3 {
        width: 50%;
        height: 100%;
        background-image: url(../img/台南蝦捲.jpg);
        background-repeat: round;
        border-radius: 10px;
        margin-left: 10px;
        border: 2pt solid #DBA39A;
    }

    .right {
        height: 100%;
        width: 50%;

        .up {
            height: 18%;
            width: 90%;
            background-color: #DBA39A;
            border-radius: 5Pt;
            margin: 30px;
            margin-top: 20px;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: left;
            box-shadow: 0 3px 3px 0 gray;
        }

        .down {
            height: 70%;
            width: 90%;
            background-color: #F0DBDB;
            border-radius: 5Pt;
            margin-top: -23px;
            margin-left: 30px;
            padding: 10px;
            overflow-y: scroll;
            background-image: url(../img/安平古堡2_preview_rev_1.png);


        }

        .infoSq {
            height: 30%;
            width: 95%;
            background-color: #DBA39A;
            margin-left: 4px;
            border: 0.5px solid rgb(74, 69, 69);
        }

        .infoUp {
            height: 15%;
            width: 100%;
            background-color: #F5EBE0;
            display: flex;

        }

        .infoDown {
            height: 85%;
            width: 100%;
            display: flex;
            box-shadow: 0 3px 3px 0 gray;
        }

        .resName {
            height: 95%;
            width: 42%;
            background-color: #F5EBE0;
            border: 0.5px solid gray;
            border-radius: 15px;
            margin-top: 12px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .dright {
            height: 100%;
            width: 75%;
        }

        .resTel {
            height: 25%;
            width: 95%;
            background-color: #F5EBE0;
            border: 0.5px solid gray;
            border-radius: 5px;
            margin-top: 6px;
            margin-left: 10px;
        }

        .resOpentime {
            height: 25%;
            width: 95%;
            background-color: #F5EBE0;
            border: 0.5px solid gray;
            border-radius: 5px;
            margin-top: 3px;
            margin-left: 10px;
        }

        .resAddress {
            height: 25%;
            width: 95%;
            background-color: #F5EBE0;
            border: 0.5px solid gray;
            border-radius: 5px;
            margin-top: 4px;
            margin-left: 10px;
            margin-bottom: 3px;
        }
    }
}
</style>