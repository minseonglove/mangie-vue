<template>
  <div class="thumbWrap">
    <img class="sName" :src="require(`@/assets/img/thumbnails/${info.category}/${info.songName}.webp`)" alt="썸네일">
    <img class="sLevel" :src="require(`@/assets/img/level/${info.songLevel}.webp`)" alt="난이도" draggable="false">
    <img class="sBorder" :src="require(`@/assets/img/border/${info.category}.webp`)" alt="카데고리" draggable="false">
  </div>
</template>

<script>
export default {
  name: "thumbnail-card",
  props: {
    info: Object
  }
}
</script>

<style scoped>
.thumbWrap{
  display: block;
  width: 100%;
  height: 100%;
}
.thumbWrap:hover{
  cursor: pointer;
}
.thumbWrap>.sName{
  position: absolute;
  top: 4px;
  left: 4px;
  border: 1px solid white;
  z-index: 2;
}
.thumbWrap>.sLevel{
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 3;
}
.thumbWrap>.sBorder{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>