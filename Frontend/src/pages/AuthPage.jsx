import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div>
      {isRegistering ? (
        <Register setIsRegistering={setIsRegistering} />
      ) : (
        <Login setIsRegistering={setIsRegistering} />
      )}
    </div>
  );
};
export default AuthPage;
