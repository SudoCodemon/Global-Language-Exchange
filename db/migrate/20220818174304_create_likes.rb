class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.integer :amount_of_likes

      t.timestamps
    end
  end
end
