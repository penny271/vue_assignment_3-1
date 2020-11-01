const state = {
   todos: [],
   newItem: '',
};
const getters = {
   taskToDos: state => state.todos,
   newItem: state => state.newItem,
};
const mutations = {
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
