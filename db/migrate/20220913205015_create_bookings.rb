class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.references :campsite, null: false, foreign_key: true
      t.references :customer, null: false, foreign_key: { to_table: :users }
      t.references :host, null: false, foreign_key: { to_table: :users }
      t.integer :adults, null: false, default: 1
      t.integer :children
      t.integer :pets
      t.float :price, null: false
      t.datetime :checkin_date, null: false
      t.datetime :checkout_date, null: false

      t.timestamps
    end
  end
end
