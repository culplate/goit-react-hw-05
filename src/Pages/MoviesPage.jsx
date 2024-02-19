import { useEffect, useState } from "react";
import { fetchByQuery } from "../../api";
import { SearchForm } from "../Components/SearchForm/SearchForm";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  // const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (newQuery) => {
    // setQuery(`${Date.now()}/${newQuery}`);
    setSearchParams({ query: newQuery });
    setResults([]);
  };

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      try {
        // setLoading(true)
        // setError(false)
        const fetchedData = await fetchByQuery(query);
        setResults(fetchedData);
      } catch (error) {
        // setError(true)
        console.log(error);
      } finally {
        // setLoading(false)
      }
    }
    fetchData();
  }, [query]);

  return (
    <main>
      <h1>Movies Page</h1>
      <SearchForm onSearch={handleSearch} />
      <ul>
        {results.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`${item.id}`} state={{ from: location }}>
                {item.original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
