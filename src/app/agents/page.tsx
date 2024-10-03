"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import AppLayout from "@/app/layouts/app-layout";
import ListPageLayout from "@/app/layouts/list-layout";
import React, { useEffect, useState } from "react";
import TravelerTable from "./components/CRUD";
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
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  closeCreateModal,
  createAgent,
  editAgent,
  fetchAgents,
  openCreateModal,
  setAgent,
  setAgents,
  setCreateAgentForm,
  setEditAgentForm,
} from "@/lib/features/agents/slices/AgentsSlice";
import { create } from "domain";
import AgentsTable from "./components/CRUD";
import {
  GetAgentDto,
  PostAgentRequest,
} from "@/lib/features/agents/models/Agents";

const Page: React.FC = () => {
  const dispatch = useAppDispatch();

  //send initial request to get all agents
  useEffect(() => {
    dispatch(fetchAgents());
  }, []);

  const screenVM = useAppSelector((state) => state.agents.screenVM);

  const agents = useAppSelector(
    (state) => state.agents.agents
  ) as GetAgentDto[];
  const createAgentForm = useAppSelector(
    (state) => state.agents.createAgentForm
  );
  const createAgentFormErrors = useAppSelector(
    (state) => state.agents.createAgentFormErrors
  );
  const editAgentForm = useAppSelector((state) => state.agents.editAgentForm);
  const editAgentFormErrors = useAppSelector(
    (state) => state.agents.editAgentFormErrors
  );

  useEffect(() => {
    console.log(agents);
  }, [agents]);

  const handleSaveNewAgent = () => {
    if (createAgentForm) {
      const newAgent = dispatch(createAgent(createAgentForm));
      newAgent.then((agent) => {
        if (agent.payload) {
          const newAgentsList: GetAgentDto[] = [
            ...agents,
            agent.payload as GetAgentDto,
          ];
          dispatch(setAgents(newAgentsList));
          dispatch(closeCreateModal());
        }
      });
    }
  };
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
          <Dialog
            open={screenVM.modalCreateAgentOpen}
            onOpenChange={(isOpen) => {
              if (isOpen) dispatch(openCreateModal());
              else dispatch(closeCreateModal());
            }}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Traveler
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Traveler</DialogTitle>
                <DialogDescription>
                  Enter the details of the new traveler here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={createAgentForm?.name}
                    onChange={(e) =>
                      dispatch(
                        setCreateAgentForm({
                          ...createAgentForm,
                          name: e.target.value,
                        } as PostAgentRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    email
                  </Label>
                  <Input
                    id="email"
                    value={createAgentForm?.email}
                    onChange={(e) =>
                      dispatch(
                        setCreateAgentForm({
                          ...createAgentForm,
                          email: e.target.value,
                        } as PostAgentRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={createAgentForm?.phone}
                    onChange={(e) =>
                      dispatch(
                        setCreateAgentForm({
                          ...createAgentForm,
                          phone: e.target.value,
                        } as PostAgentRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={createAgentForm?.address}
                    onChange={(e) =>
                      dispatch(
                        setCreateAgentForm({
                          ...createAgentForm,
                          address: e.target.value,
                        } as PostAgentRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={createAgentForm?.city}
                    onChange={(e) =>
                      dispatch(
                        setCreateAgentForm({
                          ...createAgentForm,
                          city: e.target.value,
                        } as PostAgentRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="state" className="text-right">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={createAgentForm?.state}
                    onChange={(e) =>
                      dispatch(
                        setCreateAgentForm({
                          ...createAgentForm,
                          state: e.target.value,
                        } as PostAgentRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="zip" className="text-right">
                    Zip
                  </Label>
                  <Input
                    id="zip"
                    value={createAgentForm?.zip}
                    onChange={(e) =>
                      dispatch(
                        setCreateAgentForm({
                          ...createAgentForm,
                          zip: e.target.value,
                        } as PostAgentRequest)
                      )
                    }
                    className="col-span-3"
                  />

                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Input
                    id="country"
                    value={createAgentForm?.country}
                    onChange={(e) =>
                      dispatch(
                        setCreateAgentForm({
                          ...createAgentForm,
                          country: e.target.value,
                        } as PostAgentRequest)
                      )
                    }
                  />
                </div>


              </div>
              <DialogFooter>
                <Button onClick={handleSaveNewAgent}>Add Traveler</Button>
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
            <AgentsTable
              initialAgents={agents}
              editAgent={(selectedAgent) => {
                if (selectedAgent) {
                  dispatch(setAgent(selectedAgent));
                }
              }}
            ></AgentsTable>
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
