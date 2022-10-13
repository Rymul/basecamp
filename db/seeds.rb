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
    Booking.destroy_all
    Review.destroy_all
    Campsite.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    %w(bookings reviews campsites users).each do |table_name|    
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


    c16 = Campsite.create!(
        name: 'Southgate Summit', 
        location: 'Yosemite National Park', 
        city: 'Oakhurst', 
        state: 'California', 
        lat: 37.492527765550506, 
        lng: -119.69818753388319, 
        description: "This area was once inhabited by local native American Tribes. In the 1840's prospectors arrived in search of gold but none was found in the immediate area. Old Yosemite Base camp was along the route into Yosemite National Park prior to the construction of Highway 41. Horse and Carriage traveled along Old Yosemite Road from Mariposa and the entire golden state.", 
        price: 26, 
        capacity: 14, 
        site_type: 'tent', 
        host_id: 6
    )  
    c16_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-valley-floor-fog.jpg'), filename: 'yos-valley-floor-fog.jpg'}
    c16_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-hammock.jpg'), filename: 'tent-hammock.jpg'}
    c16_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/river-trees.jpg'), filename: 'river-trees.jpg'}
    c16_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/morning-trees.jpg'), filename: 'morning-trees.jpg'}
    c16_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-road.jpg'), filename: 'halfdome-road.jpg'}
    c16.photos.attach([c16_p1, c16_p2, c16_p3, c16_p4, c16_p5])
    


    c9 = Campsite.create!(
        name: 'Black Rock', 
        location: 'Joshua Tree National Park', 
        city: 'Joshua Tree', 
        state: 'Califoria', 
        lat: 34.073, 
        lng: -116.39, 
        description: "Sleep and adventure within one of Joshua Tree National Park's densest Joshua Tree forests at Black Rock Campground. Black Rock is a quiet and family-friendly Joshua Tree camping location that can be good for both seasoned and first-time campers.", 
        price: 19, 
        capacity: 22, 
        site_type: 'tent', 
        host_id: 10
    ) 
    p15 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-rocks-2.jpg'), filename: 'joshua-rocks-2.jpg'}
    p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/desert-tent.jpg'), filename: 'desert-tent.jpg'}
    p18 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars.jpg'), filename: 'joshua-tents-cars.jpg'}
    p27 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-2.jpg'), filename: 'tent-stars-2.jpg'}
    p17 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars-2.jpg'), filename: 'joshua-tents-cars-2.jpg'}
    c9.photos.attach([p15, p4, p18, p27, p17])
    
    c12 = Campsite.create!(
        name: "The Aventure Haven", 
        location: 'Arches National Park', 
        city: 'Moab', 
        state: 'Utah', 
        lat: 38.651991125196986, 
        lng: -109.54209554073255, 
        description: "What kind of people LIKE the Adventure Haven? Those who like peace and quiet and dark skies. Relaxed full-time RVers, work-at-homes who need strong and fast WiFi, folks on a budget, people looking for inside local information, solo travelers who want to feel safe yet not in a crowded place - like they're near someone they know, and in a quiet, small town where unusual things are noticed.", 
        price: 21, 
        capacity: 20, 
        site_type: 'RV', 
        host_id: 12
    ) 
    p31 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/moab-arch.jpg'), filename: 'moab-arch.jpg'}
    p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/desert-tent.jpg'), filename: 'desert-tent.jpg'}
    p17 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars-2.jpg'), filename: 'joshua-tents-cars-2.jpg'}
    p26 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-1.jpg'), filename: 'tent-stars-1.jpg'}
    p27 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-2.jpg'), filename: 'tent-stars-2.jpg'}
    c12.photos.attach([p31, p4, p17, p26, p27])
    
    #-----
    
    c2 = Campsite.create!(
        name: 'Eel River', 
        location: 'Mendocino National Forest', 
        city: 'Cooks Valley', 
        state: 'California', 
        lat: 39.824730923242015, 
        lng: -123.08496299099748, 
        description: "This property is conveniently located in historic highway 101. It's 4.5 terraced acres overlooking the south fork Eel River. It is adjacent to the Reggae on the River and Northern Nights festival sites. It's less than a mile from the tourist attraction One Log house and Richardson Grove state park. The property is a permitted educational cannabis farm implementing regenerative agriculture practices. We have several accommodation options! You can stay in our fully furnished bell tent tucked away in a charming garden. It has a full bed with foam topper, charge station, lounge chair, fan or heater, wireless speaker, and wifi. The property has hot outdoor shower and viewing bluff overlooking Eel river. Enjoy convenient hwy 101 location close to state park and dispensary. Wake up, dine and stroll in this dreamy garden! We also have camping and  RV sites that have morning shade, and epic views and two levels of camping area.", 
        price: 56, 
        capacity: 8, 
        site_type: 'tent', 
        host_id: 3
    )
    
    c2_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-swinminghole.jpg'), filename: 'eel-river-swinminghole.jpg'}
    c2_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-forest.jpg'), filename: 'eel-river-forest.jpg'}
    c2_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-meadow.jpg'), filename: 'eel-river-meadow.jpg'}
    c2_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-river.jpg'), filename: 'eel-river-river.jpg'}
    c2_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-tent-2.jpg'), filename: 'eel-river-tent-2.jpg'}
    c2.photos.attach([c2_p1, c2_p2, c2_p3, c2_p4, c2_p5])
    
    #-----
    
    
    #-----
    
    c4 = Campsite.create!(name: 'Lost Coast Escape', location: 'Kings Range Wilderness', city: 'Ferndale', state: 'California', lat: 40.57508050945906, lng: -124.31372211937196, description: "80 acres of seclusion in the hills of the Lost Coast. Looking to get away from it all? Look no further! This place is REMOTE! The last 5 miles (25 mins) out of the town of Petrolia, is really rugged and steep. The Lost Platform is a raised sleeping platform with phenomenal views located five miles form Petrolia. There is space for several tents as well and would be great spot for a large group. You MUST have a 4-wheel or All wheel vehicle with clearance to access all sites and the property.", price: 75, capacity: 3, site_type: 'tent', host_id: 2)
    c4_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-view-tent.jpg'), filename: 'lost-coast-view-tent.jpg'}
    c4_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-view.jpg'), filename: 'lost-coast-view.jpg'}
    c4_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-tent-firepit.jpg'), filename: 'lost-coast-tent-firepit.jpg'}
    c4_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-tent-platform.jpg'), filename: 'lost-coast-tent-platform.jpg'}
    c4_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-picnictable.jpg'), filename: 'lost-coast-picnictable.jpg'}
    c4.photos.attach([c4_p1, c4_p2, c4_p3, c4_p4, c4_p5])
    # #-----
    c5 = Campsite.create!(name: 'Salmon Creak Ranch', location: 'Sonoma Coast', city: 'Bodega Bay', state: 'California', lat: 38.34957802807386, lng: -123.0015615924026, description: "Located within 45 minutes of the wine country and 2 miles from the coast, our property is 400 acres of rolling hills and redwood groves, with a creek running along its base. With miles of trails meandering through quiet woods and meadows, you will be able to revel in the tranquility of a private preserve, without sacrificing easy access to some of Sonoma County's most famous attractions. A hundred years ago, this land was used to graze sheep. Remnants of the old fence lines can still be seen in places, along with old cement troughs. Since then, the land has been left to its own devices, passing through many hands, most famously owned by two brothers in the 1980's who built a truly amazing tree house in the forest which has been featured in several magazine articles. It was revamped and updated in 2016 by a master craftsman, using fallen redwood logs found on the property and is now a unique structural work of art, available for overnight stays.", price: 120, capacity: 3, site_type: 'tent', host_id: 3)
    c5_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-ranch-forest.jpg'), filename: 'salmon-creek-ranch-forest.jpg'}
    c5_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-rv.jpg'), filename: 'salmon-creek-rv.jpg'}
    c5_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-cow-view.jpg'), filename: 'salmon-creek-cow-view.jpg'}
    c5_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-picnictable.jpg'), filename: 'salmon-creek-picnictable.jpg'}
    c5_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-dog-view.jpg'), filename: 'salmon-creek-dog-view.jpg'}
    c5.photos.attach([c5_p1, c5_p2, c5_p3, c5_p4, c5_p5])
    # #-----
    c6 = Campsite.create!(name: 'Willow Creek Campground', location: 'Humbolt County', city: 'Willow Creek', state: 'California', lat: 40.89225210435479, lng: -123.6816379945421, description: "This historic lumber mill site is now a pristine Willow Creek frontage camping location conveniently located just 40 minutes from the coast and 4 miles from the town of Willow Creek and also the Trinity River. This campground is located in a large 7 acre opening along the pristine Willow Creek in Humboldt County, CA. Campers will find themselves just off the highway and conveniently located only 4 miles west from the town of Willow Creek and the Trinity River and 40 minutes from the coast.", price: 40, capacity: 4, site_type: 'tent', host_id: 4)
    c6_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-view.jpg'), filename: 'willow-creek-view.jpg'}
    c6_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-firepit.jpg'), filename: 'willow-creek-firepit.jpg'}
    c6_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-river.jpg'), filename: 'willow-creek-river.jp'}
    c6_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-tent.jpg'), filename: 'willow-creek-tent.jpg'}
    c6_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-picnictable-tree.jpg'), filename: 'willow-creek-picnictable-tree.jpg'}
    c6.photos.attach([c6_p1, c6_p2, c6_p3, c6_p4, c6_p5])
    
    
    
    c14 = Campsite.create!(
        name: "Wide Open Spaces", 
        location: 'Arches National Park', 
        city: 'Moab', 
        state: 'Utah', 
        lat: 38.82137661254279, 
        lng: -109.5159731768854, 
        description: "Peace and quiet. Close to many recreational activities including biking, hiking, river activities, ballooning, sky diving, climbing, etc.", 
        price: 15, 
        capacity: 25, 
        site_type: 'tent', 
        host_id: 12
    )  
    p32 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/moab-rock-wall.jpg'), filename: 'moab-rock-wall.jpg'}
    p18 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars.jpg'), filename: 'joshua-tents-cars.jpg'}
    p26 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-1.jpg'), filename: 'tent-stars-1.jpg'}
    p14 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-road.jpg'), filename: 'joshua-road.jpg'}
    p27 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-2.jpg'), filename: 'tent-stars-2.jpg'}
    c14.photos.attach([p32, p18, p26, p14, p27])
    

    c1 = Campsite.create!(
        name: 'Colfax Spring', 
        location: 'Yosemite National Park', 
        city: 'Groveland', 
        state: 'California', 
        lat: 37.82482448900685, 
        lng: -120.02927737061506, 
        description: "Welcome to Yosemite's Colfax Spring! Home to a basecamp for river rafting trips during the summertime, we are located 15 minutes driving distance to the entrance to Yosemite National Park. If you are staying with us between May - September and want to come rafting, ask us about our river trips! Our camp sits on a ridge with views down into the Tuolumne River Canyon. The Tuolumne River begins at 13,000 feet of elevation in the High Country of Tuolumne Meadows and provides drinking water for over 2.7 million people in San Francisco. With cedar and pine trees, manzanita bushes, and wildflowers in the spring, enjoy the Sierras' flora and fauna. Our family has been operating our river rafting company for nearly 50 years, the last 11 of those years being here at Colfax Spring. Conveniently located off Highway 120, we are in close proximity to countless swimming holes, hikes, and more.", 
        price: 45, 
        capacity: 10, 
        site_type: 'tent', 
        host_id: u2.id
    )
    
    c1_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-van.jpg'), filename: 'yosemite-colfax-spring-van.jpg'}
    c1_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-tent.jpg'), filename: 'yosemite-colfax-spring-tent.jpg'}
    c1_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-picnictable.jpg'), filename: 'yosemite-colfax-spring-picnictable.jpg'}
    c1_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-view.jpg'), filename: 'yosemite-colfax-spring-view.jpg'}
    c1_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-cabin-bathrooms.jpg'), filename: 'yosemite-colfax-spring-cabin-bathrooms.jpg'}
    c1.photos.attach([c1_p1, c1_p2, c1_p3, c1_p4, c1_p5])
    


    c3 = Campsite.create!(
        name: 'Ocean Forest', 
        location: 'Mendocino National Forest', 
        city: 'Fort Brag', 
        state: 'California', 
        lat: 39.34041361095649, 
        lng: -123.79546054913347, 
        description: "Ocean Forest is a Nature Lover''s dream Retreat on the Mendocino Coast. Peaceful, pristine forest with magical Old Growth Redwood groves overlooking beautiful views of the Ocean. The Retreat has 3 newly constructed 10x12ft cozy cabins. The Garden and Honeybear Cabins have French doors with old growth forest views, quaint wood-stoves, private outdoor fire pits, seating areas, hammocks and are surrounded by enchanting nature. The Earth Cabin has a covered Gathering Area with Earthen benches, a firebrick oven, outdoor kitchen, and fire-bowl. Ocean view tent and van camping sites are also available. The land is bordered by miles of remote hiking and biking trails through the forest. Just a short drive to the stunning coastal trails in Mackerricher State Park, famous Glass beach, 10 Mile Beach, and much more. Things to be aware of: The cabins have new Queen Sized memory foam beds. Please bring your own warm bedding. Our property is Off-the-Grid with a generator to provide lighting for the cabins. There are 2 Eco-composting toilets and an outdoor shower and bathtub tub nestled in a redwood grove. All are shared facilities. Send Inquires if you are interested in booking the entire property for private retreats, small gatherings, private family camping trips etc. We look forward to welcoming you to this unique and magical forest Retreat.", 
        price: 108, 
        capacity: 2, 
        site_type: 'cabin', 
        host_id: 2
    )
    c3_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-view.jpg'), filename: 'fort-brag-ocean-forest-view.jpg'}
    c3_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-cabin.jpg'), filename: 'fort-brag-ocean-forest-cabin.jpg'}
    c3_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-firepit.jpg'), filename: 'fort-brag-ocean-forest-firepit.jpg'}
    c3_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-view-from-cabin.jpg'), filename: 'fort-brag-ocean-forest-view-from-cabin.jpg'}
    c3_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-trees.jpg'), filename: 'fort-brag-ocean-forest-trees.jpg'}
    c3.photos.attach([c3_p1, c3_p2, c3_p3, c3_p4, c3_p5])
    
    
    
    # Joshua Tree
    
    c7 = Campsite.create!(
        name: "Hidden Valley Campground", 
        location: 'Joshua Tree National Park', 
        city: 'Joshua Tree', 
        state: 'Califoria', 
        lat: 34.017,
        lng: -116.162, 
        description: "Hidden Valley Campground is a good option for those looking to sleep among starry skies near the center of the park on their next Joshua Tree camping adventure. Popular among hikers and climbers, the campground is sitatued in a beautiful desert landscape with easy trail and climbing access.", 
        price: 46, 
        capacity: 20, 
        site_type: 'tent', 
        host_id: 4
    )    
    p28 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-3.jpg'), filename: 'tent-stars-3.jpg'}
    p18 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars.jpg'), filename: 'joshua-tents-cars.jpg'}
    p14 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-road.jpg'), filename: 'joshua-road.jpg'}
    p19 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-trees-1.jpg'), filename: 'joshua-trees-1.jpg'}
    p17 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars-2.jpg'), filename: 'joshua-tents-cars-2.jpg'}
    c7.photos.attach([p28, p18, p14, p19, p17])
    
    c8 = Campsite.create!(
        name: 'White Tank Campground', 
        location: 'Joshua Tree National Park', 
        city: 'Joshua Tree', 
        state: 'Califoria', 
        lat: 33.984, 
        lng: -116.017, 
        description: "If desert camping is on your radar, set your sights upon White Tank Campground at Joshua Tree National Park, where scrambling around striking rock formations and stargazing among some of the darkest evening skies in Southern California are just a few of the highlights.", 
        price: 23, 
        capacity: 12, 
        site_type: 'tent', 
        host_id: 10
    )  
    p19 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-trees-1.jpg'), filename: 'joshua-trees-1.jpg'}
    p17 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars-2.jpg'), filename: 'joshua-tents-cars-2.jpg'}
    p26 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-1.jpg'), filename: 'tent-stars-1.jpg'}
    p27 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-2.jpg'), filename: 'tent-stars-2.jpg'}
    p16 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-rocks.jpg'), filename: 'joshua-rocks.jpg'}
    c8.photos.attach([p17, p16, p26, p19, p27])
    
    
    c10 = Campsite.create!(
        name: 'Belle Campground', 
        location: 'Joshua Tree National Park', 
        city: 'Joshua Tree', 
        state: 'Califoria', 
        lat: 34.002, 
        lng: -116.018, 
        description: "If you're looking for a unique travel experience in the American southwest, Joshua Tree camping is not to be missed. Experience the best in Joshua Tree National Park camping, a visually appealing desert landscape dotted with Joshua trees, shrubs, large granite boulders, and starry night skies.", 
        price: 23, 
        capacity: 18, 
        site_type: 'tent', 
        host_id: 10
    )  
    p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/desert-1.jpg'), filename: 'desert-1.jpg'}
    p14 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-road.jpg'), filename: 'joshua-road.jpg'}
    p16 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-rocks.jpg'), filename: 'joshua-rocks.jpg'}
    p19 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-trees-1.jpg'), filename: 'joshua-trees-1.jpg'}
    p28 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-3.jpg'), filename: 'tent-stars-3.jpg'}
    c10.photos.attach([p16, p14, p3, p28, p19])

    
    
    c11 = Campsite.create!(
        name: "Palm's Ranch", 
        location: 'Joshua Tree National Park', 
        city: 'Joshua Tree', 
        state: 'Califoria', 
        lat: 34.17757061681074, 
        lng: -116.33652801968873, 
        description: "Get ready to kickback and enjoy the 360° views of snow capped Mt Big Bear and Mt Jacinto to the west, the Mesa's own 3400ft Bartlett Mountain to the east, acres of ancient Joshua Trees, yucca plants, vibrant cholla cactus and untouched desert all around.", 
        price: 21, 
        capacity: 20, 
        site_type: 'tent', 
        host_id: 11
    )  
    p18 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars.jpg'), filename: 'joshua-tents-cars.jpg'}
    p15 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-rocks-2.jpg'), filename: 'joshua-rocks-2.jpg'}
    p19 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-trees-1.jpg'), filename: 'joshua-trees-1.jpg'}
    p26 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-1.jpg'), filename: 'tent-stars-1.jpg'}
    p24 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-night-desert.jpg'), filename: 'tent-night-desert.jpg'}
    c11.photos.attach([p19, p15, p18, p26, p24])

    
    #Moab ----
    
    
    
    
    c13 = Campsite.create!(
        name: "High Sage Expanse", 
        location: 'Arches National Park', 
        city: 'La Sal', 
        state: 'Utah', 
        lat: 38.41241555467877,
        lng: -109.2390168263919, 
        description: "Situated at 7,000 feet, campers are surrounded by the snow covered LaSal Mountains overlooking the deep Canyonlands NP of the Colorado River escarpment, and only 30 minutes from Moab, Utah. Summer temps are much cooler here than in the surrounding canyons and valleys of the Moab area, a very pleasant retreat from the heat!", 
        price: 21, 
        capacity: 22, 
        site_type: 'tent', 
        host_id: 12
    )  
    p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/desert-1.jpg'), filename: 'desert-1.jpg'}
    p28 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-3.jpg'), filename: 'tent-stars-3.jpg'}
    p18 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars.jpg'), filename: 'joshua-tents-cars.jpg'}
    p15 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-rocks-2.jpg'), filename: 'joshua-rocks-2.jpg'}
    p14 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-road.jpg'), filename: 'joshua-road.jpg'}
    c13.photos.attach([p3, p28, p14, p18, p15])

    
    
    
    c15 = Campsite.create!(
        name: 'Madrone Tree Hill', 
        location: 'Yosemite National Park', 
        city: 'Wawona', 
        state: 'California', 
        lat: 37.57377707731761,
        lng: -119.57998084679015, 
        description: "Camp under the stars in the foothills of the Sierra Nevada mountains. There are two streams that run through it, with a hill that separates them. Half the property is covered in a pine forest (with some secluded campsites) with the balance being Christmas trees, Manzanita brush, Madrone trees, and open areas (for larger group campers).", 
        price: 18, 
        capacity: 26, 
        site_type: 'tent', 
        host_id: 6
    )  
    p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-valley-floor-clear.jpg'), filename: 'yos-valley-floor-clear.jpg'}
    p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/camp-cups.jpg'), filename: 'camp-cups.jpg'}
    p8 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-trail-2.jpg'), filename: 'forest-trail-2.jpg'}
    p9 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-trail.jpg'), filename: 'forest-trail.jpg'}
    p12 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-deer.jpg'), filename: 'halfdome-deer.jpg'}
    c15.photos.attach([p1, p9, p2, p12, p8])

    
    c17 = Campsite.create!(
        name: 'Pohono Ranch', 
        location: 'Yosemite National Park', 
        city: 'El Protal', 
        state: 'California', 
        lat: 37.737361392733995,
        lng: -119.71784095757809, 
        description: "Pohono Ranch is perched on the east side of Ferguson Ridge in Mariposa County, California. Elevation ranges from 3500 ft to 4000 ft. Views are immense in all directions! Looking east are views of El Capitan, the high Sierras, Wawona, the Merced river canyon, and Yosemite National Park.", 
        price: 23, 
        capacity: 12, 
        site_type: 'tent', 
        host_id: 8
    )  
    p6 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/dog-tent.jpg'), filename: 'dog-tent.jpg'}
    p7 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-mountains.jpg'), filename: 'forest-mountains.jpg'}
    p11 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/green-area-tents.jpg'), filename: 'green-area-tents.jpg'}
    p12 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-deer.jpg'), filename: 'halfdome-deer.jpg'}
    p30 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-valley-floor-fog.jpg'), filename: 'yos-valley-floor-fog.jpg'}
    c17.photos.attach([p30, p12, p6, p7, p11])
    
    
    c18 = Campsite.create!(
        name: 'Whitlock Creek Oaks', 
        location: 'Yosemite National Park', 
        city: 'Buena Vista', 
        state: 'California', 
        lat: 37.720957264861596, 
        lng: -119.78034696041948, 
        description: "This property is in the historic Whitlock Mining district five miles north of the town of Mariposa. The district is east of the Mother Lode gold belt and includes the Colorado, Sherlock Creek, and Whiskey Flat areas. The area was placer-mined soon after the beginning of the gold rush, and lode mining began shortly afterward.", 
        price: 40, 
        capacity: 8, 
        site_type: 'tent', 
        host_id: 5
    )  
    p10 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/girls-in-hammock.jpg'), filename: 'girls-in-hammock.jpg'}
    p13 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-road.jpg'), filename: 'halfdome-road.jpg'}
    p21 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/river-trees.jpg'), filename: 'river-trees.jpg'}
    p22 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/sun-through-trees.jpg'), filename: 'sun-through-trees.jpg'}
    p29 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-trees.jpg'), filename: 'yos-trees.jpg'}
    c18.photos.attach([p13, p29, p10, p21, p22])

    
    c19 = Campsite.create!(
        name: 'Camp SweetBerry', 
        location: 'Yosemite National Park', 
        city: 'Oakhurst', 
        state: 'California', 
        lat: 37.38529157933399, 
        lng: -119.64532431384359, 
        description: "Welcome to Camp SweetBerry! Here, you can park your home-on-wheels in a private space with a view. You can enjoy the feeling of rural seclusion while within walking distance from shops and restaurants in Oakhurst.", 
        price: 33, 
        capacity: 9, 
        site_type: 'RV', 
        host_id: 9
    )  
    p29 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-trees.jpg'), filename: 'yos-trees.jpg'}
    p8 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-trail-2.jpg'), filename: 'forest-trail-2.jpg'}
    p20 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/morning-trees.jpg'), filename: 'morning-trees.jpg'}
    p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/camp-cups.jpg'), filename: 'camp-cups.jpg'}
    p9 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-trail.jpg'), filename: 'forest-trail.jpg'}
    c19.photos.attach([p29, p8, p20, p9, p2])

    
    
    c20 = Campsite.create!(
        name: 'Yosemite Ridge', 
        location: 'Yosemite National Park', 
        city: 'Groveland', 
        state: 'California', 
        lat: 37.84047699356082, 
        lng: -120.05321533616289, 
        description: "Come hang at our awesome campground located just 11 miles outside of Yosemite National Park. Towards the top of the property and have amazing views of the surrounding area. Please respect the land and leave no trace.", 
        price: 35, 
        capacity: 9, 
        site_type: 'tent', 
        host_id: 7
    )  
    p6 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/dog-tent.jpg'), filename: 'dog-tent.jpg'}
    p7 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-mountains.jpg'), filename: 'forest-mountains.jpg'}
    p8 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-trail-2.jpg'), filename: 'forest-trail-2.jpg'}
    p23 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-hammock.jpg'), filename: 'tent-hammock.jpg'}
    p13 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-road.jpg'), filename: 'halfdome-road.jpg'}
    c20.photos.attach([p7, p13, p8, p6, p23])

    
    
    
    c21 = Campsite.create!(
        name: 'Slice of Heaven', 
        location: 'Yosemite National Park', 
        city: 'Mariposa', 
        state: 'California', 
        lat: 37.53447782595239, 
        lng: -119.90310041172832, 
        description: "Camp on our small piece of paradise located near Yosemite. Feel free to wander around the property on a few of our trails or just chill by the water and enjoy the magic of the mountains. Dogs are more than welcome as long as they are ok with our dog wandering around. He's super sweet loves everybody.", 
        price: 100, 
        capacity: 5, 
        site_type: 'cabin', 
        host_id: 7
    )  
    p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-valley-floor-clear.jpg'), filename: 'yos-valley-floor-clear.jpg'}
    p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/camp-cups.jpg'), filename: 'camp-cups.jpg'}
    p12 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-deer.jpg'), filename: 'halfdome-deer.jpg'}
    p21 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/river-trees.jpg'), filename: 'river-trees.jpg'}
    p30 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-valley-floor-fog.jpg'), filename: 'yos-valley-floor-fog.jpg'}
    c21.photos.attach([p12, p1, p2, p21, p30])

    


    # p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-valley-floor-clear.jpg'), filename: 'yos-valley-floor-clear.jpg'}
    
    # p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/camp-cups.jpg'), filename: 'camp-cups.jpg'}
    
    # p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/desert-1.jpg'), filename: 'desert-1.jpg'}
    
    # p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/desert-tent.jpg'), filename: 'desert-tent.jpg'}
    
    # p6 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/dog-tent.jpg'), filename: 'dog-tent.jpg'}
    
    # p7 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-mountains.jpg'), filename: 'forest-mountains.jpg'}
    
    # p8 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-trail-2.jpg'), filename: 'forest-trail-2.jpg'}
    
    # p9 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/forest-trail.jpg'), filename: 'forest-trail.jpg'}
    
    # p10 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/girls-in-hammock.jpg'), filename: 'girls-in-hammock.jpg'}
    
    # p11 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/green-area-tents.jpg'), filename: 'green-area-tents.jpg'}
    
    # p12 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-deer.jpg'), filename: 'halfdome-deer.jpg'}
    
    # p13 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-road.jpg'), filename: 'halfdome-road.jpg'}
    
    # p14 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-road.jpg'), filename: 'joshua-road.jpg'}
    
    # p15 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-rocks-2.jpg'), filename: 'joshua-rocks-2.jpg'}
    
    # p16 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-rocks.jpg'), filename: 'joshua-rocks.jpg'}
    
    # p17 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars-2.jpg'), filename: 'joshua-tents-cars-2.jpg'}
    
    # p18 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-tents-cars.jpg'), filename: 'joshua-tents-cars.jpg'}
    
    # p19 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/joshua-trees-1.jpg'), filename: 'joshua-trees-1.jpg'}
    
    # p20 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/morning-trees.jpg'), filename: 'morning-trees.jpg'}
    
    # p21 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/river-trees.jpg'), filename: 'river-trees.jpg'}
    
    # p22 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/sun-through-trees.jpg'), filename: 'sun-through-trees.jpg'}
    
    # p23 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-hammock.jpg'), filename: 'tent-hammock.jpg'}
    
    # p24 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-night-desert.jpg'), filename: 'tent-night-desert.jpg'}
    
    # p25 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-over-valley.jpg'), filename: 'tent-over-valley.jpg'}
    
    # p26 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-1.jpg'), filename: 'tent-stars-1.jpg'}
    
    # p27 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-2.jpg'), filename: 'tent-stars-2.jpg'}
    
    # p28 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/tent-stars-3.jpg'), filename: 'tent-stars-3.jpg'}
    
    # p29 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-trees.jpg'), filename: 'yos-trees.jpg'}
    
    # p30 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/yos-valley-floor-fog.jpg'), filename: 'yos-valley-floor-fog.jpg'}
    
    # p31 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/moab-arch.jpg'), filename: 'moab-arch.jpg'}
    
    # p32 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/moab-rock-wall.jpg'), filename: 'moab-rock-wall.jpg'}
    
    
    #Joshua Tree
    # c7.photos.attach([p28, p18, p14, p19, p17])
    # c8.photos.attach([p17, p16, p26, p19, p27])
    # c9.photos.attach([p15, p4, p18, p27, p17])
    # c10.photos.attach([p16, p14, p3, p28, p19])
    # c11.photos.attach([p19, p15, p18, p26, p19])
    
    # Moab
    # c12.photos.attach([p31, p4, p17, p26, p27])
    # c13.photos.attach([p3, p28, p14, p18, p15])
    # c14.photos.attach([p32, p18, p26, p14, p27])
    
    # Yosemite
    # c15.photos.attach([p1, p9, p2, p12, p8])
    # c16.photos.attach([p13, p30, p20, p21, p23])
    # c17.photos.attach([p30, p12, p6, p7, p11])
    # c18.photos.attach([p13, p29, p10, p21, p22])
    # c19.photos.attach([p29, p8, p9, p20, p2])
    # c20.photos.attach([p7, p13, p8, p6, p23])
    # c21.photos.attach([p12, p1, p2, p21, p30])
    


    # YOSEMITE

    # c1 = Campsite.create!(
    #     name: 'Colfax Spring', 
    #     location: 'Yosemite National Park', 
    #     city: 'Groveland', 
    #     state: 'California', 
    #     lat: 37.82482448900685, 
    #     lng: -120.02927737061506, 
    #     description: "Welcome to Yosemite's Colfax Spring! Home to a basecamp for river rafting trips during the summertime, we are located 15 minutes driving distance to the entrance to Yosemite National Park. If you are staying with us between May - September and want to come rafting, ask us about our river trips! Our camp sits on a ridge with views down into the Tuolumne River Canyon. The Tuolumne River begins at 13,000 feet of elevation in the High Country of Tuolumne Meadows and provides drinking water for over 2.7 million people in San Francisco. With cedar and pine trees, manzanita bushes, and wildflowers in the spring, enjoy the Sierras' flora and fauna. Our family has been operating our river rafting company for nearly 50 years, the last 11 of those years being here at Colfax Spring. Conveniently located off Highway 120, we are in close proximity to countless swimming holes, hikes, and more.", 
    #     price: 45, 
    #     capacity: 10, 
    #     site_type: 'tent', 
    #     host_id: u2.id
    # )

    # c1_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-van.jpg'), filename: 'yosemite-colfax-spring-van.jpg'}
    # c1_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-tent.jpg'), filename: 'yosemite-colfax-spring-tent.jpg'}
    # c1_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-picnictable.jpg'), filename: 'yosemite-colfax-spring-picnictable.jpg'}
    # c1_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-view.jpg'), filename: 'yosemite-colfax-spring-view.jpg'}
    # c1_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/yosemite-colfax-spring-cabin-bathrooms.jpg'), filename: 'yosemite-colfax-spring-cabin-bathrooms.jpg'}
    # c1.photos.attach([c1_p1, c1_p2, c1_p3, c1_p4, c1_p5])
    


    # c15 = Campsite.create!(
    #     name: 'Madrone Tree Hill', 
    #     location: 'Yosemite National Park', 
    #     city: 'Wawona', 
    #     state: 'California', 
    #     lat: 37.57377707731761,
    #     lng: -119.57998084679015, 
    #     description: "Camp under the stars in the foothills of the Sierra Nevada mountains. There are two streams that run through it, with a hill that separates them. Half the property is covered in a pine forest (with some secluded campsites) with the balance being Christmas trees, Manzanita brush, Madrone trees, and open areas (for larger group campers).", 
    #     price: 18, 
    #     capacity: 26, 
    #     site_type: 'tent', 
    #     host_id: 6
    # )  

    # c15_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/halfdome-deer.jpg'), filename: 'halfdome-deer.jpg'}
    # c15_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/camp-cups.jpg'), filename: 'camp-cups.jpg'}
    # c15_p3 = {io: URI.open(''), filename: ''}
    # c15_p4 = {io: URI.open(''), filename: ''}
    # c15_p5 = {io: URI.open(''), filename: ''}
    # c15.photos.attach([c15_p1, c15_p2, c15_p3, c15_p4, c15_p5])

    # c16 = Campsite.create!(
    #     name: 'Southgate Summit', 
    #     location: 'Yosemite National Park', 
    #     city: 'Oakhurst', 
    #     state: 'California', 
    #     lat: 37.492527765550506, 
    #     lng: -119.69818753388319, 
    #     description: "This area was once inhabited by local native American Tribes. In the 1840's prospectors arrived in search of gold but none was found in the immediate area. Old Yosemite Base camp was along the route into Yosemite National Park prior to the construction of Highway 41. Horse and Carriage traveled along Old Yosemite Road from Mariposa and the entire golden state.", 
    #     price: 26, 
    #     capacity: 14, 
    #     site_type: 'tent', 
    #     host_id: 6
    # )  

    # c16_p1 = {io: URI.open(''), filename: ''}
    # c16_p2 = {io: URI.open(''), filename: ''}
    # c16_p3 = {io: URI.open(''), filename: ''}
    # c16_p4 = {io: URI.open(''), filename: ''}
    # c16_p5 = {io: URI.open(''), filename: ''}
    # c16.photos.attach([c16_p1, c16_p2, c16_p3, c16_p4, c16_p5])



    # c17 = Campsite.create!(
    #     name: 'Pohono Ranch', 
    #     location: 'Yosemite National Park', 
    #     city: 'El Protal', 
    #     state: 'California', 
    #     lat: 37.737361392733995,
    #     lng: -119.71784095757809, 
    #     description: "Pohono Ranch is perched on the east side of Ferguson Ridge in Mariposa County, California. Elevation ranges from 3500 ft to 4000 ft. Views are immense in all directions! Looking east are views of El Capitan, the high Sierras, Wawona, the Merced river canyon, and Yosemite National Park.", 
    #     price: 23, 
    #     capacity: 12, 
    #     site_type: 'tent', 
    #     host_id: 8
    # )  

    # c17_p1 = {io: URI.open(''), filename: ''}
    # c17_p2 = {io: URI.open(''), filename: ''}
    # c17_p3 = {io: URI.open(''), filename: ''}
    # c17_p4 = {io: URI.open(''), filename: ''}
    # c17_p5 = {io: URI.open(''), filename: ''}
    # c17.photos.attach([c17_p1, c17_p2, c17_p3, c17_p4, c17_p5])


    # c18 = Campsite.create!(
    #     name: 'Whitlock Creek Oaks', 
    #     location: 'Yosemite National Park', 
    #     city: 'Buena Vista', 
    #     state: 'California', 
    #     lat: 37.720957264861596, 
    #     lng: -119.78034696041948, 
    #     description: "This property is in the historic Whitlock Mining district five miles north of the town of Mariposa. The district is east of the Mother Lode gold belt and includes the Colorado, Sherlock Creek, and Whiskey Flat areas. The area was placer-mined soon after the beginning of the gold rush, and lode mining began shortly afterward.", 
    #     price: 40, 
    #     capacity: 8, 
    #     site_type: 'tent', 
    #     host_id: 5
    # )  

    # c18_p1 = {io: URI.open(''), filename: ''}
    # c18_p2 = {io: URI.open(''), filename: ''}
    # c18_p3 = {io: URI.open(''), filename: ''}
    # c18_p4 = {io: URI.open(''), filename: ''}
    # c18_p5 = {io: URI.open(''), filename: ''}
    # c18.photos.attach([c18_p1, c18_p2, c18_p3, c18_p4, c18_p5])



    # c19 = Campsite.create!(
    #     name: 'Camp SweetBerry', 
    #     location: 'Yosemite National Park', 
    #     city: 'Oakhurst', 
    #     state: 'California', 
    #     lat: 37.38529157933399, 
    #     lng: -119.64532431384359, 
    #     description: "Welcome to Camp SweetBerry! Here, you can park your home-on-wheels in a private space with a view. You can enjoy the feeling of rural seclusion while within walking distance from shops and restaurants in Oakhurst.", 
    #     price: 33, 
    #     capacity: 9, 
    #     site_type: 'RV', 
    #     host_id: 9
    # )  

    # c19_p1 = {io: URI.open(''), filename: ''}
    # c19_p2 = {io: URI.open(''), filename: ''}
    # c19_p3 = {io: URI.open(''), filename: ''}
    # c19_p4 = {io: URI.open(''), filename: ''}
    # c19_p5 = {io: URI.open(''), filename: ''}
    # c19.photos.attach([c19_p1, c19_p2, c19_p3, c19_p4, c19_p5])


    # c20 = Campsite.create!(
    #     name: 'Yosemite Ridge', 
    #     location: 'Yosemite National Park', 
    #     city: 'Groveland', 
    #     state: 'California', 
    #     lat: 37.84047699356082, 
    #     lng: -120.05321533616289, 
    #     description: "Come hang at our awesome campground located just 11 miles outside of Yosemite National Park. Towards the top of the property and have amazing views of the surrounding area. Please respect the land and leave no trace.", 
    #     price: 35, 
    #     capacity: 9, 
    #     site_type: 'tent', 
    #     host_id: 7
    # )  

    # c20_p1 = {io: URI.open(''), filename: ''}
    # c20_p2 = {io: URI.open(''), filename: ''}
    # c20_p3 = {io: URI.open(''), filename: ''}
    # c20_p4 = {io: URI.open(''), filename: ''}
    # c20_p5 = {io: URI.open(''), filename: ''}
    # c20.photos.attach([c20_p1, c20_p2, c20_p3, c20_p4, c20_p5])



    # c21 = Campsite.create!(
    #     name: 'Slice of Heaven', 
    #     location: 'Yosemite National Park', 
    #     city: 'Mariposa', 
    #     state: 'California', 
    #     lat: 37.53447782595239, 
    #     lng: -119.90310041172832, 
    #     description: "Camp on our small piece of paradise located near Yosemite. Feel free to wander around the property on a few of our trails or just chill by the water and enjoy the magic of the mountains. Dogs are more than welcome as long as they are ok with our dog wandering around. He's super sweet loves everybody.", 
    #     price: 100, 
    #     capacity: 5, 
    #     site_type: 'cabin', 
    #     host_id: 7
    # )  

    # c21_p1 = {io: URI.open(''), filename: ''}
    # c21_p2 = {io: URI.open(''), filename: ''}
    # c21_p3 = {io: URI.open(''), filename: ''}
    # c21_p4 = {io: URI.open(''), filename: ''}
    # c21_p5 = {io: URI.open(''), filename: ''}
    # c21.photos.attach([c21_p1, c21_p2, c21_p3, c21_p4, c21_p5])







    # #-----
    
    # c2 = Campsite.create!(
    #     name: 'Eel River', 
    #     location: 'Mendocino National Forest', 
    #     city: 'Cooks Valley', 
    #     state: 'California', 
    #     lat: 39.824730923242015, 
    #     lng: -123.08496299099748, 
    #     description: "This property is conveniently located in historic highway 101. It's 4.5 terraced acres overlooking the south fork Eel River. It is adjacent to the Reggae on the River and Northern Nights festival sites. It's less than a mile from the tourist attraction One Log house and Richardson Grove state park. The property is a permitted educational cannabis farm implementing regenerative agriculture practices. We have several accommodation options! You can stay in our fully furnished bell tent tucked away in a charming garden. It has a full bed with foam topper, charge station, lounge chair, fan or heater, wireless speaker, and wifi. The property has hot outdoor shower and viewing bluff overlooking Eel river. Enjoy convenient hwy 101 location close to state park and dispensary. Wake up, dine and stroll in this dreamy garden! We also have camping and  RV sites that have morning shade, and epic views and two levels of camping area.", 
    #     price: 56, 
    #     capacity: 8, 
    #     site_type: 'tent', 
    #     host_id: 3
    # )

    # c2_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-swinminghole.jpg'), filename: 'eel-river-swinminghole.jpg'}
    # c2_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-forest.jpg'), filename: 'eel-river-forest.jpg'}
    # c2_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-meadow.jpg'), filename: 'eel-river-meadow.jpg'}
    # c2_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-river.jpg'), filename: 'eel-river-river.jpg'}
    # c2_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/eel-river-tent-2.jpg'), filename: 'eel-river-tent-2.jpg'}
    # c2.photos.attach([c2_p1, c2_p2, c2_p3, c2_p4, c2_p5])
    
    # #-----

    # c3 = Campsite.create!(
    #     name: 'Ocean Forest', 
    #     location: 'Mendocino National Forest', 
    #     city: 'Fort Brag', 
    #     state: 'California', 
    #     lat: 39.34041361095649, 
    #     lng: -123.79546054913347, 
    #     description: "Ocean Forest is a Nature Lover''s dream Retreat on the Mendocino Coast. Peaceful, pristine forest with magical Old Growth Redwood groves overlooking beautiful views of the Ocean. The Retreat has 3 newly constructed 10x12ft cozy cabins. The Garden and Honeybear Cabins have French doors with old growth forest views, quaint wood-stoves, private outdoor fire pits, seating areas, hammocks and are surrounded by enchanting nature. The Earth Cabin has a covered Gathering Area with Earthen benches, a firebrick oven, outdoor kitchen, and fire-bowl. Ocean view tent and van camping sites are also available. The land is bordered by miles of remote hiking and biking trails through the forest. Just a short drive to the stunning coastal trails in Mackerricher State Park, famous Glass beach, 10 Mile Beach, and much more. Things to be aware of: The cabins have new Queen Sized memory foam beds. Please bring your own warm bedding. Our property is Off-the-Grid with a generator to provide lighting for the cabins. There are 2 Eco-composting toilets and an outdoor shower and bathtub tub nestled in a redwood grove. All are shared facilities. Send Inquires if you are interested in booking the entire property for private retreats, small gatherings, private family camping trips etc. We look forward to welcoming you to this unique and magical forest Retreat.", 
    #     price: 108, 
    #     capacity: 2, 
    #     site_type: 'cabin', 
    #     host_id: 2
    # )
    # c3_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-view.jpg'), filename: 'fort-brag-ocean-forest-view.jpg'}
    # c3_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-cabin.jpg'), filename: 'fort-brag-ocean-forest-cabin.jpg'}
    # c3_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-firepit.jpg'), filename: 'fort-brag-ocean-forest-firepit.jpg'}
    # c3_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-view-from-cabin.jpg'), filename: 'fort-brag-ocean-forest-view-from-cabin.jpg'}
    # c3_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/fort-brag-ocean-forest-trees.jpg'), filename: 'fort-brag-ocean-forest-trees.jpg'}
    # c3.photos.attach([c3_p1, c3_p2, c3_p3, c3_p4, c3_p5])
    # #-----

    # c4 = Campsite.create!(name: 'Lost Coast Escape', location: 'Kings Range Wilderness', city: 'Ferndale', state: 'California', lat: 40.57508050945906, lng: -124.31372211937196, description: "80 acres of seclusion in the hills of the Lost Coast. Looking to get away from it all? Look no further! This place is REMOTE! The last 5 miles (25 mins) out of the town of Petrolia, is really rugged and steep. The Lost Platform is a raised sleeping platform with phenomenal views located five miles form Petrolia. There is space for several tents as well and would be great spot for a large group. You MUST have a 4-wheel or All wheel vehicle with clearance to access all sites and the property.", price: 75, capacity: 3, site_type: 'tent', host_id: 2)
    # c4_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-view-tent.jpg'), filename: 'lost-coast-view-tent.jpg'}
    # c4_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-view.jpg'), filename: 'lost-coast-view.jpg'}
    # c4_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-tent-firepit.jpg'), filename: 'lost-coast-tent-firepit.jpg'}
    # c4_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-tent-platform.jpg'), filename: 'lost-coast-tent-platform.jpg'}
    # c4_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/lost-coast-picnictable.jpg'), filename: 'lost-coast-picnictable.jpg'}
    # c4.photos.attach([c4_p1, c4_p2, c4_p3, c4_p4, c4_p5])
    # # #-----
    # c5 = Campsite.create!(name: 'Salmon Creak Ranch', location: 'Sonoma Coast', city: 'Bodega Bay', state: 'California', lat: 38.34957802807386, lng: -123.0015615924026, description: "Located within 45 minutes of the wine country and 2 miles from the coast, our property is 400 acres of rolling hills and redwood groves, with a creek running along its base. With miles of trails meandering through quiet woods and meadows, you will be able to revel in the tranquility of a private preserve, without sacrificing easy access to some of Sonoma County's most famous attractions. A hundred years ago, this land was used to graze sheep. Remnants of the old fence lines can still be seen in places, along with old cement troughs. Since then, the land has been left to its own devices, passing through many hands, most famously owned by two brothers in the 1980's who built a truly amazing tree house in the forest which has been featured in several magazine articles. It was revamped and updated in 2016 by a master craftsman, using fallen redwood logs found on the property and is now a unique structural work of art, available for overnight stays.", price: 120, capacity: 3, site_type: 'tent', host_id: 3)
    # c5_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-ranch-forest.jpg'), filename: 'salmon-creek-ranch-forest.jpg'}
    # c5_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-rv.jpg'), filename: 'salmon-creek-rv.jpg'}
    # c5_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-cow-view.jpg'), filename: 'salmon-creek-cow-view.jpg'}
    # c5_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-picnictable.jpg'), filename: 'salmon-creek-picnictable.jpg'}
    # c5_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/salmon-creek-dog-view.jpg'), filename: 'salmon-creek-dog-view.jpg'}
    # c5.photos.attach([c5_p1, c5_p2, c5_p3, c5_p4, c5_p5])
    # # #-----
    # c6 = Campsite.create!(name: 'Willow Creek Campground', location: 'Humbolt County', city: 'Willow Creek', state: 'California', lat: 40.89225210435479, lng: -123.6816379945421, description: "This historic lumber mill site is now a pristine Willow Creek frontage camping location conveniently located just 40 minutes from the coast and 4 miles from the town of Willow Creek and also the Trinity River. This campground is located in a large 7 acre opening along the pristine Willow Creek in Humboldt County, CA. Campers will find themselves just off the highway and conveniently located only 4 miles west from the town of Willow Creek and the Trinity River and 40 minutes from the coast.", price: 40, capacity: 4, site_type: 'tent', host_id: 4)
    # c6_p1 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-view.jpg'), filename: 'willow-creek-view.jpg'}
    # c6_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-firepit.jpg'), filename: 'willow-creek-firepit.jpg'}
    # c6_p3 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-river.jpg'), filename: 'willow-creek-river.jp'}
    # c6_p4 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-tent.jpg'), filename: 'willow-creek-tent.jpg'}
    # c6_p5 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/willow-creek-picnictable-tree.jpg'), filename: 'willow-creek-picnictable-tree.jpg'}
    # c6.photos.attach([c6_p1, c6_p2, c6_p3, c6_p4, c6_p5])

    # # Joshua Tree

    # c7 = Campsite.create!(
    #     name: "Hidden Valley Campground", 
    #     location: 'Joshua Tree National Park', 
    #     city: 'Joshua Tree', 
    #     state: 'Califoria', 
    #     lat: 34.017,
    #     lng: -116.162, 
    #     description: "Hidden Valley Campground is a good option for those looking to sleep among starry skies near the center of the park on their next Joshua Tree camping adventure. Popular among hikers and climbers, the campground is sitatued in a beautiful desert landscape with easy trail and climbing access.", 
    #     price: 46, 
    #     capacity: 20, 
    #     site_type: 'tent', 
    #     host_id: 4
    # )    
    # c7_p1 = {io: URI.open(''), filename: ''}
    # c7_p2 = {io: URI.open(''), filename: ''}
    # c7_p3 = {io: URI.open(''), filename: ''}
    # c7_p4 = {io: URI.open(''), filename: ''}
    # c7_p5 = {io: URI.open(''), filename: ''}
    # c7.photos.attach([c7_p1, c7_p2, c7_p3, c7_p4, c7_p5])



    # c8 = Campsite.create!(
    #     name: 'White Tank Campground', 
    #     location: 'Joshua Tree National Park', 
    #     city: 'Joshua Tree', 
    #     state: 'Califoria', 
    #     lat: 33.984, 
    #     lng: -116.017, 
    #     description: "If desert camping is on your radar, set your sights upon White Tank Campground at Joshua Tree National Park, where scrambling around striking rock formations and stargazing among some of the darkest evening skies in Southern California are just a few of the highlights.", 
    #     price: 23, 
    #     capacity: 12, 
    #     site_type: 'tent', 
    #     host_id: 10
    # )  

    # c8_p1 = {io: URI.open(''), filename: ''}
    # c8_p2 = {io: URI.open(''), filename: ''}
    # c8_p3 = {io: URI.open(''), filename: ''}
    # c8_p4 = {io: URI.open(''), filename: ''}
    # c8_p5 = {io: URI.open(''), filename: ''}
    # c8.photos.attach([c8_p1, c8_p2, c8_p3, c8_p4, c8_p5])

    # c9 = Campsite.create!(
    #     name: 'Black Rock Campground', 
    #     location: 'Joshua Tree National Park', 
    #     city: 'Joshua Tree', 
    #     state: 'Califoria', 
    #     lat: 34.073, 
    #     lng: -116.39, 
    #     description: "Sleep and adventure within one of Joshua Tree National Park's densest Joshua Tree forests at Black Rock Campground. Black Rock is a quiet and family-friendly Joshua Tree camping location that can be good for both seasoned and first-time campers.", 
    #     price: 19, 
    #     capacity: 22, 
    #     site_type: 'tent', 
    #     host_id: 10
    # )  

    # c9_p1 = {io: URI.open(''), filename: ''}
    # c9_p2 = {io: URI.open(''), filename: ''}
    # c9_p3 = {io: URI.open(''), filename: ''}
    # c9_p4 = {io: URI.open(''), filename: ''}
    # c9_p5 = {io: URI.open(''), filename: ''}
    # c9.photos.attach([c9_p1, c9_p2, c9_p3, c9_p4, c9_p5])



    # c10 = Campsite.create!(
    #     name: 'Belle Campground', 
    #     location: 'Joshua Tree National Park', 
    #     city: 'Joshua Tree', 
    #     state: 'Califoria', 
    #     lat: 34.002, 
    #     lng: -116.018, 
    #     description: "If you're looking for a unique travel experience in the American southwest, Joshua Tree camping is not to be missed. Experience the best in Joshua Tree National Park camping, a visually appealing desert landscape dotted with Joshua trees, shrubs, large granite boulders, and starry night skies.", 
    #     price: 23, 
    #     capacity: 18, 
    #     site_type: 'tent', 
    #     host_id: 10
    # )  

    # c10_p1 = {io: URI.open(''), filename: ''}
    # c10_p2 = {io: URI.open(''), filename: ''}
    # c10_p3 = {io: URI.open(''), filename: ''}
    # c10_p4 = {io: URI.open(''), filename: ''}
    # c10_p5 = {io: URI.open(''), filename: ''}
    # c10.photos.attach([c10_p1, c10_p2, c10_p3, c10_p4, c10_p5])


    # c11 = Campsite.create!(
    #     name: "Palm's Ranch", 
    #     location: 'Joshua Tree National Park', 
    #     city: 'Joshua Tree', 
    #     state: 'Califoria', 
    #     lat: 34.17757061681074, 
    #     lng: -116.33652801968873, 
    #     description: "Get ready to kickback and enjoy the 360° views of snow capped Mt Big Bear and Mt Jacinto to the west, the Mesa's own 3400ft Bartlett Mountain to the east, acres of ancient Joshua Trees, yucca plants, vibrant cholla cactus and untouched desert all around.", 
    #     price: 21, 
    #     capacity: 20, 
    #     site_type: 'tent', 
    #     host_id: 11
    # )  

    # c11_p1 = {io: URI.open(''), filename: ''}
    # c11_p2 = {io: URI.open(''), filename: ''}
    # c11_p3 = {io: URI.open(''), filename: ''}
    # c11_p4 = {io: URI.open(''), filename: ''}
    # c11_p5 = {io: URI.open(''), filename: ''}
    # c11.photos.attach([c11_p1, c11_p2, c11_p3, c11_p4, c11_p5])


    # #Moab ----




    # c12 = Campsite.create!(
    #     name: "The Aventure Haven", 
    #     location: 'Arches National Park', 
    #     city: 'Moab', 
    #     state: 'Utah', 
    #     lat: 38.651991125196986, 
    #     lng: -109.54209554073255, 
    #     description: "What kind of people LIKE the Adventure Haven? Those who like peace and quiet and dark skies. Relaxed full-time RVers, work-at-homes who need strong and fast WiFi, folks on a budget, people looking for inside local information, solo travelers who want to feel safe yet not in a crowded place - like they're near someone they know, and in a quiet, small town where unusual things are noticed.", 
    #     price: 21, 
    #     capacity: 20, 
    #     site_type: 'RV', 
    #     host_id: 12
    # )  

    # c12_p1 = {io: URI.open(''), filename: ''}
    # c12_p2 = {io: URI.open(''), filename: ''}
    # c12_p3 = {io: URI.open(''), filename: ''}
    # c12_p4 = {io: URI.open(''), filename: ''}
    # c12_p5 = {io: URI.open(''), filename: ''}
    # c12.photos.attach([c12_p1, c12_p2, c12_p3, c12_p4, c12_p5])




    # c13 = Campsite.create!(
    #     name: "High Sage Expanse", 
    #     location: 'Arches National Park', 
    #     city: 'La Sal', 
    #     state: 'Utah', 
    #     lat: 38.41241555467877,
    #     lng: -109.2390168263919, 
    #     description: "Situated at 7,000 feet, campers are surrounded by the snow covered LaSal Mountains overlooking the deep Canyonlands NP of the Colorado River escarpment, and only 30 minutes from Moab, Utah. Summer temps are much cooler here than in the surrounding canyons and valleys of the Moab area, a very pleasant retreat from the heat!", 
    #     price: 21, 
    #     capacity: 22, 
    #     site_type: 'tent', 
    #     host_id: 12
    # )  

    # c13_p1 = {io: URI.open(''), filename: ''}
    # c13_p2 = {io: URI.open(''), filename: ''}
    # c13_p3 = {io: URI.open(''), filename: ''}
    # c13_p4 = {io: URI.open(''), filename: ''}
    # c13_p5 = {io: URI.open(''), filename: ''}
    # c13.photos.attach([c13_p1, c13_p2, c13_p3, c13_p4, c13_p5])



    # c14 = Campsite.create!(
    #     name: "Wide Open Spaces", 
    #     location: 'Arches National Park', 
    #     city: 'Moab', 
    #     state: 'Utah', 
    #     lat: 38.82137661254279, 
    #     lng: -109.5159731768854, 
    #     description: "Peace and quiet. Close to many recreational activities including biking, hiking, river activities, ballooning, sky diving, climbing, etc.", 
    #     price: 15, 
    #     capacity: 25, 
    #     site_type: 'tent', 
    #     host_id: 12
    # )  

    # c14_p1 = {io: URI.open(''), filename: ''}
    # c14_p2 = {io: URI.open('https://base-camp-seed.s3.us-west-1.amazonaws.com/desert/camp-cups.jpg'), filename: 'camp-cups.jpg'}
    # c14_p3 = {io: URI.open(''), filename: ''}
    # c14_p4 = {io: URI.open(''), filename: ''}
    # c14_p5 = {io: URI.open(''), filename: ''}
    # c14.photos.attach([c14_p1, c14_p2, c14_p3, c14_p4, c14_p5])

    # c7 = Campsite.create!(
    #     name: '', 
    #     location: '', 
    #     city: '', 
    #     state: '', 
    #     lat: , 
    #     lng: , 
    #     description: "", 
    #     price: , 
    #     capacity: , 
    #     site_type: '', 
    #     host_id: 
    # )  

    # c7_p1 = {io: URI.open(''), filename: ''}
    # c7_p2 = {io: URI.open(''), filename: ''}
    # c7_p3 = {io: URI.open(''), filename: ''}
    # c7_p4 = {io: URI.open(''), filename: ''}
    # c7_p5 = {io: URI.open(''), filename: ''}
    # c3.photos.attach([c1_p1, c1_p2, c1_p3, c1_p4, c1_p5])

    # c3 = Campsite.create!(name: '', location: '', city: '', state: '', lat: , lng: , description: "", price: , capacity: , site_type: '', host_id: )
    # c3_p1 = {io: URI.open(''), filename: ''}
    # c3.photos.attach([c1_p1, c1_p2, c1_p3, c1_p4, c1_p5])

    puts "Creating reviews..."
    # reviews for c1
    r1 = Review.create!(title: 'Best time of our lives!', body: 'This campsite is amazing! My family and I had a wonderful time exploring the area and spending time in the woods. The host was so lovely, ask her about her soup!', rating: 5, recomended: true, author_id: 1, campsite_id: 1)
    r2 = Review.create!(title: 'Go Here!', body: 'This place is truly amazing. Getting a chance to connect with nature like that was so refreshing.', rating: 5, recomended: true, author_id: 5, campsite_id: 1)
    r3 = Review.create!(title: 'Great time, but so many bugs', body: "We had a wonderful time, if you forget about the swarms of mosquitos that attached us daily. If you go here make sure you bring a lot of bug spray.", rating: 4, recomended: true, author_id: 6, campsite_id: 1)
    # reviews for c2
    r4 = Review.create!(title: 'Wow', body: "Best camping experience by far. The river right next to the site is what did it for me. The water is crystal clear and the sound of gushing water while you sleep is very relaxing.", rating: 5, recomended: true, author_id: 2, campsite_id: 2)
    r5 = Review.create!(title: 'Was not very clean', body: 'I was told this would be a glamping experience. Instead, I had to sleep on the ground there was dirt and bugs everywhere.', rating: 3, recomended: false, author_id: 1, campsite_id: 2)
    r6 = Review.create!(title: "Truly Amazing", body: "This was a truly magical place. The camping spot was beautiful, level, and the water could be seen and heard from the spot. This is an ideal location for campers looking for a safe place to unhook and be outside.", rating: 5, recomended: true, author_id: 6, campsite_id: 2)
    # reviews for c3
    r7 = Review.create!(title: "Not what we exprected", body: "The site was not what we expected, there seemed to be belongings around and in the hut we were staying in. Seems like it could have been a great stay but wasn not quite ready for guests.", rating: 2, recomended: false, author_id: 3, campsite_id: 3)
    r8 = Review.create!(title: "Glamping in the Woods", body: "I could not be more satisfied with this stay, my girlfriend and I were looking for somewhere to escape the upcoming bay area heat wave and found this little spot. It was all just perfect, our cabin was super clean, and everything was so well thought out. ", rating: 5, recomended: true, author_id: 4, campsite_id: 3)
    r9 = Review.create!(title: "Incredible", body: "The property is beautiful such a nice place to wander, feel free and find some peace away from the cities!", rating: 5, recomended: true, author_id: 1, campsite_id: 3)
    # reviews for c4
    r10 = Review.create!(title: "Beautiful", body: "Had an awesome time. Will def. come back again.", rating: 5, recomended: true, author_id: 1, campsite_id: 4)
    r11 = Review.create!(title: "Great Views!", body: "Epic views, epic oak tree, all the camping basics you need (picnic table, drinking water, outhouse), easy access to the ocean. Loved our stay.", rating: 5, recomended: true, author_id: 2, campsite_id: 4)
    r12 = Review.create!(title: "Our second time", body: "The Lost Coast Escape is an absolutely incredible site! We enjoyed our time and couldnt get over the views, hiking and just absolute tranquility.", rating: 5, recomended: true, author_id: 8, campsite_id: 4)
    # reviews for c5
    r13 = Review.create!(title: "Great escape close to home", body: "Very nice and quiet place to be relaxed. Close to bay area.", rating: 4, recomended: true, author_id: 6, campsite_id: 5)
    r14 = Review.create!(title: "Such a beautiful place!", body: "A fun place to camp for a few nights. You definitely need 4w drive and high ground clearance to get to the sites. Lots of nice trails to walk. Recommend wearing pants and long sleeves since there can be some longer grass to walk through for some trails.", rating: 5, recomended: true, author_id: 1, campsite_id: 5)
    r15 = Review.create!(title:"Camping with kids", body: "We love camping at Salmon Creek! This was our second time. It is very private, covered with trees. It is perfect to camp with kids and dogs.", rating: 5, recomended: true, author_id: 4, campsite_id: 5)
    # reviews for c6
    r16 = Review.create!(title: "Camping in a meadow", body: "What a great experience! Less than a minute from a state highway but still very private. Lots of nooks and crannies to explore, a beautiful stream, lovely mountain views.", rating: 4, recomended: true, author_id: 3, campsite_id: 6)
    r17 = Review.create!(title: "Great Place", body: "Lovely location right near the creek. Plenty of space and a very welcoming host! Totally plan on camping here again.", rating: 5, recomended: true, author_id: 7, campsite_id: 6)
    r18 = Review.create!(title: "Will definitely come back", body: "I enjoyed my time here. It was quiet for being near a road. I woke up briefly in the middle of the night was was very happy with how peaceful it was.", rating: 5, recomended: true, author_id: 1, campsite_id: 6)
    
    # r1 = Review.create!(title: , body: , rating: , recomended: , author_id: , campsite_id: )


    puts "Creating bookings..."

    b1 = Booking.create!(campsite_id: 1, customer_id: 1, host_id: c1.host_id, adults: 10,children: 0, pets: 0, price: c1.price*5, checkin_date: "2022-09-20", checkout_date: "2022-09-25")
    b1 = Booking.create!(campsite_id: 2, customer_id: 1, host_id: c2.host_id, adults: 8,children: 0, pets: 0, price: c2.price*4, checkin_date: "2022-10-05", checkout_date: "2022-10-09")
    b1 = Booking.create!(campsite_id: 3, customer_id: 1, host_id: c3.host_id, adults: 2,children: 0, pets: 0, price: c3.price*3, checkin_date: "2022-04-10", checkout_date: "2022-04-13")
    b1 = Booking.create!(campsite_id: 4, customer_id: 1, host_id: c4.host_id, adults: 3,children: 0, pets: 0, price: c3.price*4, checkin_date: "2022-06-09", checkout_date: "2022-06-12")
    
    puts "All Done!"
    # b1 = Booking.create!(campsite_id: , customer_id: , host_id: ,adults:  ,children: 0, pets: 0, price: , checkin_date: , checkin_date: )
    
end
