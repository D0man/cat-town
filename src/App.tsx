import { useEffect } from "react";
import { AppRouter } from "./router";
import useUserStore from "./stores/userStore";

function App() {
  const { loadUsers, currentUser } = useUserStore()

  useEffect(() => {
    if (!currentUser) {
      loadUsers()
    }
  }, [currentUser?.id],);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;


