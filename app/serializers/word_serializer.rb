class WordSerializer < ActiveModel::Serializer
  attributes :id, :word, :translation, :language, :voice_url, :user_id, :amount_likes

  def amount_likes
    object.likes.length
  end
end
