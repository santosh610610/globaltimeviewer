import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TimeCardProps {
  city: string;
  timezone: string;
  abbr: string;
  onRemove: () => void;
  is24Hour: boolean;
}

const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

const TimeCard: React.FC<TimeCardProps> = ({ city, timezone, abbr, onRemove, is24Hour }) => {
  const [time, setTime] = useState('');
  const [backgroundColor] = useState(getRandomPastelColor());

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: !is24Hour,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [timezone, is24Hour]);

  return (
    <div className="rounded-xl p-6 shadow-lg w-full" style={{ backgroundColor }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 w-full text-center">{city}</h2>
        <button onClick={onRemove} className="text-gray-600 hover:text-red-500 transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center mb-4">
        <p className="text-5xl font-bold text-gray-800">{time}</p>
        <p className="text-xl font-medium text-gray-700 mt-2">{abbr}</p>
      </div>
    </div>
  );
};

export default TimeCard;