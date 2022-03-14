<template>
  <div ref="bt" class="boardTitle boardImage"/>
  <div class="board">
    <div v-for="(difficulty, grade) in board" :key="grade">
      <div class="grade">
        <div class="gradeBox">
          <p>{{board.length - grade}}</p>
        </div>
        <div class="levelBox">
          <div class="thumbBox" v-for="thumb in difficulty" :key="thumb">
            <thumbnail-card :info="thumb" v-on:click="showSongComment" v-on:mouseover.prevent="showSongInfo($event, thumb)" v-on:mouseleave="hideSongInfo"/>
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
import ThumbnailCard from "./thumbnail-card";
  const info = ref(null)
  const bt = ref(null)
  const store = useStore()
  let songInfoVisible = ref(false)
  let songInfoName = ref('')
  let songInfoCategory = ref('')
  let targetThumbnail = null
  let btRect = null

  const hideSongInfo = () => {
    songInfoVisible.value = false
    window.addEventListener('scroll', moveInfoBox)
  }
  const showSongInfo = (event, thumb) => {
    if(!songInfoVisible.value){
      const currentSong = store.getters.songInfo(thumb.songName)
      songInfoName.value = currentSong.name
      songInfoCategory.value = currentSong.category
      targetThumbnail = event.currentTarget.getBoundingClientRect()
      btRect = bt.value.getBoundingClientRect()
      info.value.style.top = targetThumbnail.top - btRect.top - 58 + "px"
      info.value.style.left = targetThumbnail.left - btRect.left + 200 + "px"
      window.addEventListener('scroll', moveInfoBox)
      songInfoVisible.value = true
    }
  }
  const moveInfoBox = function () {
    info.value.style.top = targetThumbnail.top - btRect.top + "px"
  }

  const showSongComment = () =>{
    store.commit('songComment/setShow', true)
  }

  const board = computed(() => store.getters["staticBoard/selectedBoard"])
  watch(()=>songInfoVisible.value, (newVal) => info.value.style.visibility = newVal ? "visible" : "hidden")
</script>
<style scoped>
</style>