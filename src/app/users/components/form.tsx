import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GetAgentDto } from "@/lib/features/agents/models/Agents";
import { PostUserRequest } from "@/lib/features/users/models/Users";
import { setCreateUserForm } from "@/lib/features/users/slices/UsersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateUserFormProps {
  createUserForm: PostUserRequest | null;
}

export default function CreateUserForm({
  createUserForm,
}: CreateUserFormProps) {
  const dispatch = useAppDispatch();

  const agents = useAppSelector(
    (state) => state.agents.agents
  ) as GetAgentDto[];

  const [openSelector, setOpenSelector] = useState(false);
  const [agent, setAgent] = useState("");

  const handleSetAgent = (agentId: string) => {
    dispatch(
      setCreateUserForm({
        ...createUserForm,
        agentId: agentId,
      } as PostUserRequest)
    );
    setOpenSelector(false);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          value={createUserForm?.name}
          onChange={(e) =>
            dispatch(
              setCreateUserForm({
                ...createUserForm,
                name: e.target.value,
              } as PostUserRequest)
            )
          }
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          value={createUserForm?.email}
          onChange={(e) =>
            dispatch(
              setCreateUserForm({
                ...createUserForm,
                email: e.target.value,
              } as PostUserRequest)
            )
          }
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="password" className="text-right">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={createUserForm?.password}
          onChange={(e) =>
            dispatch(
              setCreateUserForm({
                ...createUserForm,
                password: e.target.value,
              } as PostUserRequest)
            )
          }
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="Agent" className="text-right">
          Agent
        </Label>
        <Select>
          <SelectTrigger className="col-span-3 w-full">
            <SelectValue placeholder="Select Agent..." />
          </SelectTrigger>
          <SelectContent className="col-span-3 w-full">
            {agents?.map((agentItem) => (
              <SelectItem
                key={agentItem.id}
                value={agentItem.id}
                onSelect={() => handleSetAgent(agentItem.id)}
              >
                {agentItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* <Popover open={openSelector} onOpenChange={setOpenSelector}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="col-span-3 justify-between"
            >
              {createUserForm?.agentId
                ? agents.find(
                    (labelAgent) => labelAgent.id == createUserForm.agentId
                  )?.name
                : "Select agent"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder="Search agent..." className="h-9" />
              <CommandList>
                <CommandEmpty>No agent found.</CommandEmpty>
                <CommandGroup>
                  {agents?.map((agentItem) => (
                    <CommandItem
                      key={agentItem.id}
                      value={agentItem.id}
                      onSelect={
                        handleSetAgent
                      }
                    >
                      {agentItem.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover> */}
      </div>
    </div>
  );
}
