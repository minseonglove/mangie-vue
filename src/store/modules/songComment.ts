const state = {
    show: false
}

const getters = {
    getShow: (state: {show: boolean}) => state.show
}

const mutations = {
    setShow (state: {show: boolean}, show: boolean){
        state.show = show
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}