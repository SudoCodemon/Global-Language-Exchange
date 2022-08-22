class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment
  belongs_to :word
  belongs_to :user
end
