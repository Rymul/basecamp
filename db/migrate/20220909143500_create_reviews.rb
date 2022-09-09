class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.string :title, null: false
      t.text :body, null: false 
      t.integer :rating, null: false
      t.boolean :recomended, null: false, default: false
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.references :campsite, null: false, foreign_key: true

      t.timestamps
    end
    add_index :reviews, [:campsite_id, :author_id], unique: true
  end
end
