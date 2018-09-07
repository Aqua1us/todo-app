import moment from 'moment'

export default {
  methods: {
    // 日付のフォーマット
    customFormatter (date) {
      if (moment(date).isValid()) {
        return moment(date).format('YYYY/MM/DD')
      }
      return ''
    }
  }
}
