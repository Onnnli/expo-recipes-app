import React, { useMemo } from 'react';
import BottomNavigator from './routes/BottomNavigation';
import AppContext from './assets/globals/appContext';
import useUser from './hooks/useUser';
import useFavourites from './hooks/useFavourites';

export default function App() {
  const user = useUser();
  const favorites = useFavourites();

  const context = useMemo(() => {
    return { ...favorites, ...user };
  }, [favorites, user]);

  console.log(user);

  return (
    <AppContext.Provider value={context}>
      <BottomNavigator />
    </AppContext.Provider>
  );
}
