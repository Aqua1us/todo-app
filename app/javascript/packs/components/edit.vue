<template>
  <div>
    <router-link :to="{ path:'/'}">戻る</router-link>
    <p>タスク詳細</p>
    <input type="text" id="name" ref="name"><br>
    <input type="text" id="is_done" ref="is_done"><br>
    <input type="text" id="startdate" ref="startdate"><br>
    <input type="text" id="enddate" ref="enddate"><br>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex'

export default {
  mounted: function () {
    this.showTask(this.$router.currentRoute.params.task_id)
  },
  methods: {
    // タスクの表示
    showTask: function (task_id) {
      axios.get('/api/tasks/' + task_id).then((response) => {
        this.$refs.name.value = response.data.task.name
        this.$refs.is_done.value = response.data.task.is_done
        this.$refs.startdate.value = response.data.task.startdate
        this.$refs.enddate.value = response.data.task.enddate
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>