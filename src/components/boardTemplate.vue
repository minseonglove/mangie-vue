<template>
  <div>
    <h1>{{props.title}}</h1>
    <div v-for="(difficulty, grade) in props.difficultyBoard" :key="grade">
      <div class="grade">
        <img class="gradeBox" :src="require(`@/assets/img/grade/${props.difficultyBoard.length-grade}.png`)" alt="등급">
        <div class="levelBox">
          <div class="thumbBox" v-for="thumb in difficulty" :key="thumb.id" v-on:mouseover="getSongInfo(thumb)">
            <img class="sName" :src="require(`@/assets/img/thumbnails/${thumb.category}/${thumb.songName}.jpg`)" alt="썸네일"
                 v-on:mouseover="showSongInfo($event)" v-on:mouseleave="hideSongInfo">
            <img class="sLevel" :src="require(`@/assets/img/level/${thumb.songLevel}.png`)" alt="난이도">
            <img class="sBorder" :src="require(`@/assets/img/border/${thumb.category}.png`)" alt="카데고리">
            <input class="judgeBox" type="text" placeholder="-- . -- %" v-model="thumb.judgement">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div ref="info" class="infoBox" v-on:mouseover="songInfoVisible=true" v-on:mouseleave="hideSongInfo">
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
import {ref, watch} from "vue";

  const props = defineProps({
    title: String,
    difficultyBoard: Array
  })
  const info = ref(null)
  let songInfoVisible = ref(false)
  let songInfoName = ref('')
  let songInfoCategory = ref('')
  let targetThumbnail = null

  const showSongInfo = (event) => {
    songInfoVisible.value = true
    targetThumbnail = event.target
    info.value.style.top = targetThumbnail.getBoundingClientRect().top + "px"
    info.value.style.left = targetThumbnail.getBoundingClientRect().left + "px"
    window.addEventListener('scroll', moveInfoBox)
  }
  const hideSongInfo = () => {
    songInfoVisible.value = false
    window.addEventListener('scroll', moveInfoBox)
  }
  const getSongInfo = (thumb) => {
    songInfoName.value = thumb.songName
    songInfoCategory.value = thumb.category
  }
  const moveInfoBox = function () {
    info.value.style.top = targetThumbnail.getBoundingClientRect().top + "px"
  }
  watch(()=>songInfoVisible.value,
      (newVal) => info.value.style.visibility = newVal ? "visible" : "hidden")
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