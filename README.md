# Basecamp
---
---

[Live site](https://base-camp.herokuapp.com/)

Basecamp is a full-stack clone of hipcamp.com, a campground booking app similar to Airbnb.


Technologies:
---
---

* Ruby on Rails
* React.js
* Redux.js
* Node.js
* PostgreSQL
* Webpack
* Amazon AWS S3
* Google Maps API

Basecamp is built with a Ruby on Rails backend framework. The frontend utilizes React and Redux to create a dynamic single page application. All data is stored through PostgreSQL database, with photos for campsites being uploaded and stored through Amazon AWS S3. These technologies allow users to smoothly navigate throughout the site and allow for dynamic creation, updating, and deleting of bookings and reviews.


Features:
---
---

User Authentication:
---

* Users can sign up for an account on Basecamp. They can also log in to view their profile page.
* Users can log in or sign up via the buttons in the top right corner. Once logged in they those buttons are replaced with Logout and Profile buttons. 
* If a visitor does not want to create an account, they can log in as a Demo User. This provides them with full access to Basecamp's campsite, review, and booking features.


Campsites:
---

* Users can navigate through a collection of listed campsites on the home page.
* When a campsite is selected, the campsite's show page is rendered displaying relevant information.


Booking:
---

* If a user is logged in, when they navigate to a campsite's show page they will see a hovering booking form on the right side of the screen.
* The date picker was created using the React-Date-Range library, giving users a simple and easy-to-use design for picking a start and end date for their reservation.
* Once a booking is made, they will be navigated to their user profile page and see a list of all bookings they have created.
* Here users can update or remove bookings.
* When a user is not logged in the booking form will be hidden from view.

Reviews:
---

* At the bottom of the campsite show page, users will see all reviews created for that campsite.
* If they have left a review, they will be able to edit or remove said review.


Implementation Timeline:
---
---

1. Hosing on Heroku (09/02/2022)

2. New account creation, login, and guest/demo login (09/03/2022, 2 Days)
* Users can sign up, sign in, and log out
* Users can use a demo login to try the site
* Users will have a currentUser show page that displays their bookings while allowing them to create, edit, and delete bookings
* Users can't use certain feature without logging in (bookings/reviews)

3. Campgrounds (09/05/2022, 3 Days)
* Users can search for and reserve campgrounds
* Campgrounds will show information such a description, list of amenities, price, availability, etc.

4. Bookings (09/07/2022, 2 Days)
* Logged in users can reserve campgrounds
* Users can create, update, edit, and destroy reservations

5. Reviews (09/09/2022 2, Days)
* Logged in users can create reviews, update, edit, and destroy reviews
* Users can indicate if the campground is recommended (boolean)
* Each review will display the users first name and first character of their last name
* Each campground will indicate a total number of reviews 

6. Campground Search using Google Maps (09/11/2022, 2 Days)
* Users can search by location to find campsites
* Searching for a campsite will display its location on google maps

7. Production README (09/13/2022, 0.5 Days) 


Bonus Features:
---
---

* Saved campsites displayed on profile page
* Authored reviews displayed on profile page


To Do:
---
---

* Make Search bar functional
* Add Mapping on campsite show and search results
* Fix guest dropdown to include toggling numbers for adults, children, and pets
* Make date select dropdown a modal
* Allow campsites to have more than 5 pictures, with a button to Show More
* Campsite details partially hidden with a Show More button
* Build Tags table - use to make campsite show more dynamic
* Build mock checkout page
