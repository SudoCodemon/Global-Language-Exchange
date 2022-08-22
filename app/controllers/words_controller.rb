class WordsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create ]
  def index
    render json: Word.all
  end

  def show
    word = find_word
    render json: word, status: :ok
  end

  def create
    word = Word.create!(word_params)
    render json: word, status: :created
  end

  private

  def word_params
    params.require(:post).permit(:word, :translation, :language, :voice_recording, :user_id)
  end

  def find_word
    Word.find(params[:id])
  end
end
