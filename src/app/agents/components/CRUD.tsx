"use client"

import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Traveler } from '../page'

type Props = {
    initialTravelers: Traveler[];
    setTravelers: (travelers: Traveler[]) => void;

  };





export default function TravelerTable(
    { initialTravelers ,setTravelers}: Props
) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentTraveler, setCurrentTraveler] = useState<Traveler | null>(null)


  const handleEdit = () => {
    if (currentTraveler) {
      setTravelers(initialTravelers.map(t => t.id === currentTraveler.id ? currentTraveler : t))
      setIsEditModalOpen(false)
      setCurrentTraveler(null)
    }
  }

  const handleDelete = () => {
    if (currentTraveler) {
      setTravelers(initialTravelers.filter(t => t.id !== currentTraveler.id))
      setIsDeleteModalOpen(false)
      setCurrentTraveler(null)
    }
  }


  useEffect(() => {
    console.error('travelersChanges')
    console.log('initialTravelers', initialTravelers)
  },[initialTravelers])

  useEffect(() => {
    console.error('Init')
    console.log('currentTraveler', currentTraveler)
    console.log('initialTravelers', initialTravelers)

  },[])

  useEffect(() => {
    console.error('Modal')
    console.log('currentTraveler', currentTraveler)
    console.log('isEditModalOpen', isEditModalOpen)
  },[currentTraveler, isDeleteModalOpen])
  return (
    <div className="space-y-4">

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Departure Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialTravelers.map((traveler) => (
            <TableRow key={traveler.id}>
              <TableCell>
                <Image
                  src='https://github.com/shadcn.png'
                  alt={`${traveler.name}'s profile`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell className="font-medium">{traveler.name}</TableCell>
              <TableCell>{traveler.destination}</TableCell>
              <TableCell>{traveler.departureDate}</TableCell>
              <TableCell className="text-right">
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="mr-2" onClick={() => setCurrentTraveler(traveler)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Traveler</DialogTitle>
                      <DialogDescription>Make changes to the traveler's information here.</DialogDescription>
                    </DialogHeader>
                    {currentTraveler && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">Name</Label>
                          <Input
                            id="edit-name"
                            value={currentTraveler.name}
                            onChange={(e) => setCurrentTraveler({...currentTraveler, name: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-destination" className="text-right">Destination</Label>
                          <Input
                            id="edit-destination"
                            value={currentTraveler.destination}
                            onChange={(e) => setCurrentTraveler({...currentTraveler, destination: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-departureDate" className="text-right">Departure Date</Label>
                          <Input
                            id="edit-departureDate"
                            type="date"
                            value={currentTraveler.departureDate}
                            onChange={(e) => setCurrentTraveler({...currentTraveler, departureDate: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button onClick={handleEdit}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-red-500 text-white" onClick={() => setCurrentTraveler(traveler)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Traveler</DialogTitle>
                      <DialogDescription>Are you sure you want to delete this traveler? This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        {isDeleteModalOpen && (
                            <div>
                            <h1>Are you gay?</h1>
                            <p>
                                {isDeleteModalOpen ? 'Yes' : 'No'} {currentTraveler?.name}
                            </p>
                            </div>
                        )}
                      <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}