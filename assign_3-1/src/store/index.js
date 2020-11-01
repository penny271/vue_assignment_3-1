import Vue from 'vue';
import Vuex from 'vuex';

//- 各moduleをimport
import tasks from './modules/tasks';

Vue.use(Vuex);

// export default new Vuex.Store({
const store = new Vuex.Store({
   modules: {
      tasks,
   },
});

export default store;
