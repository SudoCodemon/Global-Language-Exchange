class Word < ApplicationRecord
  has_many :comments
  has_many :likes
  has_many :users, through: :comments
  belongs_to :user
  has_one_attached :voice_recording

  def voice_url
    Rails.application.routes.url_helpers.rails_blob_path(voice_recording, only_path: true) if voice_recording.attached?
  end
end
