class RemoveColToTasks < ActiveRecord::Migration[5.1]
  def change
    remove_column :tasks, :deadline, :string
  end
end
