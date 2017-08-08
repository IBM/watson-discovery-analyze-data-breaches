require 'smarter_csv'
require 'json'

class YearConverter
  def self.convert(value)
    {
      0  => '2004',
      1  => '2005',
      2  => '2006',
      3  => '2007',
      4  => '2008',
      5  => '2009',
      6  => '2010',
      7  => '2011',
      8  => '2012',
      9  => '2013',
      10 => '2014',
      11 => '2015',
      12 => '2016',
      13 => '2017',
    }[value]
  end
end

class SourceConverter
  def self.convert(value)
    value.split(/,|;/).first
  end
end

options = {
  :remove_empty_values => false,
  :key_mapping => {
    :entity => :title,
    :story => :text,
    :'1st_source_link' => :source_link,
    :'2nd_source_link' => nil,
    :'3rd_source' => nil,
    :records_lost => nil
  },
  :value_converters => {
    :year => YearConverter,
    :source_name => SourceConverter
  }
}

FileUtils.mkdir_p('data')
FileUtils.rm_rf(Dir.glob('data/*'))
index = 0
records = SmarterCSV.process('./2017-data-breaches.csv', options)
records.each do |record|
  unless record[:text].to_s.strip.empty?
    index += 1
    filename = (index).to_s.rjust(3, "0")
    File.open("data/#{filename}.json", 'a') do |w|
      w.puts JSON.pretty_generate(record)
    end
  end
end