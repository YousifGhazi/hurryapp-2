import useAuthStore from "./store/Auth";
import { Button } from "@/components/ui/button";

function App() {
  const { user, login } = useAuthStore((state) => state);

  return <main>
    hello from the other sideeee
  </main>;
}

export default App;
