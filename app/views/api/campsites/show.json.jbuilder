json.campsite do
    debugger
    json.extract! @campsite, :id, :name, :location, :city, :state, :lat, :lng, :description, :price, :capacity, :site_type, :host_id
    json.photoUrl campsite.photos.url
end
