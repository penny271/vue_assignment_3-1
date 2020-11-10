<template>
   <div id="app">
      <h1>ToDoリスト</h1>
      <form name="radioConditions">
         <input
            type="radio"
            id="all"
            name="rdo"
            v-model="condition"
            value="すべて"
            @click="chosenTasks"
         /><label for="all">すべて</label>
         <input
            type="radio"
            id="progress"
            name="rdo"
            v-model="condition"
            value="作業中"
            @click="chosenTasks"
         /><label for="progress">作業中</label>
         <input
            type="radio"
            id="complete"
            name="rdo"
            v-model="condition"
            value="完了"
            @click="chosenTasks"
         /><label for="complete">完了</label>
      </form>

      <div>
         <table>
            <!-- テーブルヘッダー -->
            <thead>
               <tr>
                  <th>ID</th>
                  <th>コメント</th>
                  <th>状態</th>
               </tr>
            </thead>
            <tbody>
               <tr
                  v-for="(todo, index) in duplicatedTodos"
                  :key="index"
                  class="eachTodo"
               >
                  <td>{{ (todo.id = index) }}</td>
                  <td>{{ todo.comment }}</td>
                  <!-- //-課題3-3完了 作業中のボタンの切り替え操作 -->
                  <td v-if="todo.working">
                     <button @click="changeButtonState(todo)">
                        作業中
                     </button>
                  </td>
                  <td v-else>
                     <button @click="changeButtonState(todo)">完了</button>
                  </td>
                  <td><button @click="removeTask(index)">削除</button></td>
               </tr>
            </tbody>
         </table>
      </div>

      <h2>
         新規タスクの追加
      </h2>
      <input type="text" size="29" v-model="newItem" @keydown.enter="addTask" />

      <button @click="addTask">追加</button>
   </div>
</template>

<script>
export default {
   computed: {
      taskToDos() {
         return this.$store.getters['tasks/taskToDos'];
      },
      newItem: {
         get() {
            return this.$store.getters['tasks/newItem'];
         },
         set(value) {
            this.$store.commit('tasks/newItem', value);
         },
      },
      condition: {
         get() {
            return this.$store.getters['tasks/condition'];
         },
         set(value) {
            this.$store.commit('tasks/condition', value);
         },
      },
      duplicatedTodos() {
         // return this.$store.state.tasks.duplicatedTodos;
         return this.$store.getters['tasks/duplicatedTodos'];
      },
   },
   methods: {
      addTask(event) {
         if (event.type === 'click') {
            this.addTaskDetail();
            this.chosenTasks();
            return;
         }
         //-日本語入力中に確定した際にEnterキーのトリガーを走らせないようにする処理
         if (event.keyCode !== 13) return;
         this.addTaskDetail();
         this.chosenTasks();
      },

      //-タスクを追加する処理を関数化
      addTaskDetail() {
         const item = {
            id: '',
            comment: this.$store.getters['tasks/newItem'],
            working: true,
         };
         // this.$store.state.tasks.todos.push(item);
         this.$store.commit('tasks/taskToDos', item);
         this.newItem = '';
      },
      //-課題3-2 タスクの削除機能
      removeTask(index) {
         this.$store.commit('tasks/removeTask', index);
      },
      //-課題3-3 タスクのボタンの状態変化
      changeButtonState(todo) {
         todo.working = !todo.working;
      },
      //! 課題3-4 タスクのソートcommit 下記不可
      // chosenTasks() {
      //    this.$store.commit('tasks/chosenTasks')
      // }
      //-課題3-4 タスクのソート 下記でも実装可能だった。
      // chosenTasks() {
      //    setTimeout(() => {
      //       this.$store.commit('tasks/chosenTasks');
      //    }, 20);
      // },
      //-課題3-4 タスクのソート dispatchでアクションを実行
      chosenTasks() {
         this.$store.dispatch('tasks/chosenTasks')
      }
   },
};
</script>

<style>
label {
   margin-right: 5px;
}

.radios {
   margin: 0;
   padding: 0;
}

input {
   margin: 0 5px 0 0;
}

.hidden {
   display: none;
}

button {
   background-color: #fff;
   border-radius: 6px;
   border: 1px solid #a5a2a2;
}

button:hover {
   background-color: #2a4bcb;
   color: #fff;
}

ul {
   margin: 0;
   padding: 0;
}

li {
   list-style: none;
}
</style>
