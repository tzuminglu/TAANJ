import React, {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    let myListener = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log('onAuthStateChanged', user);
      setLoadingUser(false);
    });
    return () => {
      if (myListener) myListener();
    };
  }, []);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
