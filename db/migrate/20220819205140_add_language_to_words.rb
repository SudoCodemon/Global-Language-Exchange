class AddLanguageToWords < ActiveRecord::Migration[7.0]
  def change
    add_column :words, :language, :string
  end
end
