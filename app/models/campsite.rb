# == Schema Information
#
# Table name: campsites
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  location    :string           not null
#  city        :string           not null
#  state       :string           not null
#  lat         :float            not null
#  lng         :float            not null
#  description :text             not null
#  price       :integer          not null
#  capacity    :integer          not null
#  site_type   :string           not null
#  host_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Campsite < ApplicationRecord
    validates :location, :city, :state, :lat, :lng, :description, 
              :price, :capacity, :site_type, :host_id, presence: true
    validates :name, uniqueness: true

    has_many_attached :photos
    
end
