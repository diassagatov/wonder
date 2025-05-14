import React, { useEffect, useState, useMemo } from "react";
import Renderer from "./components/Renderer";
import Creator from "./components/Creator";

function App() {
  const [user, setUser] = useState(null);
  const user_id = useMemo(() => window.location.hostname.split(".")[0], []);
  const isEditMode = useMemo(
    () => window.location.pathname.includes("/edit"),
    []
  );

  useEffect(() => {
    if (!user_id) return;

    fetch(`http://localhost:3000/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUser(data)) // Assuming the API returns an array
      .catch((err) => console.error(err));
  }, [user_id]);

  useEffect(() => {
    isEditMode
      ? (document.title = user?.id + " | Edit")
      : (document.title = user?.id + " | Portfolio");
  }, [user]);

  return isEditMode ? <Creator user={user} /> : <Renderer user={user} />;
}

export default App;
