class AddWordToLikes < ActiveRecord::Migration[7.0]
  def change
    add_reference :likes, :word, null: false, foreign_key: true
  end
end
