<template>
  <div class="custom-board">
    <h1>커스텀 보드</h1>
    <div v-for="(difficulty, grade) in board" v-bind:key="grade">
      <div class="grade">
        <img class="gradeBox" :src="require(`@/assets/img/grade/${board.length-grade}.png`)" v-on:click="setCurrentGrade(grade)" alt="등급">
        <transition-group tag="div" class="levelBox" name="list">
          <div class="cbBox" v-for="thumb in difficulty" v-bind:key="thumb.id" v-on:click="deleteThumb(grade, thumb.id)">
            <img class="sName" :src="require(`@/assets/img/thumbnails/${thumb.category}/${thumb.songName}.webp`)" alt="썸네일">
            <img class="sLevel" :src="require(`@/assets/img/level/${thumb.songLevel}.webp`)" alt="난이도" draggable="false">
            <img class="sBorder" :src="require(`@/assets/img/border/${thumb.category}.webp`)" alt="카데고리" draggable="false">
            <input class="judgeBox" type="text" placeholder="-- . -- %" v-model="thumb.judgement">
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "custom-board"
}
</script>
<script setup>
  import {useStore} from "vuex";
  import {computed} from "vue";
  const store = useStore()
  const mangiePopup = document.getElementsByClassName("gradeSelect")
  const setCurrentGrade = (currentGrade) => {
    mangiePopup.value = true
    store.commit('customBoard/setCurrentGrade', currentGrade)
  }
  const board = computed(() => store.getters['customBoard/difficultyBoard'])
  const deleteThumb = (grade, id) => store.commit('customBoard/deleteThumbnail', {grade: grade, id: id})
</script>

<style scoped>
.cbBox:hover{
  cursor: pointer;
}
.cbBox{
  transition: all 0.3s;
  height: 130px;
}
.gradeBox:hover{
  cursor: pointer;
}
.list-enter-active{
  animation: bounce-in 0.3s;
}
.list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
@keyframes bounce-in {
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.2);
  }
  100%{
    transform: scale(1);
  }
}
</style>