class WordSerializer < ActiveModel::Serializer
  attributes :id, :word, :translation, :language, :voice_url, :user_id
end
