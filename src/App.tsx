import React, { useState } from 'react';
import { Search, Sun, Moon, Cloud, Clock } from 'lucide-react';
import TimeCard from './components/TimeCard';
import SearchBox from './components/SearchBox';

const initialTimezones = [
  { city: 'New Delhi', timezone: 'Asia/Kolkata', abbr: 'IST' },
  { city: 'New York', timezone: 'America/New_York', abbr: 'EST' },
  { city: 'Chicago', timezone: 'America/Chicago', abbr: 'CST' },
];

const themes = [
  { name: 'day', bgGradient: 'from-blue-200 via-pink-200 to-purple-300', icon: Sun },
  { name: 'night', bgGradient: 'from-indigo-300 via-purple-300 to-pink-300', icon: Moon },
  { name: 'twilight', bgGradient: 'from-orange-200 via-amber-200 to-yellow-200', icon: Cloud },
];

function App() {
  const [timezones, setTimezones] = useState(initialTimezones);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [is24Hour, setIs24Hour] = useState(true);

  const removeTimezone = (index: number) => {
    setTimezones(timezones.filter((_, i) => i !== index));
  };

  const addTimezone = (newTimezone: { city: string; timezone: string; abbr: string }) => {
    setTimezones([...timezones, newTimezone]);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bgGradient} flex flex-col items-center justify-center p-8 transition-colors duration-500`}>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Global Time Viewer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-6xl">
        {timezones.map((tz, index) => (
          <TimeCard
            key={index}
            city={tz.city}
            timezone={tz.timezone}
            abbr={tz.abbr}
            onRemove={() => removeTimezone(index)}
            is24Hour={is24Hour}
          />
        ))}
      </div>
      <SearchBox onAddTimezone={addTimezone} />
      <div className="mt-8 flex items-center space-x-4">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setCurrentTheme(theme)}
            className={`p-2 rounded-full ${currentTheme.name === theme.name ? 'bg-white bg-opacity-50' : 'bg-transparent'} transition-colors duration-300`}
          >
            <theme.icon size={24} className="text-gray-800" />
          </button>
        ))}
        <button
          onClick={() => setIs24Hour(!is24Hour)}
          className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors"
        >
          <Clock size={20} className="mr-2" />
          {is24Hour ? '24h' : '12h'}
        </button>
      </div>
    </div>
  );
}

export default App;