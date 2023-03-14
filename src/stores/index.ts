import { defineStore } from 'pinia'
import state from './state'

export const useMainStore = defineStore({
    id: 'main',
    state : () => state,
    getters:{},
    actions:{
        
    }
})