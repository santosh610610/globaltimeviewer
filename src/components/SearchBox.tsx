import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  onAddTimezone: (timezone: { city: string; timezone: string; abbr: string }) => void;
}

const timezones = [
  { city: 'London', timezone: 'Europe/London', abbr: 'BST' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', abbr: 'JST' },
  { city: 'Sydney', timezone: 'Australia/Sydney', abbr: 'AEST' },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', abbr: 'PDT' },
  { city: 'Dubai', timezone: 'Asia/Dubai', abbr: 'GST' },
];

const SearchBox: React.FC<SearchBoxProps> = ({ onAddTimezone }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundTimezone = timezones.find(
      (tz) => tz.city.toLowerCase() === search.toLowerCase()
    );
    if (foundTimezone) {
      onAddTimezone(foundTimezone);
      setSearch('');
    } else {
      alert('City not found. Please try another city.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a city..."
          className="w-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-gray-800 placeholder-gray-500 rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;