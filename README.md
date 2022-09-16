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

* At the bottom of the campsite show page, users will see all reviews create for that campsite.
* If they have left a review, they will be able to edit or remove said review.