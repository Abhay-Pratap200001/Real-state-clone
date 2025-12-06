import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  // for getting current user
  const { currentUser } = useSelector((state) => state.user);

    // store input search value
  const [searchTerm, setSearchTerm] = useState("");

  // for naviagte user according to search
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // read current URL query → example ?searchTerm=house
    const urlParams = new URLSearchParams(window.location.search); 

    // update/add new search term in URL
    urlParams.set("searchTerm", searchTerm); 

    // convert query object → string → "searchTerm=test"
    const searchQuery = urlParams.toString();  

    // redirect to search page with updated query
    navigate(`/search?${searchQuery}`); 
  };


  useEffect(() => {
    // read URL when page loads (or when URL changes)
    const urlParams = new URLSearchParams(location.search); 


    // extract searchTerm from URL → example: "house"
    const searchTermFromUrl = urlParams.get("searchTerm");  
    

    // set input box value same as URL value 
    // (so refresh or navigation will keep previous search)
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl); 
    }
  }, [location.search]);



  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center">
          {/* Search bar input */}

          <input
            type="text"
            placeholder="search...."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
          <button>
            <FaSearch className="text-slate-600" />{" "}
          </button>
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
