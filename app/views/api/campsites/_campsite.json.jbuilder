json.extract! campsite, :id, :name, :location, :city, :state, :lat, :lng, :description, :price, :capacity, :site_type, :host_id


json.reviews do 
    json.array! campsite.reviews.ids 
end
  
if (campsite.reviews.length != 0)  
    reviews = campsite.reviews
    total_rating = (reviews.count { |el| el.recommended }) * 100.0 / reviews.length
else 
    total_rating = 0
end

json.rating total_rating