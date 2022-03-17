interface CustomBoardState {
    difficultyBoard: {id: number, category: string, songName: string, songLevel: string, judgement: string}[][],
    currentGrade: number,
    idCount: number
}

const state: CustomBoardState = {
    difficultyBoard:[[]],
    currentGrade : 0,
    idCount: 0
}

const getters = {
    difficultyBoard: (state: CustomBoardState) => state.difficultyBoard
}

const mutations = {
    createThumbnail (state: CustomBoardState, payload: {category: string, songName: string, songLevel: string}){
        state.difficultyBoard[state.currentGrade].push({
            id: state.idCount++,
            category: payload.category,
            songName: payload.songName,
            songLevel: payload.songLevel,
            judgement: '',
        })
    },
    createNextGrade (state: CustomBoardState){
        state.difficultyBoard.push([])
        state.currentGrade = state.difficultyBoard.length-1
    },
    deleteThumbnail (state: CustomBoardState, payload: {grade: number, id: number}){
        for(let i = 0; i < state.difficultyBoard[payload.grade].length; i++){
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
    setCurrentGrade (state: CustomBoardState, currentGrade: number){
        state.currentGrade = currentGrade
    },
    initBoard (state: CustomBoardState, board: {id: number, category: string, songName: string, songLevel: string, judgement: string}[][]){
        if(board !== null) {
            state.difficultyBoard = board
            state.currentGrade = state.difficultyBoard.length-1
        }
    },
    cleanBoard (){
        state.difficultyBoard = [[]]
        state.currentGrade = 0
        state.idCount = 0
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}