import { useState } from "react";
import Filter from "./components/Filter";

function App() {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
    </div>
  );
}

export default App;
