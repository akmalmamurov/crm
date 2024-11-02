import React, { useEffect, useState } from 'react'

const DarkLightModeSwitcher = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function onWindowMatch() {
    if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        localStorage.removeItem('theme')
        onWindowMatch();
        break;
    }
  }, [theme])

  darkQuery.addEventListener('change', (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }
  });
  return (
    <div className='flex gap-2'>
      {
        [
          ['Light', 'light'],
          ['Dark', 'dark'],
          ['System', 'system'],
        ].map(([label, value], i) => (
          <button onClick={() => setTheme(value)} key={i} className='dark:bg-darkPrimary bg-blueTifany text-white rounded-md px-3 py-1 mt-4'>{label}</button>)
        )
      }
    </div>
  )
}

export default DarkLightModeSwitcher
