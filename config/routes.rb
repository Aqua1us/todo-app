Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  get '/calendar', to: 'home#index'
  get '/about', to: 'home#index'
  get '/contact', to: 'home#index'
  get '/edit/:task_id', to: 'home#index'

  namespace :api, format: 'json' do
    resources :tasks, only: [:index, :show, :create, :update, :destroy]
    resources :events, only: [:index]
  end
end
