<template>
  <div id="app" style="display: flex">
    <!--창 크기에 따라 없애주면 좋을듯-->
    <div>
      <div class="selectBox" v-for="(btn, idx) in nButton" :key="idx">
        <p>{{btn}}</p>
        <button class="difficultyBtn" v-for="diff in 3" :key="diff" v-on:click="setPage(diff+idx*3-1)">{{12+diff}}LV</button>
      </div>
      <div class="selectBox">
        <p>커스텀 서열표</p>
        <p>{{test}}</p>
        <button class="difficultyBtn" v-on:click="setPage(12)">만들자</button>
      </div>
      <button v-on:click="saveScreenShot">캡쳐</button>
      <br>
      <img class="gradeSelect" :src="require('@/assets/img/etc/gradeSelect.webp')" alt="망이"/>
    </div>
    <div ref="capture">
      <!--페이지를 넘기는 기능과 페이지에 맞는 타이틀 이미지를 추가하자-->
      <div class="boardTitle boardImage"/>
      <board-template v-show="!isCustomBoard"/>
      <custom-board v-show="isCustomBoard"/>
    </div>
    <create-custom-thumbnail class="createBox" v-if="isCustomBoard" :songs="songList"/>
  </div>
</template>

<script>
import createCustomThumbnail from './components/create-custom-thumbnail.vue'
export default {
  name: 'App',
  components: {
    createCustomThumbnail
  }
}
</script>
<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import html2canvas from "html2canvas";
import axios from "axios"
import BoardTemplate from "./components/boardTemplate";
import CustomBoard from "./components/custom-board";
import {useStore} from "vuex";
import localforage from "localforage";

const store = useStore()
const boardTitle = ['4B 13LV', '4B 14LV', '4B 15LV',
  '5B 13LV', '5B 14LV', '5B 15LV',
  '6B 13LV', '6B 14LV', '6B 15LV',
  '8B 13LV', '8B 14LV', '8B 15LV']
let currentPage = ref(11)
const nButton = ['4B', '5B', '6B', '8B']
const capture = ref(null)
let songList = Array
const test = ref(window.innerWidth)

onMounted(()=>{
  axios.get('/song-list').then(result => {
    songList = result.data
  }).catch(error => alert(error))
  //페이지 크기 감지를 위한 이벤트
  window.addEventListener('resize', reactiveWidth)
  //스토리지 설정을 위한 unload 이벤트
  window.addEventListener('beforeunload', setStorage)
  //저장된 스토리지가 있다면 받아오기
  localforage.getItem('saveUserBoard').then((userInfo)=>{
    store.commit('staticBoard/initBoard', userInfo)
  })
  localforage.getItem('saveCustomBoard').then((saveCustomBoard)=>{
    store.commit('customBoard/initBoard', saveCustomBoard)
  })
})
onBeforeUnmount(()=> {
  window.removeEventListener('resize', reactiveWidth)
  window.removeEventListener('beforeunload', setStorage)
})
//스토리지에 유저가 작성한 서열표 정보를 담아둡니다
const setStorage = function () {
  const board = store.getters['staticBoard/board']
  const userInfo = []
  //보드를 둘러보며 judgement가 수정된것이 있다면 저장합니다
  for(let i in board){
    for(let j in board[i]){
      for(let k in board[i][j]){
        if(board[i][j][k].judgement)// i, id, judgement 저장?
          userInfo.push({idx: i, id: board[i][j][k].id, judgement: board[i][j][k].judgement})
      }
    }
  }
  localforage.setItem('saveUserBoard', userInfo)
  //커스텀 서열표 정보를 저장합니다
  //이유는 모르겠으나 깊은 복사로 하지않으면 들어가지 않습니다
  localforage.setItem('saveCustomBoard', JSON.parse(JSON.stringify(store.getters['customBoard/difficultyBoard'])))
}

/*서열표 캡쳐*/
const saveScreenShot = () => {
  html2canvas(capture.value).then(canvas => {
    let link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = boardTitle[currentPage.value] + '.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }).catch((error) => {
    alert(error)
  })
}
/*서열표 전환*/
const setPage = (page) => {
  currentPage.value = page
  store.commit('staticBoard/setPage', page)
}

const isCustomBoard = computed(()=> {
  return currentPage.value === 12
})

const reactiveWidth = function () {
  test.value = window.innerWidth
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.selectBox{
  width: 200px;
  margin: 10px 0;
}
.difficultyBtn{
  margin: 0 5px;
}
</style>
<style src="./style/difficultyBoard.css"></style>