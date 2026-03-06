import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../config/api";

const AuthContext = createContext();

console.log("API URL:", API);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  // ✅ Load user from localStorage
  useEffect(() => {

    try {

      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {

        setToken(savedToken);
        setUser(JSON.parse(savedUser));

      }

    }

    catch (err) {

      console.log("Auth load error:", err);

      localStorage.clear();

    }

    finally {

      setLoading(false);

    }

  }, []);



  // ✅ Signup
  const signup = async (name, email, password, role = "customer") => {

    try {
      console.log("Signup request to:", `${API}/api/users/signup`);
      
      const res = await fetch(`${API}/api/users/signup`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password,
          role
        })

      });


      const data = await res.json();
      console.log("Signup response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }


      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      if (error.message === "Failed to fetch") {
        throw new Error("Cannot connect to server. Please check your internet connection or ensure the backend server is running.");
      }
      throw error;
    }

  };



  // ✅ Login
  const login = async (email, password) => {

    try {
      console.log("Login request to:", `${API}/api/users/login`);
      
      const res = await fetch(`${API}/api/users/login`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })

      });


      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }


      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      console.error("Login error:", error);
      if (error.message === "Failed to fetch") {
        throw new Error("Cannot connect to server. Please check your internet connection or ensure the backend server is running.");
      }
      throw error;
    }

  };



  // ✅ Logout
  const logout = () => {

    localStorage.clear();

    setToken(null);

    setUser(null);

  };



  return (

    <AuthContext.Provider

      value={{

        user,
        token,
        loading,

        signup,
        login,
        logout,

        isAuthenticated: !!token

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};



export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error("useAuth must be used within AuthProvider");

  }

  return context;

};
