const state = {
   todos: [],
   newItem: '',
   //-▼ ボタンの状態変化の切り替え
};
const getters = {
   taskToDos: state => state.todos,
   newItem: state => state.newItem,
   isActive: state => state.isActive,
};
const mutations = {
   taskToDos: (state, item) => {
      state.todos.push(item);
      console.log(state.todos);
   },
   newItem: (state, addedItem) => {
      state.newItem = addedItem;
   },
   removeTask: (state, index) => {
      state.todos.splice(index, 1);
   },
};
export default {
   namespaced: true,
   state,
   getters,
   mutations,
   // actions,
};
