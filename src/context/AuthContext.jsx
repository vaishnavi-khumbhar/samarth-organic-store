import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import { loginUser, signupUser } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("samarth_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("samarth_token") || "";
  });

  const [showLogin, setShowLogin] = useState(false);

  const afterLoginRef = useRef(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("samarth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("samarth_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("samarth_token", token);
    } else {
      localStorage.removeItem("samarth_token");
    }
  }, [token]);

  const isLoggedIn = !!user;

  const login = async (email, password) => {
    const res = await loginUser({
      email,
      password,
    });

    const data = res.data;

    setUser(data.user);
    setToken(data.token);

    setShowLogin(false);

    if (afterLoginRef.current) {
      const fn = afterLoginRef.current;
      afterLoginRef.current = null;
      setTimeout(fn, 0);
    }
  };

  const signup = async (payload) => {
    const res = await signupUser(payload);

    const data = res.data;

    setUser(data.user);
    setToken(data.token);

    setShowLogin(false);

    if (afterLoginRef.current) {
      const fn = afterLoginRef.current;
      afterLoginRef.current = null;
      setTimeout(fn, 0);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    afterLoginRef.current = null;
  };

  const requireLogin = (onSuccess) => {
    if (isLoggedIn) {
      onSuccess?.();
      return true;
    }

    afterLoginRef.current = onSuccess || null;
    setShowLogin(true);
    return false;
  };

  const openLoginModal = () => {
    afterLoginRef.current = null;
    setShowLogin(true);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        showLogin,

        login,
        signup,
        logout,

        requireLogin,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;