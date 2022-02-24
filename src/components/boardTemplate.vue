<template>
  <div class="board">
    <div v-for="(difficulty, grade) in board" :key="grade">
      <div class="grade">
        <div class="gradeBox">
          <p>{{board.length - grade}}</p>
        </div>
        <div class="levelBox">
          <div class="thumbBox" v-for="thumb in difficulty" :key="thumb" v-on:mouseover="getSongInfo(thumb)">
            <div class="thumbWrap">
              <img class="sName" :src="require(`@/assets/img/thumbnails/${thumb.category}/${thumb.songName}.webp`)" alt="썸네일"
                   v-on:mouseover="showSongInfo($event)" v-on:mouseleave="hideSongInfo">
              <img class="sLevel" :src="require(`@/assets/img/level/${thumb.songLevel}.webp`)" alt="난이도">
              <img class="sBorder" :src="require(`@/assets/img/border/${thumb.category}.webp`)" alt="카데고리">
            </div>
            <input class="judgeBox" type="text" placeholder="-- . -- %" v-model="thumb.judgement">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div ref="info" class="infoBox" v-if="store.getters['staticBoard/now'] < 12" v-on:mouseover="songInfoVisible=true" v-on:mouseleave="hideSongInfo">
    <p>{{songInfoName}}</p>
    <p>{{songInfoCategory}}</p>
  </div>
</template>

<script>
export default {
  name: "boardTemplate",
}
</script>
<script setup>
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
  const info = ref(null)
  const store = useStore()
  let songInfoVisible = ref(false)
  let songInfoName = ref('')
  let songInfoCategory = ref('')
  let targetThumbnail = null

  const showSongInfo = (event) => {
    songInfoVisible.value = true
    targetThumbnail = event.target
    info.value.style.top = targetThumbnail.offsetTop + "px"
    info.value.style.left = targetThumbnail.offsetLeft + "px"
    window.addEventListener('scroll', moveInfoBox)
  }
  const hideSongInfo = () => {
    songInfoVisible.value = false
    window.addEventListener('scroll', moveInfoBox)
  }
  const getSongInfo = (thumb) => {
    //songname을 키로 갖는 맵이 필요하다
    const info = store.getters.songInfo(thumb.songName)
    songInfoName.value = info.name
    songInfoCategory.value = info.category
  }
  const moveInfoBox = function () {
    info.value.style.top = targetThumbnail.offsetTop + "px"
  }

  const board = computed(() => store.getters["staticBoard/selectedBoard"])
  watch(()=>songInfoVisible.value, (newVal) => info.value.style.visibility = newVal ? "visible" : "hidden")
</script>
<style scoped>
.infoBox{
  position: fixed;
  z-index: 999;
  background-color: white;
  font-size: 12px;
  font-weight: bold;
}
</style>