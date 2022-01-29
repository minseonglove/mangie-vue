<template>
  <div class="six15">
    <h1>6B 15LV</h1>
    <div v-for="(difficulty, grade) in difficultyBoard" v-bind:key="grade">
      <div class="grade">
        <img class="gradeBox" :src="require(`@/assets/img/grade/${difficultyBoard.length-grade}.png`)" alt="등급">
        <div class="levelBox">
          <div class="thumbBox" v-for="thumb in difficulty" v-bind:key="thumb.id" v-on:mouseover="getSongInfo(thumb)">
            <img class="sName" :src="require(`@/assets/img/thumbnails/${thumb.category}/${thumb.songName}.jpg`)" alt="썸네일"
                 v-on:mouseover="showSongInfo" v-on:mouseleave="hideSongInfo">
            <img class="sLevel" :src="require(`@/assets/img/level/${thumb.songLevel}.png`)" alt="난이도">
            <img class="sBorder" :src="require(`@/assets/img/border/${thumb.category}.png`)" alt="카데고리">
            <input class="judgeBox" type="text" placeholder="-- . -- %" v-model="thumb.judgement">
          </div>
        </div>
      </div>
    </div>
    <div class="infoBox" ref="info" v-on:mouseover="songInfoVisible=true" v-on:mouseleave="hideSongInfo">
      <p>{{songInfoName}}</p>
      <p>{{songInfoCategory}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'six15',
  data: function (){
    return{
      songInfoVisible : false,
      songInfoName : '',
      songInfoCategory : '',
      targetThumbnail: null,
      difficultyBoard:[
        [
          {
            id: 1,
            category: 'collaboration',
            songName: 'anima',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 2,
            category: 'collaboration',
            songName: 'l',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 3,
            category: 'collaboration',
            songName: 'garakutadollplay',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 4,
            category: 'collaboration',
            songName: 'ikazuchi',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 5,
            category: 'collaboration',
            songName: 'ouroborostwinstrokeoftheend',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 6,
            category: 'blacksquare',
            songName: 'inmydream',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 7,
            category: 'technika2',
            songName: 'rageofdemon',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 8,
            category: 'respect',
            songName: 'wereallgonnadie',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 9,
            category: 'collaboration',
            songName: '전설이시작된곳voidroverremix',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 10,
            category: 'collaboration',
            songName: 'blackmind',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 11,
            category: 'collaboration',
            songName: 'entrance',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 12,
            category: 'emotional',
            songName: 'superlovely',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 13,
            category: 'technika3',
            songName: 'bambooonbamboo',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 14,
            category: 'collaboration',
            songName: 'conflict',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 15,
            category: 'clazziquai',
            songName: 'darkenvy',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 16,
            category: 'blacksquare',
            songName: 'graveconsequence',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 17,
            category: 'blacksquare',
            songName: 'heartofwitch',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 18,
            category: 'respect',
            songName: 'mulch',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 19,
            category: 'respect',
            songName: 'nevermind',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 20,
            category: 'collaboration',
            songName: 'trrricksters',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 21,
            category: 'trilogy',
            songName: 'ventilator',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 20,
            category: 'technika3',
            songName: 'xeus',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 22,
            category: 'portable1',
            songName: '피아노협주곡1번',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 23,
            category: 'technika2',
            songName: 'airwave',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 24,
            category: 'technika3',
            songName: 'blackswan',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 25,
            category: 'collaboration',
            songName: 'codenamezero',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 26,
            category: 'technika3',
            songName: 'darkprism',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 27,
            category: 'portable3',
            songName: 'enemystormdarkjunglemix',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 28,
            category: 'respect',
            songName: 'entertheuniverse',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 29,
            category: 'vextension',
            songName: 'kensei',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 31,
            category: 'emotional',
            songName: 'spaceofsoul',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 32,
            category: 'respect',
            songName: 'voldenuit',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 33,
            category: 'collaboration',
            songName: 'warrior',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 34,
            category: 'collaboration',
            songName: '소년모험가sinaremix',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 35,
            category: 'technika3',
            songName: 'ad2222',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 36,
            category: 'respect',
            songName: 'analys',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 37,
            category: 'collaboration',
            songName: 'breakaspell',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 38,
            category: 'technika3',
            songName: 'emblem',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 39,
            category: 'portable3',
            songName: 'goneastray',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 40,
            category: 'respect',
            songName: 'gridsystem',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 41,
            category: 'technika1',
            songName: 'hexad',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 42,
            category: 'portable1',
            songName: 'nbranger',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 43,
            category: 'collaboration',
            songName: 'overthenight',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 44,
            category: 'technika3',
            songName: 'overtherainbow',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 45,
            category: 'collaboration',
            songName: 'thewheeltotheright',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 46,
            category: 'respect',
            songName: 'wereallgonnadie',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 47,
            category: 'collaboration',
            songName: '공성전pierreblancheyonceremix',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 48,
            category: 'collaboration',
            songName: 'axion',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 49,
            category: 'collaboration',
            songName: 'barbarousfunera',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 50,
            category: 'portable1',
            songName: 'blythe',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 51,
            category: 'respect',
            songName: 'dontdie',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 52,
            category: 'technika2',
            songName: 'dreamofwinds',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 53,
            category: 'portable2',
            songName: 'fortheikarus',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 54,
            category: 'collaboration',
            songName: 'gotmoreraves',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 55,
            category: 'collaboration',
            songName: 'marionette',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 56,
            category: 'respect',
            songName: 'nbrangervirginforce',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 57,
            category: 'portable3',
            songName: 'outlawreborn',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 58,
            category: 'portable1', /*파라 큐*/
            songName: 'paraq',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 59,
            category: 'portable1',
            songName: 'sinthelastscene',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 60,
            category: 'vextension',
            songName: 'spacechallenger',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 61,
            category: 'technika1',
            songName: 'thor',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 62,
            category: 'vextension',
            songName: 'vilerequiem',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 61,
            category: 'vextension',
            songName: 'wonderlot777',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 62,
            category: 'collaboration',
            songName: 'l',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 63,
            category: 'technika2',
            songName: 'rageofdemon',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 64,
            category: 'respect',
            songName: 'remainsofdoom',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 65,
            category: 'portable1',
            songName: 'roadofdeath',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 66,
            category: 'collaboration',
            songName: '부여성blossoremix',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 67,
            category: 'respect',
            songName: 'alice',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 68,
            category: 'collaboration',
            songName: 'frontline',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 69,
            category: 'technika1',
            songName: 'fury',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 70,
            category: 'respect',
            songName: 'glorydaymintormentremix',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 71,
            category: 'portable3',
            songName: 'hanzup',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 72,
            category: 'technika1',
            songName: 'landscape',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 73,
            category: 'respect',
            songName: 'liar',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 74,
            category: 'vextension',
            songName: 'lisrim',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 75,
            category: 'vextension',
            songName: 'losttemple',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 76,
            category: 'portable2',
            songName: 'midnightblood',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 77,
            category: 'respect',
            songName: 'quixotic',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 78,
            category: 'respect',
            songName: 'risingthesonic',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 79,
            category: 'portable2',
            songName: 'seeker',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 80,
            category: 'portable2',
            songName: 'whiteblue',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 81,
            category: 'collaboration',
            songName: '전설이시작된곳voidroverremix',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 82,
            category: 'collaboration',
            songName: 'anima',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 83,
            category: 'technika2',
            songName: 'd2',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 84,
            category: 'collaboration',
            songName: 'ouroborostwinstrokeoftheend',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 85,
            category: 'collaboration',
            songName: 'trrricksters',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 86,
            category: 'respect',
            songName: '너로피어오라',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 87,
            category: 'collaboration',
            songName: 'angelicsphere',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 88,
            category: 'blacksquare',
            songName: 'beatudown',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 89,
            category: 'vextension',
            songName: 'blackgold',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 90,
            category: 'respect',
            songName: 'chemicalslave',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 91,
            category: 'respect',
            songName: 'childofnight',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 92,
            category: 'portable1',
            songName: 'dreadnought',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 93,
            category: 'trilogy',
            songName: 'forseasonsairguitarmix',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 94,
            category: 'blacksquare',
            songName: 'keystotheworld',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 95,
            category: 'portable1',
            songName: 'kuda',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 96,
            category: 'portable3',
            songName: 'leavemealone',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 97,
            category: 'vextension',
            songName: 'mistyera',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 98,
            category: 'respect',
            songName: 'royalclown',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 99,
            category: 'respect',
            songName: 'runaway',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 100,
            category: 'respect',
            songName: 'secretdejavu',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 101,
            category: 'emotional',
            songName: 'urbannight',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 102,
            category: 'technika3',
            songName: 'bambooonbamboo',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 103,
            category: 'collaboration',
            songName: 'ikazuchi',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 104,
            category: 'portable2',
            songName: 'nightmare',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 105,
            category: 'emotional',
            songName: 'superlovely',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 106,
            category: 'respect',
            songName: '염라',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 107,
            category: 'portable3',
            songName: 'break',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 108,
            category: 'vextension',
            songName: 'dreamit',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 109,
            category: 'portable2',
            songName: 'fentanest',
            songLevel: 'mx',
            judgement: '',
          },
          {
            id: 110,
            category: 'portable1',
            songName: 'jbg',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 111,
            category: 'portable1',
            songName: 'lemonade',
            songLevel: 'sc',
            judgement: '',
          },
        ],
        [
          {
            id: 112,
            category: 'collaboration',
            songName: 'entrance',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 113,
            category: 'collaboration',
            songName: 'garakutadollplay',
            songLevel: 'sc',
            judgement: '',
          },
          {
            id: 114,
            category: 'collaboration',
            songName: 'thewheeltotheright',
            songLevel: 'mx',
            judgement: '',
          },
        ]
      ],
    }
  },
  methods:{
    //곡의 이름과 카데고리를 보여준다
    showSongInfo: function (event) {
      this.songInfoVisible = true
      this.targetThumbnail = event.target
      this.$refs.info.style.top = this.targetThumbnail.getBoundingClientRect().top + "px"
      this.$refs.info.style.left = this.targetThumbnail.getBoundingClientRect().left + "px"
      window.addEventListener('scroll', this.moveInfoBox)
    },
    hideSongInfo: function (){
      this.songInfoVisible = false
      window.addEventListener('scroll', this.moveInfoBox)
    },
    getSongInfo: function (thumb) {
      this.songInfoName = thumb.songName
      this.songInfoCategory = thumb.category
    },
    moveInfoBox: function (){
      //썸네일에 딸려서 같이 올라갈 줄 알았는데 사라진다. 오히려 좋긴한데 이유를 모르겠다.
      this.$refs.info.style.top = this.targetThumbnail.getBoundingClientRect().top + "px"
    }
  },
  watch:{
    songInfoVisible: function (v) {
      this.$refs.info.style.visibility = v ? "visible" : "hidden"
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.infoBox{
  position: fixed;
  z-index: 999;
  background-color: white;
  font-size: 12px;
  font-weight: bold;
}
</style>
