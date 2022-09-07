# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Campsite.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    %w(campsites users).each do |table_name|    
        ApplicationRecord.connection.reset_pk_sequence!(table_name)
    end
    
  
    puts "Creating users..."

    User.create!(
        first_name: 'Demo',
        last_name: 'User',
        email: 'demo@user.com', 
        password: 'password'
    )

    # More users
    10.times do 
        first_name = Faker::Name.first_name
        last_name = Faker::Name.last_name
        email = Faker::Internet.unique.email(name: first_name + ' ' + last_name)

        User.create!({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: 'password'
        }) 
    end
    puts "Creating campsites..."

    c1 = Campsite.create!(name: 'Colfax Spring', location: 'Yosemite National Park', city: 'Yosemite', state: 'California', lat: 12345.6, lng: 12345.6, description: "this is a campsite", price: 45, capacity: 10, site_type: 'tent', host_id: 1)
    file = URI.open('https://base-camp-dev.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-van.jpg')
    c1.photos.attach(io: URI.open('https://base-camp-dev.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-van.jpg'), filename: 'yosemite-colfax-spring-van.jpg')
    # -----


end