class CreateCampsites < ActiveRecord::Migration[7.0]
  def change
    create_table :campsites do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.text :description, null: false
      t.integer :price, null: false
      t.integer :capacity, null: false
      t.string :type, null: false
      t.references :host, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end
    add_index :campsites, :name, unique: true
  end
end
