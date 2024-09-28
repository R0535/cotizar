"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import ListPageLayout from "@/layouts/list-layout";
import React, { useState } from "react";
import TravelerTable from "./components/CRUD";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

export type Traveler = {
  id: number
  name: string
  destination: string
  departureDate: string
  imageUrl: string
}

const initialTravelers: Traveler[] = [
  { id: 1, name: 'Alice Johnson', destination: 'Paris, France', departureDate: '2023-07-15', imageUrl: "https://github.com/shadcn.png" },
  { id: 2, name: 'Bob Smith', destination: 'Tokyo, Japan', departureDate: '2023-08-01', imageUrl: "https://github.com/shadcn.png" },
  { id: 3, name: 'Charlie Brown', destination: 'New York, USA', departureDate: '2023-07-22', imageUrl: "https://github.com/shadcn.png" },
  { id: 4, name: 'Diana Martinez', destination: 'Rome, Italy', departureDate: '2023-08-10', imageUrl: "https://github.com/shadcn.png" },
  { id: 5, name: 'Ethan Williams', destination: 'Sydney, Australia', departureDate: '2023-09-05', imageUrl: "https://github.com/shadcn.png" },
  { id: 6, name: 'Bob Smith', destination: 'Tokyo, Japan', departureDate: '2023-08-01', imageUrl: "https://github.com/shadcn.png" },
  { id: 7, name: 'Charlie Brown', destination: 'New York, USA', departureDate: '2023-07-22', imageUrl: "https://github.com/shadcn.png" },
  { id: 8, name: 'Diana Martinez', destination: 'Rome, Italy', departureDate: '2023-08-10', imageUrl: "https://github.com/shadcn.png" },
  { id: 9, name: 'Ethan Williams', destination: 'Sydney, Australia', departureDate: '2023-09-05', imageUrl: "https://github.com/shadcn.png" },
  { id: 10, name: 'Alice Johnson', destination: 'Paris, France', departureDate: '2023-07-15', imageUrl: "https://github.com/shadcn.png" },
]
const Page: React.FC = () => {
  const [travelers, setTravelers] = useState<Traveler[]>(initialTravelers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTraveler, setNewTraveler] = useState<Omit<Traveler, 'id'>>({
    name: '',
    destination: '',
    departureDate: '',
    imageUrl: "https://github.com/shadcn.png"
  })

  const handleAdd = () => {
    setTravelers([...travelers, { ...newTraveler, id: travelers.length + 1 }])
    setIsAddModalOpen(false)
    setNewTraveler({
      name: '',
      destination: '',
      departureDate: '',
      imageUrl: "https://github.com/shadcn.png"
    })
  }
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
      <div className="flex justify-end">
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Traveler
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Traveler</DialogTitle>
              <DialogDescription>Enter the details of the new traveler here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newTraveler.name}
                  onChange={(e) => setNewTraveler({...newTraveler, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="destination" className="text-right">Destination</Label>
                <Input
                  id="destination"
                  value={newTraveler.destination}
                  onChange={(e) => setNewTraveler({...newTraveler, destination: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departureDate" className="text-right">Departure Date</Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={newTraveler.departureDate}
                  onChange={(e) => setNewTraveler({...newTraveler, departureDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Add Traveler</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          <div className="container p-4">
              <TravelerTable initialTravelers={travelers} setTravelers={setTravelers}></TravelerTable>
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
  );
};

export default Page;
