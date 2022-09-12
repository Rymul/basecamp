json.extract! review, :id, :author_id, :campsite_id, :title, :body, :rating, :recommended, :updated_at
json.author_name review.author.first_name + " "+ review.author.last_name[0] + "."

# if (review.author) 
#     author_name = review.author.first_name + " "+ review.author.last_name[0] + "."
#     json.author_name = author_name
# end 