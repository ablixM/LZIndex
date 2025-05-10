import { useState } from "react";
import { Button } from "../ui/button";

export interface SearchResult {
  title: string;
  youtubeLink: string;
  downloadLink: string;
  matchingTimestamps: {
    text: string;
    start: number;
    duration: number;
  }[];
  highlight: string[];
}

interface SearchResultsProps {
  keyword: string;
  isLoading: boolean;
  error: string | null;
  results: SearchResult[];
}

export function SearchResults({
  keyword,
  isLoading,
  error,
  results,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-8 p-6 border border-border rounded-sm flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-xs md:text-base text-muted-foreground">
            Searching for "{keyword}"...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 text-xs md:text-base bg-red-50 border border-red-200 rounded-sm text-red-600">
        {error}
      </div>
    );
  }

  if (results?.length === 0) {
    return (
      <div className="mt-8 p-4 bg-secondary/30 border border-border rounded-sm text-xs md:text-base">
        No results found for "{keyword}". Try a different search term.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6 pb-12 md:pb-16">
      <h2 className="text-xl font-semibold">Search Results for "{keyword}"</h2>
      <div className="flex justify-between items-center">
        <p className="text-xs md:text-base text-muted-foreground">
          Found {results.length} result{results.length !== 1 ? "s" : ""}
        </p>
      </div>
      {Array.isArray(results) ? (
        results.map((result, index) => (
          <SearchResultCard key={index} result={result} />
        ))
      ) : (
        <div className="p-4 bg-secondary/30 border border-border rounded-sm text-xs md:text-base">
          Invalid results format. Please try your search again.
        </div>
      )}
    </div>
  );
}

function SearchResultCard({ result }: { result: SearchResult }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="border border-border rounded-sm p-4 hover:shadow-sm transition-shadow">
      <h3 className="text-lg font-medium mb-2">{result.title}</h3>

      {result.highlight && result.highlight.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Matching content:
          </p>
          <div className="bg-secondary/20 p-3 rounded-sm">
            {expanded
              ? result.highlight.map((text, i) => (
                  <p
                    key={i}
                    className="mb-2 last:mb-0"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                ))
              : result.highlight
                  .slice(0, 1)
                  .map((text, i) => (
                    <p
                      key={i}
                      className="mb-2 last:mb-0"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  ))}
            {result.highlight.length > 1 && (
              <Button
                variant="link"
                className="p-0 h-auto text-xs mt-1"
                onClick={handleToggleExpand}
              >
                {expanded
                  ? "Show less"
                  : `Show more (${result.highlight.length - 1} more)`}
              </Button>
            )}
          </div>
        </div>
      )}

      {result.matchingTimestamps && result.matchingTimestamps.length > 0 && (
        <div className="mb-4">
          <p className="text-xs md:text-base text-muted-foreground mb-2">
            Jump to relevant parts:
          </p>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {result.matchingTimestamps.map((timestamp, idx) => (
              <a
                key={idx}
                href={`${result.youtubeLink}&t=${Math.floor(timestamp.start)}s`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 border border-border rounded-sm hover:bg-secondary/20 transition-colors"
              >
                <span className="text-primary font-medium">
                  {formatTime(timestamp.start)}
                </span>
                <span className="text-xs md:text-base truncate">
                  {timestamp.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap mt-4">
        <a
          href={result.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-sm text-xs md:text-base hover:bg-primary/90 transition-colors"
        >
          Watch on YouTube
        </a>
        {result.downloadLink && (
          <a
            href={result.downloadLink}
            className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-sm text-xs md:text-base hover:bg-secondary/90 transition-colors"
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
}
