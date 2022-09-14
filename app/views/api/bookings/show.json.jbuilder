json.booking do
    json.partial! '/api/bookings/booking', booking: @booking
end