import { createStore } from 'vuex'
import customBoard from "./modules/customBoard";
import staticBoard from "./modules/staticBoard";
import songComment from "./modules/songComment";

export default createStore({
    modules: {customBoard, staticBoard, songComment},
    state: {
        songInfo: new Map(),
        categoryName: new Map()
    },
    getters: {
        songInfo: (state) => (file_name) => state.songInfo.get(file_name)
    },
    mutations: {
        initSongInfo(state, songList) {
            const categoryName = new Map()
            categoryName.set("respect", "RESPECT")
            categoryName.set("portable1", "Portable 1")
            categoryName.set("portable2", "Portable 2")
            categoryName.set("portable3", "Portable 3")
            categoryName.set("blacksquare", "BLACK SQUARE")
            categoryName.set("emotional", "Emotional Sense")
            categoryName.set("trilogy", "TRILOGY")
            categoryName.set("technika1", "TECHNIKA 1")
            categoryName.set("technika2", "TECHNIKA 2")
            categoryName.set("technika3", "TECHNIKA 3")
            categoryName.set("vextension", "V EXTENSION")
            categoryName.set("vextension", "V EXTENSION II")
            categoryName.set("collaboration", "Collaboration")

            for(let song of songList[0])
                state.songInfo.set(song.file_name, {name: song.song_name, category: categoryName.get(song.category)})
        }
    },
    actions: {
        initSongInfo({commit}, songList){
            commit('initSongInfo', songList)
        }
    }
})
