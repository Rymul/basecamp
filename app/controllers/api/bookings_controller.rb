class Api::BookingsController < ApplicationController

    before_action :require_logged_in
    wrap_parameters include: Booking.attribute_names + [:campsiteId] + [:customerId] + [:hostId] + [:checkinDate] + [:checkoutDate]


    def index
        @bookings = current_user.bookings
        render :index
    end

    def show
        @booking = Booking.find_by(id: params[:id])
        render :show
    end

    def create
        @booking = Booking.new(booking_params)
        if @booking.save
            render :show
        else
            render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @booking = current_user.bookings.find(params[:id])
        if @booking
            if @booking.update(booking_params)
                render :show 
            else
                render json: @booking.errors.full_messages, status: 422
            end
        else 
            render json: "Reservation is not found", status: 422
        end
    end

    def destroy
        @booking = current_user.bookings.find(params[:id])
        unless @booking
            render json: { message: 'Unauthorized' }, status: :unauthorized
            return
        end
        @booking.destroy
        render :show
    end

    private

    def booking_params
        params.require(:booking).permit(:campsite_id, :customer_id, :host_id, :adults, :children, :pets, :price, :checkin_date, :checkout_date)
    end
end

