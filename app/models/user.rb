class User < ApplicationRecord
  has_many :words
  has_many :comments
  has_many :likes
  has_many :words, through: :comments

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true
end
