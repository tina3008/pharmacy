import { authFirebase } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import css from "./Navigation.module.css";

export default function AuthFound() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        setTimeout(() => {
          setUserName(user.displayName || "Unknown User");
        }, 500);
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {userName && <p className={css.authName}>Welcome,<br/>{userName}!</p>}
    </div>
  );
}
