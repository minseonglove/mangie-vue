<template>
  <!--열고닫는 창으로 하고싶다-->
  <div class="cct">
    <p>카데고리</p>
    <select v-model="selCategory">
      <option v-for="(c, idx) in dlc" :key="idx" :value="idx">{{c}}</option>
    </select>
    <p>난이도</p>
    <select v-model="selDiff">
      <option v-for="d in diff" :key="d">{{d}}</option>
    </select>
    <br>
    <input class="searchBox" v-model="search" placeholder="filter">
    <div class="cctBox">
      <img class="cctThumb" v-for="(thumb, idx) in selList" v-bind:key="idx" v-on:click="selected(idx)"
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
    <button class="makeBox" v-on:click="cleanBD">초기화</button>
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
  let selList = ref(props.songs[1])
  const diff = ['nm', 'hd', 'mx', 'sc']
  const dlc = ['All Songs','respect', 'portable1', 'portable2', 'portable3', 'trilogy',
    'clazziquai', 'blacksquare', 'technika1', 'technika2', 'technika3', 'emotional',
    'vextension', 'vextension2', 'collaboration']
  const search = ref('')

  const selected = (idx) => selSong.value = selList.value[idx]
  const createT = () => {
    store.commit('customBoard/createThumbnail', {
      category: selSong.value.category,
      songName: selSong.value.file_name,
      songLevel: selDiff.value})
  }
  const createNG = () => store.commit('customBoard/createNextGrade')
  const cleanBD = () => store.commit('customBoard/cleanBoard')
  watch(search, () =>{
    const searchTrim = search.value.replaceAll(' ', '')
    if(searchTrim.length !== 0)
      selList.value = props.songs[selCategory.value].filter(v => v.file_name.includes(searchTrim))
    else
      selList.value = props.songs[selCategory.value]
  })
  watch(selCategory, () => {
    selSong.value = props.songs[selCategory.value][0]
    selList.value = props.songs[selCategory.value]
    search.value = ''
  })
</script>

<style scoped>
.cctBox{
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  width: 300px;
  height: 400px;
  overflow-y: scroll;
}
.cctThumb{
  margin-bottom: 8px;
  margin-left: 8px;
  max-width: 80px;
  max-height: 80px;
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
.searchBox{
  font-style: italic;
  margin: 8px 0;
}
@media (max-width: 1379px){
  .cct{
    visibility: hidden;
  }
}
</style>