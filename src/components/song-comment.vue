<template>
  <div id="comment_main">

  </div>
</template>

<script>
export default {
  name: "song-comment"
}
</script>
<style scoped>
#comment_main{
  position: fixed;
  background-color: #dcdcdc;
  border-width: 1px;
  border-color: #c4c4c4;
  border-radius: 20%;
  width: 500px;
  height: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  animation: bounce-in .3ms;
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