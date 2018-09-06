export default {
  state: {
    tasks: []
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
