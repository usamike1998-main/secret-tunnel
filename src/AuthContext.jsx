import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [user, setUser] = useState(null);

  // TODO: signup
  async function signUp(userCredentials) {
    try {
      const response = await fetch(API + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      const result = await response.json();
      setToken(result.data.token);
      setLocation("TABLET");
    } catch (e) {
      console.error(e);
    }
  }
  // TODO: authenticate

  const value = { location, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
