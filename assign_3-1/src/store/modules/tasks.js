const state = {
   todos: [],
   newItem: '',
};
const getters = {
   taskToDos: state => state.todos,
   newItem: state => state.newItem,
};
const mutations = {
   taskToDos: (state, item) => {
      state.todos.push(item);
   },
   newItem: (state, addedItem) => {
      state.newItem = addedItem;
   },
};
export default {
   namespaced: true,
   state,
   getters,
   mutations,
   // actions,
};
