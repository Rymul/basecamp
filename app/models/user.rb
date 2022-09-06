# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  zipcode         :integer
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :first_name, :last_name, :password_digest, presence: true
    validates :session_token, presence: true, uniqueness: true
    validates :email, uniqueness: true,
              length: { in: 3..255 }, 
              format: { with: URI::MailTo::EMAIL_REGEXP, message: "is invalid"}
    validates :password, length: {minimum: 6}, allow_nil: true

    before_validation :ensure_session_token

    # has_many :bookings,
    #     dependent: :destroy

    # has_many :booked_campsites,
    #     through: :bookings,
    #     source: :campsite

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user&.authenticate(password)
            return user
        else
            return nil 
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_token
        save!
        session_token
    end

    def ensure_session_token
        self.session_token ||= generate_unique_token
    end

    def generate_unique_token
        while true
          token = SecureRandom.urlsafe_base64
          return token unless User.exists?(session_token: token)
        end
    end
end
