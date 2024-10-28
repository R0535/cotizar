"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Agent } from "http";

interface AgentItem {
  id: string;
  name: string;
}

const agents = [
  { id: "1", name: "Agent 1" },
  { id: "2", name: "Agent 2" },
  { id: "3", name: "Agent 3" },
] as AgentItem[];

export default function Page() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agentId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgentSelect = (currentValue: string) => {
    setValue(currentValue);
    setFormData((prev) => ({ ...prev, agentId: currentValue }));
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Agent</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? agents.find((agent) => agent.id === value)?.name
                : "Select agent..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[200px] p-0"
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <Command>
              <CommandInput placeholder="Search agent..." />
              <CommandEmpty>No agent found.</CommandEmpty>
              <CommandGroup>
                {agents?.map((agent) => (
                  <CommandItem
                    key={agent.id}
                    value={agent.id}
                    onSelect={handleAgentSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === agent.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {agent.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
