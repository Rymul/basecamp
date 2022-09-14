# == Schema Information
#
# Table name: bookings
#
#  id            :bigint           not null, primary key
#  campsite_id   :bigint           not null
#  customer_id   :bigint           not null
#  host_id       :bigint           not null
#  adults        :integer          default(1), not null
#  children      :integer
#  pets          :integer
#  price         :float            not null
#  checkin_date  :datetime         not null
#  checkout_date :datetime         not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Booking < ApplicationRecord

    validates :campsite_id, :customer_id, :host_id, :adults, :price, 
        :checkin_date, :checkout_date, presence: true

    belongs_to :customer,
        foreign_key: :customer_id,
        class_name: :User

    # belongs_to :owner,
    #     foreign_key: :owner_id,
    #     class_name: :User

    belongs_to :campsite
end
