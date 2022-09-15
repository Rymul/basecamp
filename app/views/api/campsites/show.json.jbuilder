
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

    json.host_name @campsite.host.first_name + " " + @campsite.host.last_name[0] + "."
    # json.host_name Campsite.joins(:host).select("users.first_name", "users.last_name").first

    # if @campsite.host_id == user.id
    #     json.host_name user.first_name + " "+ user.last_name[0] + "."
    # end
end

json.reviews do 
    @campsite.reviews.each do |review|
        json.set! review.id do 
            json.author_name review.author.first_name + " "+ review.author.last_name[0] + "."
            json.extract! review, :id, :title, :body, :rating, :recomended, :author_id, :campsite_id, :created_at
        end
    end
end


