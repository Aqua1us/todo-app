
<template>
  <div>
    <!-- 新規作成部分 -->
    <div class="row margin-default">
      <div class="col s8 m9">
        <input v-model="newTask" id="new-task-form" class="form-control padding-default" placeholder="ここにタスクを入力してください">
      </div>
      <div class="col s2 m2">
        <datepicker id="new-task-deadline" :format="customFormatter" placeholder="期日"></datepicker>
      </div>
      <div class="col s2 m1">
        <button class="btn-floating waves-effect waves-light " v-on:click="createTask">
          <i class="material-icons">create</i>
        </button>
      </div>
    </div>
    <!-- リスト表示部分 -->
    <div>
      <table class="highlight">
        <thead>
          <tr>
            <th class="col s1"></th>
            <th class="col s8">タスク名</th>
            <th class="col s1">期日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:id="'row_task_' + task.id" class="collection-item" v-for="task in tasks" :key="task.id" v-if="!task.is_done">
            <td >
              <input type="checkbox" v-bind:id="'task_' + task.id" v-on:change="doneTask(task.id)" />
              <label v-bind:for="'task_' + task.id" class="word-color-black"></label>
            </td>
            <td>{{ task.name }}</td>
            <td>{{ "2019/06/18" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 完了済みタスク表示ボタン -->
    <button class="btn btn-custom" v-on:click="displayFinishedTasks">完了済みタスク</button>
    <!-- 完了済みタスク一覧 -->
    <div id="finished-tasks" class="display_none">
      <!--
      <ul class="collection">
        <li v-bind:id="'row_task_' + task.id" class="collection-item" v-for="task in tasks" :key="task.id" v-if="task.is_done">
          <input type="checkbox" v-bind:id="'task_' + task.id" checked="checked" />
          <label v-bind:for="'task_' + task.id"  class="line-through">{{ task.name }}</label>
        </li>
      </ul>
      -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';
  export default {
    components: {
      'datepicker': Datepicker
    },
    data: function () {
      return {
        tasks: [],
        newTask: ''
      }
    },
    mounted: function () {
      this.fetchTasks();
    },
    methods: {
      // タスクの表示
      fetchTasks: function () {
        axios.get('/api/tasks').then((response) => {
          for(var i = 0; i < response.data.tasks.length; i++) {
            this.tasks.push(response.data.tasks[i]);
          }
        }, (error) => {
          console.log(error);
        });
      },
      // タスクの登録
      createTask: function () {
        if (!this.newTask) return;
        axios.post('/api/tasks', { task: { name: this.newTask } }).then((response) => {
          this.tasks.unshift(response.data.task);
          this.newTask = '';
        }, (error) => {
          console.log(error);
        });
      },
      // タスクの完了
      doneTask: function (task_id) {
        axios.put('/api/tasks/' + task_id, { task: { is_done: 1 } }).then((response) => {
          this.moveFinishedTask(task_id);
        }, (error) => {
          console.log(error);
        });
      },
      // 完了済みタスクの表示
      displayFinishedTasks: function() {
        document.querySelector('#finished-tasks').classList.toggle('display_none');
      },
      // 未完了タスクを完了済みタスクに移動
      moveFinishedTask: function(task_id) {
        var el = document.querySelector('#row_task_' + task_id);
        // DOMをクローンしておく
        var el_clone = el.cloneNode(true);
        // 未完了の方を先に非表示にする
        el.classList.add('display_none');
        // もろもろスタイルなどをたして完了済みに追加
        el_clone.getElementsByTagName('input')[0].checked = 'checked';
        el_clone.getElementsByTagName('label')[0].classList.add('line-through');
        el_clone.getElementsByTagName('label')[0].classList.remove('word-color-black');
        var li = document.querySelector('#finished-tasks > ul > li:first-child');
        document.querySelector('#finished-tasks > ul').insertBefore(el_clone, li);
      },
      // 日付のフォーマット
      customFormatter(date) {
        return moment(date).format('YYYY/MM/DD');
      }
    }
  }
</script>
