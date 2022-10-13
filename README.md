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

![user-auth](https://media1.giphy.com/media/XDgZQtMZvvQ0SqpBYT/giphy.gif?cid=790b7611d4c8eca002d88e623dc89043f55ece5d8a6c7a06&rid=giphy.gif&ct=g)


Campsites:
---

* Users can navigate through a collection of listed campsites on the home page.
* When a campsite is selected, the campsite's show page is rendered displaying relevant information.

![campsite-show-demo](https://media4.giphy.com/media/jkV1kq4d1le5zqiGKv/giphy.gif?cid=790b7611c934f60b16e035b0bce84bf1d82b386fc4244a32&rid=giphy.gif&ct=g)

```javascript
@campsites.each do |campsite|
    json.set! campsite.id do 
        json.extract! campsite, :id, :name, :location, :city, :state, :price, :site_type, :capacity, :lat, :lng
        if campsite.photos.attached?
            json.photo_url campsite.photos.map { |campsite| campsite.url }
        end
        if (campsite.reviews.length != 0)  
            reviews = campsite.reviews
            total_rating = (reviews.count { |el| el.recomended }) * 100.0 / reviews.length
        else 
            total_rating = 0
        end
        json.rating total_rating
        json.num_rating campsite.reviews.length    
    end 
end 
```


Booking:
---

* If a user is logged in, when they navigate to a campsite's show page they will see a hovering booking form on the right side of the screen.
* The date picker was created using the React-Date-Range library, giving users a simple and easy-to-use design for picking a start and end date for their reservation.
* Once a booking is made, they will be navigated to their user profile page and see a list of all bookings they have created.

![booking-demo](https://media3.giphy.com/media/LDG9LPZhSvnIaU0y6t/giphy.gif?cid=790b76115848a7a7a71a4a1590ea291512609af196e33a6b&rid=giphy.gif&ct=g)

* Here users can update or remove bookings.
* When a user is not logged in the booking form will be hidden from view.

![booking-update-demo](https://media3.giphy.com/media/lY9SrpEpyBMLfbMmCA/giphy.gif?cid=790b7611a1d4af79ca763c623e7047403c6808154cd762e0&rid=giphy.gif&ct=g)

``` javascript
const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBooking(booking)).then(()=> history.push(`/user/${sessionUser.id}`))
    }

    const handleChange = (field) => {
        return (e)=>{
            let newBooking = Object.assign({}, booking, {[field]: e.currentTarget.value})
            setBooking(newBooking)
        }
    }

    const handleDateChange = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        let dayDifference = 
        (ranges.selection.endDate.getTime() - ranges.selection.startDate.getTime()) / 86400000
        let newBooking = Object.assign({}, booking,{ checkinDate: ranges.selection.startDate, 
            checkoutDate: ranges.selection.endDate, 
            price: campsite.price * dayDifference})
        setBooking(newBooking)
    }
```


Reviews:
---

* At the bottom of the campsite show page, users will see all reviews created for that campsite.
* If they have left a review, they will be able to edit or remove said review.

![reviews-demo](https://media2.giphy.com/media/DLQAhYSB9pjjKbHbLZ/giphy.gif?cid=790b761130fef9cabfc4ddb144c41dcc6aba0c480130208d&rid=giphy.gif&ct=g)


Search:
---

* On the splash page users can search for campsites by location, name, or state.
* This will render a search index where all campsite fulfilling the search criteria will be displayed.

![search-demo](https://media3.giphy.com/media/kl5UqdrQJoluZ9dHkj/giphy.gif?cid=790b76115160d2780a8c39a1aa67817513278eb6f3833706&rid=giphy.gif&ct=g)

```javascript
const markerLatLngArr = new window.google.maps.LatLngBounds();
if (markerList.length > 0) {
    markerList.forEach((marker) => {
        marker.setMap(null)
    })
}
setTimeout(()=>{
    campsites.forEach((campsite) => {
        setMarkerList(markerList.concat(new window.google.maps.Marker({
            position: { lat: campsite.lat, lng: campsite.lng },
            map: map,
            animation: window.google.maps.Animation.DROP,
            icon: {
                url: blackPin,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0)
            }
        })))
        markerLatLngArr.extend(new window.google.maps.LatLng(campsite.lat, campsite.lng))
        map.fitBounds(markerLatLngArr)
    })
},1000) 
```


