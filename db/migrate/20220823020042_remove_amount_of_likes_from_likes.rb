class RemoveAmountOfLikesFromLikes < ActiveRecord::Migration[7.0]
  def change
    remove_column :likes, :amount_of_likes, :integer
  end
end
