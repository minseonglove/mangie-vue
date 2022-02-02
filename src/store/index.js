import { createStore } from 'vuex'
import customBoard from "./modules/customBoard";
import staticBoard from "./modules/staticBoard";

export default createStore({
    modules: {customBoard, staticBoard}
})
