json.bookings do 
    @bookings.each do |booking|
        
        json.set! booking.id do
            json.extract! booking, :id, :campsite_id, :customer_id, :host_id, :adults, :children, :pets, :price, :checkin_date, :checkout_date
        end
    end
end

json.campsites do 
    @bookings.each do |booking|
        json.set! booking.campsite.id do
            json.extract! booking.campsite, :id, :name, :location, :city, :state, :lat, :lng, :description, :price, :capacity, :site_type, :host_id
            json.photoUrl booking.campsite.photos.map{|photo| photo.url}
        end
    end
end
