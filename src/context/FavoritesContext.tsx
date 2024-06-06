import React, { createContext, useState, useEffect, useContext } from 'react';
//TODO: Ensure consistency across all venue and event IDs
export interface FavoriteItem {
  id: string;
  type: 'event' | 'venue';
  name: string;
}

export interface FavoritesContextProps {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => [...prev, item]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
