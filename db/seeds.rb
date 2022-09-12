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
    Review.destroy_all
    Campsite.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    %w(reviews campsites users).each do |table_name|    
        ApplicationRecord.connection.reset_pk_sequence!(table_name)
    end
    
  
    puts "Creating users..."

    u1 = User.create!(
        first_name: 'Demo',
        last_name: 'User',
        email: 'demo@user.com', 
        password: 'password'
    )

    u2 = User.create!(
        first_name: 'Ryan',
        last_name: 'Mullen',
        email: 'ryan@mullen.com', 
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

    c1 = Campsite.create!(name: 'Colfax Spring', location: 'Yosemite National Park', city: 'Groveland', state: 'California', lat: 28.5581, lng: 81.8512, description: "Welcome to Yosemite's Colfax Spring! Home to a basecamp for river rafting trips during the summertime, we are located 15 minutes driving distance to the entrance to Yosemite National Park. If you are staying with us between May - September and want to come rafting, ask us about our river trips! Our camp sits on a ridge with views down into the Tuolumne River Canyon. The Tuolumne River begins at 13,000 feet of elevation in the High Country of Tuolumne Meadows and provides drinking water for over 2.7 million people in San Francisco. With cedar and pine trees, manzanita bushes, and wildflowers in the spring, enjoy the Sierras' flora and fauna. Our family has been operating our river rafting company for nearly 50 years, the last 11 of those years being here at Colfax Spring. Conveniently located off Highway 120, we are in close proximity to countless swimming holes, hikes, and more.", price: 45, capacity: 10, site_type: 'tent', host_id: u1.id)
    # file = URI.open('https://base-camp-dev.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-van.jpg')
    c1_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-van.jpg'), filename: 'yosemite-colfax-spring-van.jpg'}
    c1_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-tent.jpg'), filename: 'yosemite-colfax-spring-tent.jpg'}
    c1_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-picnictable.jpg'), filename: 'yosemite-colfax-spring-picnictable.jpg'}
    c1_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-view.jpg'), filename: 'yosemite-colfax-spring-view.jpg'}
    c1_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-cabin-bathrooms.jpg'), filename: 'yosemite-colfax-spring-cabin-bathrooms.jpg'}
    c1.photos.attach([c1_p1, c1_p2, c1_p3, c1_p4, c1_p5])
    
    
    
    
    
    
    #-----
    # c2 = Campsite.create!(name: 'Eel River', location: 'Mendocino National Forest', city: 'Cooks Valley', state: 'California', lat: 40.0024, lng: 123.7894, description: "This property is conveniently located in historic highway 101. It's 4.5 terraced acres overlooking the south fork Eel River. It is adjacent to the Reggae on the River and Northern Nights festival sites. It's less than a mile from the tourist attraction One Log house and Richardson Grove state park. The property is a permitted educational cannabis farm implementing regenerative agriculture practices. We have several accommodation options! You can stay in our fully furnished bell tent tucked away in a charming garden. It has a full bed with foam topper, charge station, lounge chair, fan or heater, wireless speaker, and wifi. The property has hot outdoor shower and viewing bluff overlooking Eel river. Enjoy convenient hwy 101 location close to state park and dispensary. Wake up, dine and stroll in this dreamy garden! We also have camping and  RV sites that have morning shade, and epic views and two levels of camping area.", price: 56, capacity: 12, site_type: 'tent', host_id: 3)
    # c2.photos.attach(io: URI.open('https://base-camp-dev.s3.us-west-1.amazonaws.com/eel-river-swinminghole.jpg'), filename: 'eel-river-swinminghole.jpg')
    # #-----
    # c3 = Campsite.create!(name: 'Ocean Forest', location: 'Mendocino National Forest', city: 'Fort Brag', state: 'California', lat: 35.1415, lng: 79.0080, description: "Ocean Forest is a Nature Lover''s dream Retreat on the Mendocino Coast. Peaceful, pristine forest with magical Old Growth Redwood groves overlooking beautiful views of the Ocean. The Retreat has 3 newly constructed 10x12ft cozy cabins. The Garden and Honeybear Cabins have French doors with old growth forest views, quaint wood-stoves, private outdoor fire pits, seating areas, hammocks and are surrounded by enchanting nature. The Earth Cabin has a covered Gathering Area with Earthen benches, a firebrick oven, outdoor kitchen, and fire-bowl. Ocean view tent and van camping sites are also available. The land is bordered by miles of remote hiking and biking trails through the forest. Just a short drive to the stunning coastal trails in Mackerricher State Park, famous Glass beach, 10 Mile Beach, and much more. Things to be aware of: The cabins have new Queen Sized memory foam beds. Please bring your own warm bedding. Our property is Off-the-Grid with a generator to provide lighting for the cabins. There are 2 Eco-composting toilets and an outdoor shower and bathtub tub nestled in a redwood grove. All are shared facilities. Send Inquires if you are interested in booking the entire property for private retreats, small gatherings, private family camping trips etc. We look forward to welcoming you to this unique and magical forest Retreat.", price: 108, capacity: 2, site_type: 'cabin', host_id: 2)
    # c3.photos.attach(io: URI.open('https://base-camp-dev.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-view.jpg'), filename: 'fort-brag-ocean-forest-view.jpg')
    # #-----
    # c4 = Campsite.create!(name: 'Lost Coast Escape', location: 'Kings Range Wilderness', city: 'Ferndale', state: 'California', lat: 40.5762, lng: 124.2639, description: "80 acres of seclusion in the hills of the Lost Coast. Looking to get away from it all? Look no further! This place is REMOTE! The last 5 miles (25 mins) out of the town of Petrolia, is really rugged and steep. The Lost Platform is a raised sleeping platform with phenomenal views located five miles form Petrolia. There is space for several tents as well and would be great spot for a large group. You MUST have a 4-wheel or All wheel vehicle with clearance to access all sites and the property.", price: 75, capacity: 3, site_type: 'tent', host_id: 2)
    # c4.photos.attach(io: URI.open('https://base-camp-dev.s3.us-west-1.amazonaws.com/lost-coast-view-tent.jpg'), filename: 'lost-coast-view-tent.jpg')
    # #-----
    # c5 = Campsite.create!(name: 'Salmon Creak Ranch', location: 'Sonoma Coast', city: 'Bodega Bay', state: 'California', lat: 38.3530, lng: 123.0024, description: "Located within 45 minutes of the wine country and 2 miles from the coast, our property is 400 acres of rolling hills and redwood groves, with a creek running along its base. With miles of trails meandering through quiet woods and meadows, you will be able to revel in the tranquility of a private preserve, without sacrificing easy access to some of Sonoma County's most famous attractions. A hundred years ago, this land was used to graze sheep. Remnants of the old fence lines can still be seen in places, along with old cement troughs. Since then, the land has been left to its own devices, passing through many hands, most famously owned by two brothers in the 1980's who built a truly amazing tree house in the forest which has been featured in several magazine articles. It was revamped and updated in 2016 by a master craftsman, using fallen redwood logs found on the property and is now a unique structural work of art, available for overnight stays.", price: 120, capacity: 3, site_type: 'tent', host_id: 3)
    # c5.photos.attach(io: URI.open('https://base-camp-dev.s3.us-west-1.amazonaws.com/salmon-creek-ranch-forest.jpg'), filename: 'salmon-creek-ranch-forest.jpg')
    # #-----
    # c6 = Campsite.create!(name: 'Willow Creek Campground', location: 'Humbolt County', city: 'Willow Creek', state: 'California', lat: 40.9396, lng: 123.6314, description: "This historic lumber mill site is now a pristine Willow Creek frontage camping location conveniently located just 40 minutes from the coast and 4 miles from the town of Willow Creek and also the Trinity River. This campground is located in a large 7 acre opening along the pristine Willow Creek in Humboldt County, CA. Campers will find themselves just off the highway and conveniently located only 4 miles west from the town of Willow Creek and the Trinity River and 40 minutes from the coast.", price: 40, capacity: 4, site_type: 'tent', host_id: 4)
    # c6.photos.attach(io: URI.open('https://base-camp-dev.s3.us-west-1.amazonaws.com/willow-creek-view.jpg'), filename: 'willow-creek-view.jpg')
    

    # c3 = Campsite.create!(name: '', location: '', city: '', state: '', lat: , lng: , description: "", price: , capacity: , site_type: '', host_id: )
    # c3.photos.attach(io: URI.open(''), filename: '')

    puts "Creating reviews..."

    r1 = Review.create!(title: 'Best time of our lives!', body: 'This campsite is amazing! My family and I had a wonderful time exploring the area and spending time in the woods. The host was so lovely, ask her about her soup!', rating: 5, recomended: true, author_id: 1, campsite_id: 1)
    r2 = Review.create!(title: 'Go Here!', body: 'This place is truly amazing. Getting a chance to connect with nature like that was so refreshing.', rating: 5, recomended: true, author_id: 5, campsite_id: 1)
    r3 = Review.create!(title: 'Great time, but so many bugs', body: "We had a wonderful time, if you forget about the swarms of mosquitos that attached us daily. If you go here make sure you bring a lot of bug spray.", rating: 4, recomended: true, author_id: 6, campsite_id: 1)

    # r1 = Review.create!(title: , body: , rating: , recomended: , author_id: , campsite_id: )

end