"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetAgentDto } from "@/lib/features/agents/models/Agents";

type Props = {
  initialAgents: GetAgentDto[]|null;
  editAgent: (Agent?: GetAgentDto) => void;
};

export default function AgentsTable({
  initialAgents,
  editAgent,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAgent, setCurrentTraveler] = useState<GetAgentDto | null>(null);

  const handleEdit = () => {
    if (currentAgent) {

      setIsEditModalOpen(false);
      setCurrentTraveler(null);
    }
  };

  const handleDelete = () => {
    if (currentAgent) {
      setIsDeleteModalOpen(false);
      setCurrentTraveler(null);
    }
  };

  useEffect(() => {
    //console.error('AgentsChanges')
    //console.log('initialAgents', initialAgents)
  }, [initialAgents]);

  useEffect(() => {
    //console.error('Init')
    //console.log('currentTraveler', currentTraveler)
    //console.log('initialAgents', initialAgents)
  }, []);

  useEffect(() => {
    //console.error('Modal')
    //console.log('currentTraveler', currentTraveler)
    //console.log('isEditModalOpen', isEditModalOpen)
  }, [currentAgent, isDeleteModalOpen]);
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Zip</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Updated On</TableHead>
            
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialAgents?.map((traveler) => (
            <TableRow key={traveler.id}>
              <TableCell>
                <Image
                  src="https://github.com/shadcn.png"
                  alt={`${traveler.name}'s profile`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell className="font-medium">{traveler.name}</TableCell>
              <TableCell>{traveler.address}</TableCell>
              <TableCell>{traveler.city}</TableCell>
              <TableCell>{traveler.state}</TableCell>
              <TableCell>{traveler.zip}</TableCell>
              <TableCell>{traveler.country}</TableCell>
              <TableCell>{traveler.createdOn}</TableCell>
              <TableCell>{traveler.updatedOn}</TableCell>
          
              <TableCell className="text-right">
                <Dialog
                  open={isEditModalOpen}
                  onOpenChange={setIsEditModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() => setCurrentTraveler(traveler)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Traveler</DialogTitle>
                      <DialogDescription>
                        Make changes to the traveler's information here.
                      </DialogDescription>
                    </DialogHeader>
                    {currentAgent && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="edit-name"
                            value={currentAgent.name}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentAgent,
                                name: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="edit-email"
                            value={currentAgent.email}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentAgent,
                                email: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-phone" className="text-right">
                            Phone
                          </Label>
                          <Input
                            id="edit-phone"
                            value={currentAgent.phone}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentAgent,
                                phone: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-address" className="text-right">
                            Address
                          </Label>
                          <Input
                            id="edit-address"
                            value={currentAgent.address}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentAgent,
                                address: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-city" className="text-right">
                            City
                          </Label>
                          <Input
                            id="edit-city"
                            value={currentAgent.city}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentAgent,
                                city: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-state" className="text-right">
                            State
                          </Label>
                          <Input
                            id="edit-state"
                            value={currentAgent.state}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentAgent,
                                state: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-zip" className="text-right">
                            Zip
                          </Label>
                          <Input
                            id="edit-zip"
                            value={currentAgent.zip}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentAgent,
                                zip: e.target.value,
                              })
                            }
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
                <Dialog
                  open={isDeleteModalOpen}
                  onOpenChange={setIsDeleteModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-red-500 text-white"
                      onClick={() => setCurrentTraveler(traveler)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Traveler</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this traveler? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      {isDeleteModalOpen && (
                        <div>
                          <h1>Are you gay?</h1>
                          <p>
                            {isDeleteModalOpen ? "Yes" : "No"}{" "}
                            {currentAgent?.name}
                          </p>
                        </div>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => setIsDeleteModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
