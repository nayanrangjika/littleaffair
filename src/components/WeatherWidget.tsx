import { useEffect, useRef } from 'react';

export function WeatherWidget({ skin = "light" }: { skin?: "light" | "dark" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById('meteomatics-css')) {
      const link = document.createElement('link');
      link.id = 'meteomatics-css';
      link.rel = 'stylesheet';
      link.href = 'https://widget.meteomatics.com/v2/meteomatics-weather-widget.css';
      document.head.appendChild(link);
    }
    
    if (!document.getElementById('meteomatics-js')) {
      const script = document.createElement('script');
      script.id = 'meteomatics-js';
      script.src = 'https://widget.meteomatics.com/v2/meteomatics-weather-widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      data-meteomatics-weather-widget="vertical"
      data-meteomatics-weather-widget-color="primary"
      data-meteomatics-weather-widget-title="Sariska, Thanagazi Tehsil, India"
      data-meteomatics-weather-widget-latitude="27.392731"
      data-meteomatics-weather-widget-longitude="76.376317"
      data-meteomatics-weather-widget-measurement-unit-temperature="celsius"
      ref={containerRef}
    ></div>
  );
}
