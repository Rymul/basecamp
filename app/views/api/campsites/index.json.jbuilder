



@campsites.each do |campsite|
    json.set! campsite.id do 
        json.extract! campsite, :id, :name, :location, :city, :state
        if campsite.photos.attached?
            json.photo_url campsite.photos.map { |campsite| campsite.url}
        end
    end 
end 