const state = {
    difficultyBoard:[[]],
    currentGrade : 0,
    idCount: 0
}

const getters = {
    difficultyBoard: (state) => state.difficultyBoard
}

const mutations = {
    createThumbnail (state, payload){
        state.difficultyBoard[state.currentGrade].push({
            id: state.idCount++,
            category: payload.category,
            songName: payload.songName,
            songLevel: payload.songLevel,
            judgement: '',
        })
    },
    createNextGrade (state){
        state.difficultyBoard.push([])
        state.currentGrade = state.difficultyBoard.length-1
    },
    deleteThumbnail (state, payload){
        for(let i in state.difficultyBoard[payload.grade]){
            if(state.difficultyBoard[payload.grade][i].id === payload.id) {
                state.difficultyBoard[payload.grade].splice(i, 1)
                if(payload.grade !== 0 && state.difficultyBoard[payload.grade].length === 0) {
                    state.difficultyBoard.splice(payload.grade, 1)
                    if(state.currentGrade ===  state.difficultyBoard.length)
                        state.currentGrade--
                }
                break
            }
        }
    },
    setCurrentGrade (state, currentGrade){
        state.currentGrade = currentGrade
    },
    initBoard (state, board){
        if(board !== null) {
            state.difficultyBoard = board
            state.currentGrade = state.difficultyBoard.length-1
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}