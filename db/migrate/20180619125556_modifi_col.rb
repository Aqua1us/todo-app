class ModifiCol < ActiveRecord::Migration[5.1]
  def change
    remove_column :tasks, :deadline, :datetime
    add_column :tasks, :startdate, :datetime
    add_column :tasks, :enddate, :datetime
  end
end
