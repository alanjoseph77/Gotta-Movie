import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (itemId) => {
    // Toggle the item in the favorites list
    if (favorites.some((fav) => fav.id === itemId)) {
      setFavorites(favorites.filter((fav) => fav.id !== itemId));
    } else {
      // Assuming you have access to the item details, you can add it to favorites
      // const newItem = ...;
      // setFavorites([...favorites, newItem]);
    }
  };

  const contextValue = {
    favorites,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
