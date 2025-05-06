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

export function SearchTabs() {
  const [keyword, setKeyword] = useState("");

  // Sort keyword options by length to fit more on a row
  const keywordOptions = [
    "Breaker",
    "IOF",
    "PD Array",
    "High Impact News",
    "Power of 3",
    "Volume Imbalance",
    "Sick Sister",
    "Fair Value Gap",
    "NWOG",
    "NDOG",
    "Silver Bullet",
  ].sort((a, b) => a.length - b.length);

  // Sort question options by length to fit more on a row
  const questionOptions = [
    "What is an order block?",
    "What is Institutional order flow?",
    "How do I use an optimal trade entry to trade?",
    "What is premium and discount PD arrays?",
    "Why is it not recommended to take a trade during high impact news?",
    "What is an SMT divergence?",
    "Do ICT methods work?",
    "Can you give me recent videos on NWOG?",
  ].sort((a, b) => a.length - b.length);

  return (
    <Tabs defaultValue="ask" className="w-full rounded-sm">
      <TabsList className="w-full mb-4 rounded-sm h-16">
        <TabsTrigger
          value="ask"
          className="flex-1 py-6 px-4 text-sm md:text-base rounded-sm cursor-pointer"
        >
          Ask a question
        </TabsTrigger>
        <TabsTrigger
          value="keyword"
          className="flex-1 py-6 px-4 text-sm md:text-base rounded-sm cursor-pointer"
        >
          Keyword Search
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ask" className="mt-0">
        <div className="flex flex-col space-y-4">
          <div className="relative flex-1">
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
              className="pl-10 bg-secondary/50 border-0 focus:ring-1 focus:ring-primary/20 text-sm md:text-base rounded-sm p-8 px-16"
              type="search"
              placeholder="Institutional order flow"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
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
                className="pl-10 bg-secondary/50 border-0 focus:ring-1 focus:ring-primary/20 text-sm md:text-base rounded-sm p-8 px-16"
                type="search"
                placeholder="Institutional order flow"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <Select defaultValue="all">
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
              {keywordOptions.map((keyword) => (
                <div
                  key={keyword}
                  className="bg-background border border-border py-2 px-4 text-sm md:text-base rounded-sm hover:border-primary/50 cursor-pointer transition-colors whitespace-nowrap"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
