import { SearchResult, Timestamp } from "../../services/searchService";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <div className="animate-pulse">Searching...</div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p>No results found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {results.map((result, index) => (
        <div
          key={index}
          className="bg-secondary/20 p-4 rounded-sm border border-border"
        >
          <h3 className="text-lg font-medium mb-2">{result.title}</h3>

          {result.highlight && result.highlight.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Matching Content:</h4>
              <div
                className="text-sm opacity-90"
                dangerouslySetInnerHTML={{
                  __html: result.highlight.join("... "),
                }}
              />
            </div>
          )}

          {result.matchingTimestamps &&
            result.matchingTimestamps.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Timestamps:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {result.matchingTimestamps.map(
                    (timestamp: Timestamp, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="bg-primary/10 text-xs px-2 py-1 rounded-sm">
                          {formatTime(timestamp.start)}
                        </span>
                        <span className="text-sm">{timestamp.text}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          <div className="flex gap-2 mt-3">
            {result.youtubeLink && (
              <a
                href={result.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/90 hover:bg-primary px-3 py-1 rounded-sm text-xs"
              >
                Watch on YouTube
              </a>
            )}
            {result.downloadLink && (
              <a
                href={result.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-secondary/80 px-3 py-1 rounded-sm text-xs"
              >
                Download
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
