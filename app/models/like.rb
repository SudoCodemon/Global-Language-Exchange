class Like < ApplicationRecord
  belongs_to :user
  belongs_to :word

  validates :word_id, uniqueness: {scope: :user}
end
