class Api::ReviewsController < ApplicationController

    before_action :require_logged_in
    wrap_parameters include: Review.attribute_names + [:campsiteId] + [:authorId]

    def create
        # @review = current_user.reviews.new(review_params)
        @review = Review.new(review_params)
        if @review.save
          render :show
        else
          render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @review = current_user.reviews.find(params[:id])
        if @review
            if @review.update(review_params)
                render :show 
            else
                render json: { errors: @review.errors.full_messages }, status: 422
            end
        else 
            render json: "Review is not found", status: 422
        end
    end

    def destroy
        @review = current_user.reviews.find(params[:id])
        unless @review
            render json: { message: 'Unauthorized' }, status: :unauthorized
            return
        end
        @review.destroy
        render :show
    end

    private

    def review_params
        params.require(:review).permit(:title, :body, :rating, :recomended, :campsite_id, :author_id)
    end
end

