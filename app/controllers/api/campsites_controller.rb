class Api::CampsitesController < ApplicationController

    def index
        @campsites = Campsite.all
        render :index
    end


    def show
        @campsite = Campsite.find(params[:id])
        if @campsite
            render :show
        else
            render json: { errors: 'Campsite not found'}, status: 404
        end
    end


    private

    # def campsite_params
    #     params.require(:campsite).permit(:name, :location, :city, :state, :lat, :lng, :description, :price, :capacity, :site_type, :host_id, photos: [])
    # end
end
