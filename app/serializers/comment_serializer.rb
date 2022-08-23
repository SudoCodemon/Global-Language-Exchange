class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user
  belongs_to :word
  belongs_to :user
end
