const state = {
   todos: [],
   newItem: '',
   // todoの複製を作成 タスクをソートする際のfilter関数用
   duplicatedTodos: [],
};
const getters = {
   taskToDos: state => state.todos,
   newItem: state => state.newItem,
   condition: state => state.condition,
   duplicatedTodos: state => state.duplicatedTodos,
};
const mutations = {
   taskToDos: (state, item) => {
      state.todos.push(item);
   },
   newItem: (state, addedItem) => {
      state.newItem = addedItem;
   },
   //- 課題3-2 タスク削除機能
   removeTask: (state, index) => {
      state.todos.splice(index, 1);
   },
   condition: (state, value) => {
      state.condition = value;
   },
   duplicatedTodos: (state, newDuplicatedTodos) => {
      state.duplicatedTodos = newDuplicatedTodos;
   },
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
};
