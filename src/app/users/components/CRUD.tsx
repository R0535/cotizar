"use client";

import {  useEffect, useState } from "react";
import Image from "next/image";
import {  Pencil, Trash2 } from "lucide-react";
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
import { GetUserDto } from "@/lib/features/users/models/Users";

type Props = {
  initialUsers: GetUserDto[] | null;
  editUser: (User?: GetUserDto) => void;
};

export default function UsersTable({ initialUsers, editUser }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentTraveler] = useState<GetUserDto | null>(null);

  const handleEdit = () => {
    if (currentUser) {
      setIsEditModalOpen(false);
      setCurrentTraveler(null);
    }
  };

  const handleDelete = () => {
    if (currentUser) {
      setIsDeleteModalOpen(false);
      setCurrentTraveler(null);
    }
  };

  useEffect(() => {
    //console.error('UsersChanges')
    //console.log('initialUsers', initialUsers)
  }, [initialUsers]);

  useEffect(() => {
    //console.error('Init')
    //console.log('currentTraveler', currentTraveler)
    //console.log('initialUsers', initialUsers)
  }, []);

  useEffect(() => {
    //console.error('Modal')
    //console.log('currentTraveler', currentTraveler)
    //console.log('isEditModalOpen', isEditModalOpen)
  }, [currentUser, isDeleteModalOpen]);
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
          {initialUsers?.map((userList) => (
            <TableRow key={userList.id}>
              <TableCell>
                <Image
                  src="https://github.com/shadcn.png"
                  alt={`${userList.name}'s profile`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell className="font-medium">{userList.name}</TableCell>
              <TableCell>{userList.email}</TableCell>
              <TableCell>{userList.code}</TableCell>
              <TableCell>{userList.active}</TableCell>
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
                      onClick={() => setCurrentTraveler(userList)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Traveler</DialogTitle>
                      <DialogDescription>
                        Make changes to the userList's information here.
                      </DialogDescription>
                    </DialogHeader>
                    {currentUser && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="edit-name"
                            value={currentUser.name}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentUser,
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
                            value={currentUser.email}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentUser,
                                email: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-code" className="text-right">
                            Code
                          </Label>
                          <Input
                            id="edit-code"
                            value={currentUser.code}
                            onChange={(e) =>
                              setCurrentTraveler({
                                ...currentUser,
                                code: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-active" className="text-right">
                            Active
                          </Label>
                          <div className="col-span-3">
                            <div
                              className={`w-6 h-6 rounded-full ${
                                currentUser.active
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                          </div>
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
                      onClick={() => setCurrentTraveler(userList)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Traveler</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this userList? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      {isDeleteModalOpen && (
                        <div>
                          <h1>Are you gay?</h1>
                          <p>
                            {isDeleteModalOpen ? "Yes" : "No"}{" "}
                            {currentUser?.name}
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
