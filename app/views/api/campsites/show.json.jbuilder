
json.campsite do

    json.extract! @campsite, :id, :name, :location, :city, :state, :lat, :lng, :description, :price, :capacity, :site_type, :host_id
    json.photoUrl @campsite.photos.map{|photo| photo.url}
    
    if (@campsite.reviews.length != 0)  
        reviews = @campsite.reviews
        total_rating = (reviews.count { |el| el.recomended }) * 100.0 / reviews.length
    else 
        total_rating = 0
    end
    json.rating total_rating
    json.num_rating @campsite.reviews.length
end

json.reviews do 
    @campsite.reviews.each do |review|
        json.set! review.id do 
            json.author_name review.author.first_name + " "+ review.author.last_name[0] + "."
            json.extract! review, :id, :title, :body, :rating, :recomended, :author_id, :campsite_id
        end
    end
end


