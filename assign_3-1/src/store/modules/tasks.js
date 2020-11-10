const state = {
   todos: [],
   newItem: '',
   //課題3-4ラジオボタンの状態管理▼
   condition: 'すべて',
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
      console.log('mutationのcondition');
      state.condition = value;
   },
   //- 課題3-4 ラジオボタンのvalueの状態による
   //- タスクのソート化処理(表示、非表示切り替え)
   chosenTasks: state => {
      console.log('非同期処理なし');
      state.duplicatedTodos = state.todos;
      if (state.condition === '作業中') {
         let working = state.duplicatedTodos.filter(
            todo => todo.working === true
         );
         state.duplicatedTodos = working;
      } else if (state.condition === '完了') {
         let complete = state.duplicatedTodos.filter(
            todo => todo.working === false
         );
         state.duplicatedTodos = complete;
      } else {
         return state.duplicatedTodos;
      }
   },
};
//?? 非同期の処理を書かないとミューテーションのconditionよりも
//?? chosenTasksが先に実行されてしまう ← (なぜかは不明、そういうvueの仕様?)
//?? そのため、複製した配列(state.duplicatedTodos)が
//?? chosenTasks内の条件式のフィルターを通る前に実行され、
//??? タスク表示、非表示がradioボタンを
//?? クリックしたタイミングで動かず、解答のような挙動にならない
//?? その解決のため、強制的に非同期処理をactionsで記載することで
//?? chosenTasksの実行のタイミングを遅らせ、conditionを先に実行、
//?? その後にchosenTasksを実行する処理とすることで実装しました
const actions = {
   chosenTasks: context => {
      setTimeout(() => {
         context.commit('chosenTasks');
      }, 10);
   },
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions,
};
