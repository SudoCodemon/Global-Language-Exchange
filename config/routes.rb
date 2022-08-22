Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :words

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  get "/users", to: "users#index"
  get "/users/:id", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/create-word", to: "words#create"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
