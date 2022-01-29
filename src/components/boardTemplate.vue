<template>
  <div>
    <div v-for="(difficulty, grade) in difficultyBoard" v-bind:key="grade">
      <div class="grade">
        <img class="gradeBox" :src="require(`@/assets/img/grade/${difficultyBoard.length-grade}.png`)" alt="등급">
        <div class="levelBox">
          <div class="thumbBox" v-for="thumb in difficulty" v-bind:key="thumb.id">
            <img class="sName" :src="require(`@/assets/img/thumbnails/${thumb.category}/${thumb.songName}.jpg`)" alt="썸네일">
            <img class="sLevel" :src="require(`@/assets/img/level/${thumb.songLevel}.png`)" alt="난이도">
            <img class="sBorder" :src="require(`@/assets/img/border/${thumb.category}.png`)" alt="카데고리">
            <input class="judgeBox" type="text" placeholder="-- . -- %" v-model="thumb.judgement">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boardTemplate",
  props:{
    difficultyBoard: Array
  },
  data: function (){
    return {
    }
  }
}
</script>

<style scoped>

</style>