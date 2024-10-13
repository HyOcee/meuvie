import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchIcon from "/search.svg";

interface SearchInputProps {
  inputValue: string;
  onInputChange: (val: string) => void;
  onSuggestionClick: (val: string) => void;
  suggestions: string[];
}

const SearchInput = ({
  onInputChange,
  inputValue,
  onSuggestionClick,
  suggestions,
}: SearchInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log({ event });
      if (
        suggestionsContainerRef.current &&
        !suggestionsContainerRef.current.contains(
          event.target as unknown as Node
        )
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionsContainerRef]);

  return (
    <div ref={suggestionsContainerRef} className="relative">
      <div className="relative">
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="w-[18px] absolute left-3 top-3"
        />
        <input
          type="text"
          className="md:w-[300px] bg-transparent border-grey-line text-grey-header border rounded-md pl-9 pr-3 py-2 placeholder:text-sm outline-0 focus:border-grey-header"
          placeholder="Search Movie"
          value={inputValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onInputChange(event.target.value);
          }}
          onFocus={() => {
            setShowSuggestions(true);
          }}
        />
      </div>

      {showSuggestions && suggestions.length ? (
        <div className="absolute w-full  left-0 top-[calc(100%+12px)] border border-solid border-grey-line bg-[#456] rounded-md py-3">
          <div className="grid gap-1 max-h-[200px] overflow-y-auto">
            {suggestions.map((suggestion) => (
              <button
                className="text-left p-2"
                key={suggestion}
                onClick={() => {
                  onSuggestionClick(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
