import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ListPageLayout(
  
) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-background border-b">
        <h1 className="text-2xl font-bold">List Page Title</h1>
      </header>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/30">
        <Input className="w-full sm:w-auto" placeholder="Search..." />
        <Select>
          <option value="">Filter by...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
        <Button variant="outline">Apply Filters</Button>
      </div>

      {/* Actions Row */}
      <div className="flex justify-between items-center p-4 bg-background">
        <div className="flex gap-2">
          <Button>Add New</Button>
          <Button variant="outline">Export</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
            <span className="sr-only">Grid view</span>
          </Button>
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {/* Data Table Area */}
      <div className="flex-grow overflow-auto p-4">
        {/* This is where your data table component will go */}
        <div className="h-full border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
          {/* Add more content here to demonstrate scrolling */}
          <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Main Content</h2>
              <p>
                This is the main content area. It will scroll if the content
                overflows.
              </p>
              {/* Add more content here to demonstrate scrolling */}
              {Array(50)
                .fill(0)
                .map((_, i) => (
                  <p key={i} className="my-4">
                    This is paragraph {i + 1}. Adding more content to
                    demonstrate scrolling behavior.
                  </p>
                ))}
            </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="p-4 bg-muted text-muted-foreground border-t">
        <div className="flex justify-between items-center">
          <span>Total Items: 100</span>
          <span>Page 1 of 10</span>
          <span>Showing 1-10 of 100</span>
        </div>
      </div>
    </div>
  )
}