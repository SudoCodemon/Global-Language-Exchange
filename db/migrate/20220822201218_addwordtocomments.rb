class Addwordtocomments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :word_id, :integer
  end
end
