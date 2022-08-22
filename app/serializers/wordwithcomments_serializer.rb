class WordwithcommentsSerializer < ActiveModel::Serializer
  attributes :id, :word, :translation, :language, :voice_recording
  has_many :comments
end
