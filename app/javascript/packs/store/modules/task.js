export default {
  state: {
    editTaskId: null, // 編集中のタスクID
    tasks: []
  },
  getters: {
    // 編集中のタスクIDを返却
    editTaskId: state => state.editTaskId,
    // 全てのタスクを返却
    allTasks: state => state.tasks
  },
  actions: {
  },
  mutations: {
    // 編集中のタスクIDをセット
    setEditTaskID (state, taskId) {
      state.editTaskId = taskId
    },
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
