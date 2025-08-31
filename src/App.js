import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState("");
  const [results, setResults] = useState([]);
  const [searchId, setSearchId] = useState("");

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/users");
    const json = await data.json();
    setResults(json?.users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setResults(results.filter((user) => user.id !== id));
  };

  console.log(results);

  return (
    <div className="App">
      <h1>User Details</h1>
      <hr />
      <input
        type="text"
        placeholder="search here"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <div>
        {results
          .filter((item) =>
            searchId.toLowerCase() === ""
              ? item
              : item.firstName.toLowerCase().includes(searchId)
          )
          .map((user) => (
            <li key={user.id}>
              <span>{user.firstName}</span>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
      </div>
    </div>
  );
}
