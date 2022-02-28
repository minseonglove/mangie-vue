const state = {
    show: false
}

const getters = {
    getShow: (state) => state.show
}

const mutations = {
    setShow (state, show){
        state.show = show
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}