import React, { useMemo } from 'react';
import BottomNavigator from './routes/BottomNavigation';
import AppContext from './assets/globals/appContext';
import useUser from './hooks/useUser';
import useFavourites from './hooks/useFavourites';
import { useCategories } from './hooks/useCategories';

export default function App() {
  const user = useUser();
  const favorites = useFavourites();
  const categories = useCategories();

  const context = useMemo(() => {
    return { ...favorites, ...user, ...categories };
  }, [categories, favorites, user]);

  return (
    <AppContext.Provider value={context}>
      <BottomNavigator />
    </AppContext.Provider>
  );
}
