export default {
  state: {
    tasks: [
      { name: 'task1 (from state)', startdate: '', enddate: '' },
      { name: 'task2 (from state)', startdate: '', enddate: '' }
    ],
    message: 'this is tasks message'
  },
  getters: {
    allTasks: state => state.tasks
  },
  actions: {
  },
  mutations: {
    // タスクのセット
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    // タスクの追加
    addTask (state, task) {
      state.tasks.unshift(task)
    },
    // タスクの削除
    deleteTask (state, index) {
      state.tasks.splice(index, 1)
    }
  }
}
