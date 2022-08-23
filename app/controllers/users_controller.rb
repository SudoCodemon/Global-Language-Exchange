class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :show]

  def index
    render json: User.all
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :ok
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :user)
  end
end
