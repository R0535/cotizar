"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  closeCreateModal,
  createUser,
  fetchUsers,
  openCreateModal,
  setUser,
  setUsers,
} from "@/lib/features/users/slices/UsersSlice";
import UsersTable from "./components/CRUD";
import { GetUserDto } from "@/lib/features/users/models/Users";
import CreateUserForm from "./components/form";
import { fetchAgents } from "@/lib/features/agents/slices/AgentsSlice";

const Page: React.FC = () => {
  const dispatch = useAppDispatch();

  //send initial request to get all users
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAgents());
  }, []);

  const screenVM = useAppSelector((state) => state.users.screenVM);

  const users = useAppSelector((state) => state.users.users) as GetUserDto[];

  const createUserForm = useAppSelector((state) => state.users.createUserForm);
  const createUserFormErrors = useAppSelector(
    (state) => state.users.createUserFormErrors
  );
  const editUserForm = useAppSelector((state) => state.users.editUserForm);
  const editUserFormErrors = useAppSelector(
    (state) => state.users.editUserFormErrors
  );

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleSaveNewUser = () => {
    if (createUserForm) {
      const newUser = dispatch(createUser(createUserForm));
      newUser.then((user) => {
        if (user.payload) {
          const newUsersList: GetUserDto[] = [
            ...users,
            user.payload as GetUserDto,
          ];
          dispatch(setUsers(newUsersList));
          dispatch(closeCreateModal());
        }
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-background border-b">
        <h1 className="text-2xl font-bold">Users</h1>
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
          <Dialog
            open={screenVM.modalCreateUserOpen}
            onOpenChange={(isOpen) => {
              if (isOpen) dispatch(openCreateModal());
              else dispatch(closeCreateModal());
            }}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Enter the details of the new user here.
                </DialogDescription>
              </DialogHeader>
              <CreateUserForm createUserForm={createUserForm}></CreateUserForm>
              <DialogFooter>
                <Button onClick={handleSaveNewUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <span className="sr-only">Grid view</span>
          </Button>
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
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
            <UsersTable
              initialUsers={users}
              editUser={(selectedUser) => {
                if (selectedUser) {
                  dispatch(setUser(selectedUser));
                }
              }}
            ></UsersTable>
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
