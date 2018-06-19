
<template>
  <div>
    <full-calendar :config="config" :events="events"></full-calendar>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';

  export default {
    data: function () {
      return {
        tasks: [],
        newTask: '',
        deadLine: '',
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
    mounted: function () {
      this.fetchEvents();
    },
    methods: {
      // タスクの表示
      fetchEvents: function () {
        axios.get('/api/events').then((response) => {
          for(var i = 0; i < response.data.events.length; i++) {
            this.events.push(response.data.events[i]);
          }
        }, (error) => {
          console.log(error);
        });
      },
      // 日付のフォーマット
      customFormatter(date) {
        if (moment(date).isValid()) {
          return moment(date).format('YYYY/MM/DD');
        }
        return '';
      }
    }
  }
</script>
