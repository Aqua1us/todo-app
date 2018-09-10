
<template>
  <div>
    <!-- 新規タスク入力 -->
    <div class="row margin-default">
      <div class="input-field col s12 m6">
        <input v-model="newTask" id="new-task-name" class="form-control padding-default" placeholder="ここにタスクを入力してください">
        <label for="new-task-name" class="active">タスク名</label>
      </div>
      <div class="input-field col s12 m2">
        <datepicker v-model="startdate" id="new-task-startdate" :format="this.customFormatter" placeholder="開始日"></datepicker>
        <label for="new-task-startdate" class="active">開始日</label>
      </div>
      <div class="input-field col s12 m2">
        <datepicker v-model="enddate" id="new-task-enddate" :format="this.customFormatter" placeholder="終了日"></datepicker>
        <label for="new-task-enddate" class="active">終了日</label>
      </div>
      <div class="col s12 m2">
        <el-button type="primary" icon="el-icon-plus" v-on:click="createTask" circle></el-button>
      </div>
    </div>
    <!-- 新規タスク入力 -->
    <div class="row collection-header valign-wrapper grid-header margin-zero">
      <div class="col s12 m1"></div>
      <div class="col s12 m5">タスク名</div>
      <div class="col s12 m2">開始日</div>
      <div class="col s12 m2">終了日</div>
      <div class="col s12 m1"></div>
      <div class="col s12 m1"></div>
    </div>
    <transition-group tag="div" name="grid-row" >
      <div v-for="(task, index) in taskList" class="collection margin-zero" v-bind:id="'row_task_' + task.id" :key="task.id">
        <div class="row collection-item valign-wrapper">
          <div class="col s12 m1">
            <input type="checkbox" v-bind:id="'task_' + task.id" v-on:change="doneTask(task.id)" :checked="task.is_done"/>
            <label v-bind:for="'task_' + task.id" class=""></label>
          </div>
          <div class="col s12 m5">{{ task.name }}</div>
          <div class="col s12 m2">{{ customFormatter(task.startdate) }}</div>
          <div class="col s12 m2">{{ customFormatter(task.enddate) }}</div>
          <div class="col s12 m1">
            <router-link :to="{ name:'edit', params:{task_id:task.id} }">
              <el-button type="primary" icon="el-icon-edit" plain circle></el-button>
            </router-link>
          </div>
          <div class="col s12 m1">
            <el-button type="primary" icon="el-icon-delete"  v-on:click="destoryTask(task.id, index)" plain circle></el-button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import axios from 'axios';
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      'datepicker': Datepicker
    },
    data: function () {
      return {
        tasks: [],
        newTask: '',
        startdate: '',
        enddate: '',
        events: [
        ],
        config: {
          defaultView: 'month',
          weekends: true,
          eventRender: function(event, element) {
            console.log(event)
          }
      },
      }
    },
    computed: {
      taskList() {
        return this.$store.getters.allTasks
      }
    },
    mounted: function () {
      this.fetchTasks();
    },
    methods: {
      // タスクの表示
      fetchTasks: function () {
        axios.get('/api/tasks').then((response) => {
          this.$store.commit('setTasks', response.data.tasks)
        }, (error) => {
          console.log(error)
        })
      },
      // タスクの登録
      createTask: function () {
        if (!this.newTask) return;
        axios.post('/api/tasks', { task: { name: this.newTask, startdate: this.startdate, enddate: this.enddate } }).then((response) => {
          this.$store.commit('addTask', response.data.task)
          this.newTask = '';
          this.startdate = '';
          this.enddate = '';
        }, (error) => {
          console.log(error);
        });
      },
      // タスクの完了
      doneTask: function (task_id) {
        var el = document.querySelector('#task_' + task_id);
        var done = el.checked ? 1 : 0;
        axios.put('/api/tasks/' + task_id, { task: { is_done: done } }).then((response) => {
        }, (error) => {
          console.log(error);
        });
      },
      // タスクの削除
      destoryTask: function (task_id, index) {
        axios.delete('/api/tasks/' + task_id ).then((response) => {
          this.$store.commit('deleteTask', index)
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
      }
    }
  }
</script>
