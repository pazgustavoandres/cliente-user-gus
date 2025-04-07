import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";

function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  return (
    <div>
      <h1>App de Autenticación</h1>
      {!isLogged && (
        <>
          <RegisterForm />
          <LoginForm onLogin={() => setIsLogged(true)} />
        </>
      )}
      {isLogged && (
        <>
          <UserList />
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLogged(false);
            }}
          >
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}

export default App;
