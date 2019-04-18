import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    armyList: Array,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setArmyList(state, armyList){
      state.armyList = armyList;
    },
  },
  actions: {
    //user
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async postArmyStore (context, data) {
      try {
        await axios.post('/api/armies', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getArmyStore (context) {
      try {
        let response = await axios.get('/api/armies');
        context.commit('setArmyList', response.data);
      } catch (error) {
        return "";
      }
    },
    async editArmyStore (context, data) {
      try {
        await axios.put('/api/armies/' + data.id , data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async deleteArmyStore (context, data) {
      try {
        await axios.delete('/api/armies/' + data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
  }
});
