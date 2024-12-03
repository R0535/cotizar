"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ItemCard from "./components/ItemCard";
import { fetchProjects } from "@/lib/features/projects/slices/ProjectsSlice";
import { GetProjectDto } from "@/lib/features/projects/models/Projects";


const creators = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Alice" },
  { id: 4, name: "Bob" },
];
export default function ProjectIndex() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);

  useEffect(() => {
    dispatch(fetchProjects());

    // Fetch projects and sections
  }, []);
  useEffect(() => {
    console.log("projects and sections", projects);
    console.log(projects);
  }, [projects]);
  const [filters, setFilters] = useState({
    name: "",
    createdBy: "",
  });
  const [groupBy, setGroupBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndGroupedProjects = useMemo((): [
    string,
    GetProjectDto[]
  ][] => {

    if(!projects ){
      return [["All", [] as GetProjectDto[]]];
    }

    let result = projects.filter(
      
        (project) =>
        (project.name.toString() === filters.name || filters.name === "") &&
        (project.createdBy.toString() === filters.createdBy || filters.createdBy === "")
    );
    console.log("result FILTERR", result);

    if (groupBy) {
      const grouped = result?.reduce((acc, project) => {
        const key =
          (groupBy === "creator"
            ? creators?.find((s) => s.name === project.createdBy)?.name
            : "All") || "All";
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(project);

        return acc;
      }, {} as Record<string, GetProjectDto[]>);
      console.log("result group", grouped);
      if (!grouped) {
        return [["All", [] as GetProjectDto[]]];
      }
      return Object.entries(grouped);
    }
    console.log("result ALLLL", result);
    if (!result) {
      return [["All", [] as GetProjectDto[]]];
    }
    return [["All", result]];
  }, [projects,  filters, groupBy, searchTerm]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/projects/create">
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Link>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Customize your project view
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="section">Section</Label>
                    <Select
                      value={filters.name}
                      onValueChange={(value) =>
                        handleFilterChange("section", value)
                      }
                    >
                      <SelectTrigger id="section" className="col-span-2 h-8">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Sections</SelectItem>
                        {creators?.map((creator) => (
                          <SelectItem
                            key={creator.id}
                            value={creator.id.toString()}
                          >
                            {creator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={groupBy} onValueChange={setGroupBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Group by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Grouping</SelectItem>
            <SelectItem value="section">Section</SelectItem>
            <SelectItem value="tag">Tag</SelectItem>
            <SelectItem value="color">Color</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAndGroupedProjects.map(([group, groupProjects]) => (
        <div key={group} className="mb-8">
          {groupBy && <h2 className="text-2xl font-semibold mb-4">{group}</h2>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupProjects.map((project) => (
              (project)  && <ItemCard key={project.id} item={project} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
