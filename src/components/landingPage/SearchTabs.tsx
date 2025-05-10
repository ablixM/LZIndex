import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { SearchResults, SearchResult } from "./SearchResults";

export function SearchTabs() {
  const [keyword, setKeyword] = useState("");
  const [contentType, setContentType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Sort keyword options by length to fit more on a row
  const keywordOptions = [
    "DVN",
    "Oracle",
    "education",
    "research",
    "innovation",
    "data",
    "analysis",
  ].sort((a, b) => a.length - b.length);

  // Sort question options by length to fit more on a row
  const questionOptions = [
    "What is LayerZero??",
    "How is LayerZero different from bridges?",
    "What are LayerZero endpoints?",
    "Which chains support LayerZero?",
    "How does LayerZero stay secure?",
  ].sort((a, b) => a.length - b.length);

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(keyword)}&type=${contentType}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch search results");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeywordClick = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    handleSearch();
  };

  const handleQuestionClick = (question: string) => {
    setKeyword(question);
    handleSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="ask" className="w-full rounded-sm">
        <TabsList className="w-full mb-4 rounded-sm h-12 md:h-16">
          <TabsTrigger
            value="ask"
            className="flex-1 py-2 md:py-4 px-4 text-sm md:text-base rounded-sm cursor-pointer"
          >
            Ask a question
          </TabsTrigger>
          <TabsTrigger
            value="keyword"
            className="flex-1 py-2 md:py-4 px-4 text-sm md:text-base rounded-sm cursor-pointer"
          >
            Keyword Search
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ask" className="mt-0">
          <div className="flex flex-col space-y-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none p-2 md:p-4 rounded-sm">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <Input
                className="pl-10 bg-secondary/50 border-0 focus:ring-1 focus:ring-primary/20 text-xs md:text-base rounded-sm p-8 px-16"
                type="search"
                placeholder="Ask anything about LayerZero"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-sm"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                Get started with a question
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {questionOptions.map((question) => (
                  <div
                    key={question}
                    className="bg-background border border-border py-2 px-3 text-xs sm:text-sm md:text-base rounded-sm hover:border-primary/50 cursor-pointer transition-colors line-clamp-2 h-auto flex items-center"
                    tabIndex={0}
                    aria-label={`Search for ${question}`}
                    onClick={() => handleQuestionClick(question)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleQuestionClick(question);
                      }
                    }}
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keyword" className="mt-0">
          <div className="flex flex-col space-y-4">
            <div className="flex gap-2 items-center flex-col md:flex-row">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none p-4 rounded-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <Input
                  className="pl-10 bg-secondary/50 border-0 focus:ring-1 focus:ring-primary/20 text-xs md:text-base rounded-sm p-8 px-16"
                  type="search"
                  placeholder="Search keywords"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-sm"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
              <div className="w-full md:w-auto">
                <Select
                  defaultValue="all"
                  onValueChange={(value) => setContentType(value)}
                >
                  <SelectTrigger className="w-full md:w-[180px] bg-transparent rounded-sm border-0 hover:bg-transparent focus:bg-transparent">
                    <SelectValue placeholder="All Content" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Content</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                      <SelectItem value="articles">Articles</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                Choose a keyword to get started
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywordOptions.map((keywordOption) => (
                  <div
                    key={keywordOption}
                    className="bg-background border border-border py-2 px-4 text-xs md:text-base rounded-sm hover:border-primary/50 cursor-pointer transition-colors whitespace-nowrap"
                    onClick={() => handleKeywordClick(keywordOption)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleKeywordClick(keywordOption);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`Search for ${keywordOption}`}
                  >
                    {keywordOption}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {hasSearched && (
        <SearchResults
          keyword={keyword}
          isLoading={isLoading}
          error={error}
          results={results}
        />
      )}
    </div>
  );
}
