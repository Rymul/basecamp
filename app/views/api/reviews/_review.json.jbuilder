json.extract! review, :id, :author_id, :campsite_id, :title, :body, :rating, :recommended, :updated_at


if (review.user) 
    name = review.user.first_name + " "+ review.user.last_name[0] + "."
    json.reviewer name
end 