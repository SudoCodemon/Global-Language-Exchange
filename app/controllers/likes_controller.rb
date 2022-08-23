class LikesController < ApplicationController
  skip_before_action :authorize, only: [:create ]

  def create
    like = Like.create!(like_params)
    render json: like, status: :ok
  end

  private
  
  def like_params
    params.permit(:user_id, :word_id)
  end
end
