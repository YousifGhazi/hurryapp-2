import useAuthStore from "./store/Auth";
import { Button } from "@/components/ui/button";

function App() {
  const { user, login } = useAuthStore((state) => state);

  return <main></main>;
}

export default App;
