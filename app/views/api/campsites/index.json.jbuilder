



@campsites.each do |campsite|
    json.set! campsite.id do 
        json.extract! campsite, :id, :name, :location, :city, :state, :price, :site_type, :capacity, :lat, :lng
        if campsite.photos.attached?
            json.photo_url campsite.photos.map { |campsite| campsite.url }
        end
        if (campsite.reviews.length != 0)  
            reviews = campsite.reviews
            total_rating = (reviews.count { |el| el.recomended }) * 100.0 / reviews.length
        else 
            total_rating = 0
        end
        json.rating total_rating
        json.num_rating campsite.reviews.length    
    end 
end 