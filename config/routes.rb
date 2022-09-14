Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:show, :create, :destroy]
    resources :campsites, only: [:index, :show]
    resources :reviews, only: [:create, :update, :destroy]
    resources :bookings, only: [:index, :show, :create, :update, :destroy]
  end

  # keep this route at bottom
  get '*path', to: "static_pages#frontend_index" 
end
