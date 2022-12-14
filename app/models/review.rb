# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  body        :text             not null
#  rating      :integer          not null
#  recomended  :boolean          default(FALSE), not null
#  author_id   :bigint           not null
#  campsite_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Review < ApplicationRecord
    validates :title, :body,  presence: true
    validates :rating, inclusion: { in: 1..5, message: "must be between 1 and 5" }
    validates_inclusion_of :recomended, in:[true, false]
    # validate :not_a_duplicate
    validates :author_id, presence: true, uniqueness: { scope: :campsite_id, message: "You have already left a review for this campsite."}

    belongs_to :campsite

    belongs_to :author,
        class_name: :User


    # private

    # def not_a_duplicate
    #     if Review.exists?(author_id: author_id, campsite_id: campsite_id)
    #         errors.add(:base, message: "You have already left a review for this campsite.")
    #     end
    # end
end
