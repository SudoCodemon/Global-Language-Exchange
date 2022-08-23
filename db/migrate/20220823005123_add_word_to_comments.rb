class AddWordToComments < ActiveRecord::Migration[7.0]
  def change
    add_reference :comments, :word, null: false, foreign_key: true
  end
end
