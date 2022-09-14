json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :created_at, :updated_at
    json.display_name @user.first_name + " "+ @user.last_name[0] + "."
end


json.bookings do 
    @user.bookings.each do |booking|
        json.set! booking.id do 
            json.extract! booking, :id, :campsite_id, :customer_id, :host_id, :adults, :children, :pets, :price, :checkin_date, :checkout_date
        end
    end
end