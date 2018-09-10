class AddColTasksToMemo < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :memo, :string
  end
end
