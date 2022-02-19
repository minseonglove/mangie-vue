<template>
  <div id="app">
    <header id="main_header">
      <div class="header_inner">
        <h1>
          <a href="/">
            <img :src="require('@/assets/img/etc/gradeSelect.webp')" alt="logo" class="logo">
          </a>
        </h1>
        <div class="header_right">
          <a id="allMenu" href="#" class="btn_all_menu">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </div>
      <div class="all_menu_wrap">
        <div class="all_menu_inner">
          <div class="diff_menu">
            <ul class="all_menu" v-for="(btn, idx) in nButton" :key="idx">
              <li>
                <span>{{btn}}</span>
                <ul class="depth2">
                  <li v-for="diff in 3" :key="diff" v-on:click="setPage(diff+idx*3-1)">
                    <span>{{12+diff}}LV</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <span v-on:click="setPage(12)">커스텀 서열표</span>
        </div>
      </div>
      <div id="allMenuWrapBg"></div>
    </header>
    <div id="main">
      <div>
        <p>{{test}}</p>
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
  const main = document.getElementById('main')
  const header = document.getElementById('main_header')
  main.style.setProperty('margin-top', 'calc(' + header.clientHeight + 'px +' + ' 7vh)')

  initMenu()
  initInfo()
  //페이지 크기 감지를 위한 이벤트
  window.addEventListener('resize', reactiveWidth)
})
onBeforeUnmount(()=> {
  window.removeEventListener('resize', reactiveWidth)
  window.removeEventListener('beforeunload', setStorage)
})
const initMenu = () => {
  const allMenu = document.getElementById('allMenu')
  const header = document.getElementById('main_header')
  const allBg = document.getElementById('allMenuWrapBg')

  allMenu.addEventListener('click', (event) => {
    event.preventDefault()
    if(String(header.classList) !== 'active'){
      header.className = 'active'
      allBg.className = 'active'
    }
    else{
      header.className = ''
      allBg.className = ''
    }
  })
}
const initInfo = () => {
  axios.get('/song-list').then(result => {
    songList = result.data
    // 곡의 파일 이름을 key로 갖고 곡의 실제 이름과 카데고리를 value로 갖는 map을 초기화
    store.dispatch('initSongInfo', songList)
  })//.catch(error => alert(error))
  // 스토리지 설정을 위한 unload 이벤트
  window.addEventListener('beforeunload', setStorage)
  //저장된 스토리지가 있다면 받아오기
  localforage.getItem('saveUserBoard').then((userInfo)=>{
    store.commit('staticBoard/initBoard', userInfo)
  })
  localforage.getItem('saveCustomBoard').then((saveCustomBoard)=>{
    store.commit('customBoard/initBoard', saveCustomBoard)
  })
}
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
  const menu = document.getElementById('allMenu')
  menu.click()
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
  width: 100%;
}
#main {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
}
</style>
<style src="./style/difficultyBoard.css"></style>
<style src="./style/header.css"></style>
<style src="./style/menu.css"></style>