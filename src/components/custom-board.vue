<template>
  <div class="board">
    <div v-for="(difficulty, grade) in board" v-bind:key="grade">
      <div class="grade">
        <div class="gradeBox" v-on:click="setCurrentGrade(grade)">
          <p>{{board.length - grade}}</p>
        </div>
        <draggable class="levelBox" v-model="board[grade]">
          <transition-group name="list">
            <div class="cbBox" v-for="thumb in board[grade]" v-bind:key="thumb.id">
              <thumbnail-card :info="thumb" v-on:click="deleteThumb(grade, thumb.id)"/>
              <input class="judgeBox" type="text" placeholder="-- . -- %" v-model="thumb.judgement">
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import {VueDraggableNext} from 'vue-draggable-next'
export default {
  name: "custom-board",
  components:{
    draggable: VueDraggableNext
  }
}
</script>
<script setup>
  import {useStore} from "vuex";
  import {computed} from "vue";
  import ThumbnailCard from "./thumbnail-card";
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
  display: block;
  height: 91px;
  position: relative;
  margin-bottom: 40px;
  margin-left: 16px;
  transition: all 0.3s ease-in-out;
}
.gradeBox:hover{
  cursor: pointer;
  color: crimson;
}
.list-enter-active{
  animation: bounce-in 0.3s;
}
.list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.list-move{
  transition: transform 0.3s;
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