class WordwithcommentsSerializer < ActiveModel::Serializer
  attributes :id, :word, :translation, :language, :voice_recording, :amount_likes
  has_many :comments
  has_one :user

  def amount_likes
    object.likes.length
  end
end
