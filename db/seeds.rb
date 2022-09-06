# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
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
end