json.review do
    json.partial! '/api/reviews/review', review: @review
end
  
json.user do
    json.partial! '/api/users/user', user: @review.author
end
  
json.campsite do 
    json.partial! 'api/campsites/campsite', campsite: @review.campsite
end