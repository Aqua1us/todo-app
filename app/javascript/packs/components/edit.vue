<template>
  <div class="row">
    <router-link :to="{ path:'/'}">戻る</router-link>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="タスク名" type="text" id="name" ref="name">
          <label for="name" class="active">タスク名</label>
        </div>
        <div class="input-field col s6">
          <datepicker ref="startdate" id="startdate" :format="this.customFormatter" placeholder="開始日"></datepicker>
          <label for="startdate" class="active">開始日</label>
        </div>
        <div class="input-field col s6">
          <datepicker ref="enddate" id="enddate" :format="this.customFormatter" placeholder="終了日"></datepicker>
          <label for="enddate" class="active"> 終了日</label>
        </div>
        <div class="input-field col s12">
          <input placeholder="メモ" type="text" id="memo" ref="memo">
          <label for="memo" class="active">メモ</label>
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
    components: {
      'datepicker': Datepicker
    },
    mounted: function () {
      this.showTask(this.$router.currentRoute.params.task_id)
    },
    methods: {
      // タスクの表示
      showTask: function (task_id) {
        axios.get('/api/tasks/' + task_id).then((response) => {
          this.$refs.name.value = response.data.task.name
          this.$refs.startdate.value = response.data.task.startdate
          this.$refs.enddate.value = response.data.task.enddate
        }, (error) => {
          console.log(error)
        })
      }
    }
  }
</script>