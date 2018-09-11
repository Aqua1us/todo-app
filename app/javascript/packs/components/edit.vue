<template>
  <div class="row">
    <form class="col s12" autocomplete="off">
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
          <input id="memo" v-model="memo" placeholder="メモ" type="text">
          <label for="memo" class="active">メモ</label>
        </div>
        <div class="input-field col s2">
          <router-link :to="{ path:'/'}">
            <el-button type="info" icon="el-icon-back" plain>戻る</el-button>
          </router-link>
        </div>
        <div class="input-field col s2">
          <el-button type="primary" icon="el-icon-document"  v-on:click="updateTask" plain>保存</el-button>
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
          this.memo = response.data.task.memo
        }, (error) => {
          console.log(error)
        })
      },
      // タスクの保存
      updateTask: function () {
        this.$confirm('保存しますか？', {
          confirmButtonText: 'はい',
          cancelButtonText: 'いいえ'
        }).then(() => {
          let task_id = this.$store.getters.editTaskId
          axios.put('/api/tasks/' + task_id, { task: { name: this.name, startdate: this.startdate, enddate: this.enddate, memo: this.memo } }).then((response) => {
          this.$message({type: 'success', message: '保存しました。'})
          }, (error) => {
            this.$message({type: 'error', message: '保存に失敗しました'})
            console.log(error);
          });
        }).catch(() => {
          this.$message({type: 'info', message: 'キャンセルしました。'})
        });
      }
    }
  }
</script>