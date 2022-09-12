json.review do
    json.partial! '/api/reviews/review', review: @review
end
  
# json.author do
#     json.partial! '/api/users/user', author: @review.author
# end
  
json.campsite do 
    json.partial! 'api/campsites/campsite', campsite: @review.campsite
end