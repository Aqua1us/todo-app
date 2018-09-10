<template>
  <div class="row">
    <router-link :to="{ path:'/'}">戻る</router-link>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" v-model="name" placeholder="タスク名" type="text">
          <label for="name" class="active">タスク名</label>
        </div>
        <div class="input-field col s6">
          <datepicker id="startdate" v-model="startdate" :format="this.customFormatter" placeholder="開始日"></datepicker>
          <label for="startdate" class="active">開始日</label>
        </div>
        <div class="input-field col s6">
          <datepicker id="enddate" v-model="enddate" :format="this.customFormatter" placeholder="終了日"></datepicker>
          <label for="enddate" class="active"> 終了日</label>
        </div>
        <div class="input-field col s12">
          <input id="memo" placeholder="メモ" type="text">
          <label for="memo" class="active">メモ</label>
        </div>
        <div class="input-field col s12">
          <button class="btn waves-effect waves-light" v-on:click="updateTask" >
            保存する<i class="material-icons right">save</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import Datepicker from 'vuejs-datepicker';
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: function () {
      return {
        name: '',
        startdate: '',
        enddate: '',
        memo: ''
      }
    },
    components: {
      'datepicker': Datepicker
    },
    mounted: function () {
      // 編集中のタスクIDをセット
      this.$store.commit('setEditTaskID', this.$router.currentRoute.params.task_id)
      // タスクの表示
      this.showTask()
    },
    methods: {
      // タスクの表示
      showTask: function () {
        let task_id = this.$store.getters.editTaskId
        axios.get('/api/tasks/' + task_id).then((response) => {
          this.name = response.data.task.name
          this.startdate = response.data.task.startdate
          this.enddate = response.data.task.enddate
        }, (error) => {
          console.log(error)
        })
      },
      // タスクの保存
      updateTask: function () {
        let task_id = this.$store.getters.editTaskId
        axios.put('/api/tasks/' + task_id, { task: { name: this.name, startdate: this.startdate, enddate: this.enddate } }).then((response) => {
        }, (error) => {
          console.log(error);
        });
      },
    }
  }
</script>