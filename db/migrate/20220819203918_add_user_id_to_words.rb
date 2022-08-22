class AddUserIdToWords < ActiveRecord::Migration[7.0]
  def change
    add_column :words, :user_id, :integer
  end
end
