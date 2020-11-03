<template>
   <div id="app">
      <h1>ToDoリスト</h1>
      <form name="radioConditions">
         <input type="radio" name="rdo" checked />すべて
         <input type="radio" name="rdo" />作業中
         <input type="radio" name="rdo" />完了
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
               <!-- 実装されたイメージを持つために以下を一時的に作成 -->
               <tr hidden>
                  <td>0</td>
                  <td>aaa</td>
                  <td><button>作業中</button></td>
                  <td><button>削除</button></td>
               </tr>
               <!-- ここまで -->

               <tr v-for="(todo, index) in taskToDos" :key="todo.id">
                  <td>{{ (todo.id = index) }}</td>
                  <td>{{ todo.comment }}</td>
                  <!-- //-完了と作業中のボタンの切り替えをv-ifで行う -->
                  <td v-if="todo.working">
                     <button>作業中</button>
                  </td>
                  <td v-else><button>完了</button></td>
                  <td><button>削除</button></td>
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
   },
   methods: {
      addTask(event) {
         const item = {
            id: '',
            comment: this.$store.getters['tasks/newItem'],
            working: true,
         };

         //-タスクを追加する処理を関数化
         let addTaskDetail = () => {
            // this.$store.state.tasks.todos.push(item);
            this.$store.commit('tasks/taskToDos', item);
            this.newItem = '';
         };

         if (event.type === 'click') {
            addTaskDetail();
            return;
         }
         //-日本語入力中に確定した際にEnterキーのトリガーを走らせないようにする処理
         if (event.keyCode !== 13) return;
         addTaskDetail();
      },
   },
};
</script>

<style>
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
