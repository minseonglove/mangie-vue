

export const store = {
    state:{
        difficultyBoard:[[]],
        currentGrade : 0,
        idCount: 0
    },
    mutations:{
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
            state.currentGrade++
            state.difficultyBoard.push([])
        },
        deleteThumbnail (state, payload){
            for(let i in state.difficultyBoard[payload.grade]){
                if(state.difficultyBoard[payload.grade][i].id === payload.id) {
                    state.difficultyBoard[payload.grade].splice(i, 1)
                    if(payload.grade !== 0 && state.difficultyBoard[payload.grade].length === 0)
                        state.difficultyBoard.splice(payload.grade, 1)
                    break
                }
            }
        }
    }
}