import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-29 focus:ring- rounded-full bg-yellow-100 px-4 
        py-2 text-sm transition-all delay-200 placeholder:text-stone-400
        focus:outline-none focus:ring focus:ring-yellow-300 sm:w-64 focus:sm:w-72
        focus:sm:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
