json.booking do
    json.partial! '/api/bookings/booking', booking: @booking
end

json.campsite do 
    json.extract! @booking.campsite, :id, :name, :location, :city, :state, :lat, :lng, :description, :price, :capacity, :site_type, :host_id
    json.photoUrl @booking.campsite.photos.map{|photo| photo.url}
end