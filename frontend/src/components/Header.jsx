import React, { useState } from "react";
import brandLogo from "../assets/brand-logo.svg";
import searchIcon from "../assets/search-icon.svg";
import vitualSearchIcon from "../assets/vitual-search-icon.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if(query.trim()){
        navigate(`/s/photos/${query}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex items-center px-[20px] py-[11px] gap-x-[16px]">
      <Link to="/" className="h-[32px] w-[32px]">
        <img src={brandLogo} alt="Brand Logo" />
      </Link>
      <div className="flex bg-[#EEEEEE] w-full rounded-[24px]">
        <button>
          <div className="w-[34px]">
            <img className="pl-[14px]" src={searchIcon} alt="Search Icon" />
          </div>
        </button>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search high-resolution images"
          className="appearance-none w-full h-[40px] pt-[1px] pr-[2px] pb-[2px] pl-[10px] bg-transparent focus:outline-0"
        />
        <button>
          <div className="w-[48px]">
            <img
              className="px-[14px] py-0"
              src={vitualSearchIcon}
              alt="vitual Search Icon"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
