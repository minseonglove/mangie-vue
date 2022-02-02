<template>
  <div>
    <p>카데고리-</p>
    <select v-model="selCategory">
      <option v-for="(c, idx) in dlc" :key="idx" :value="idx">{{c}}</option>
    </select>
    <p>난이도</p>
    <select v-model="selDiff">
      <option v-for="d in diff" :key="d">{{d}}</option>
    </select>
    <div class="cctBox">
      <img class="cctThumb" v-for="(thumb, idx) in songs[selCategory]" v-bind:key="idx" v-on:click="selected(idx)"
           :src="require(`@/assets/img/thumbnails/${thumb.category}/${thumb.file_name}.webp`)" alt="썸네일">
    </div>
    <!--고른 것 프리뷰-->
    <br>
      <div class="cctPreview">
        <img class="cctName" :src="require(`@/assets/img/thumbnails/${selSong.category}/${selSong.file_name}.webp`)" alt="썸네일">
        <img class="cctLevel" :src="require(`@/assets/img/level/${selDiff}.webp`)" alt="난이도">
        <img class="cctBorder" :src="require(`@/assets/img/border/${selSong.category}.webp`)" alt="카데고리">
      </div>
    <br>
    <button class="makeBox" v-on:click="createT">만들기</button>
    <button class="makeBox" v-on:click="createNG">다음등급</button>
  </div>
</template>

<script>
export default {
  name: "createCustomThumbnail",
}
</script>
<script setup>
  import {useStore} from "vuex";
  import {ref, watch} from "vue";
  const props = defineProps({
    songs: Array
  })
  const store = useStore()
  const selDiff = ref('nm')
  let selCategory = ref(1)
  let selSong = ref(props.songs[1][0])
  const diff = ['nm', 'hd', 'mx', 'sc']
  const dlc = ['All Songs','respect', 'portable1', 'portable2', 'portable3', 'trilogy',
    'clazziquai', 'blacksquare', 'technika1', 'technika2', 'technika3', 'emotional',
    'vextension', 'collaboration']

  const selected = (idx) => selSong.value = props.songs[selCategory.value][idx]
  const createT = () => {
    store.commit('customBoard/createThumbnail', {
      category: selSong.value.category,
      songName: selSong.value.file_name,
      songLevel: selDiff.value})
  }
  const createNG = () => store.commit('customBoard/createNextGrade')

  watch(() => selCategory.value, (newVal) =>{
    selCategory.value = newVal
    selSong.value = props.songs[newVal][0]
  })
</script>

<style scoped>
.cctBox{
  display: grid;
  grid-template-columns: repeat(3, 90px);
  width: 100%;
  height: 400px;
  overflow: auto;
}
.cctThumb{
  margin-bottom: 10px;
}
.cctThumb:hover{
  cursor: pointer;
}
.cctPreview{
  text-align: center;
}
.cctName{
  position: relative;
  left: 44px;
}
.cctLevel{
  position: relative;
  left: 23px;
  bottom: 67px;
  z-index: 1;
}
.cctBorder{
  position: relative;
  top: 5px;
  right: 63px;
}
</style>