import { useState, useEffect } from "react";
import { supabase } from "./lib/helper/supabaseClient";

export const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {

   const { data: { subscription } } =  supabase.auth.onAuthStateChange((event, session) => {
      switch(event) {
        case 'SIGNED_IN':
          setUser(session?.user);
          break;
        case 'SIGNED_OUT':
          setUser(null);
          break;
      }
    })
    return () => subscription.unsubscribe()
  }, []);

  const handleLogin = async () => {
       await supabase.auth.signInWithOAuth({
        provider: "github",
      });

  };


  const handleLogOut = async () => { 
    await supabase.auth.signOut();
  }

  return (
    <div>
      {user ? (

        <div>
        <h1>Authificated</h1>
        <button onClick={handleLogOut}>LogOut</button>
        </div>

      ) : (
        <button onClick={handleLogin}>Login with Github</button>
      )}
    </div>
  );
};
