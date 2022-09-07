class ChangeColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :campsites, :type, :site_type
  end
end
