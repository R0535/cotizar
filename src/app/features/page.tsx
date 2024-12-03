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
import { fetchFeatures } from "@/lib/features/features/slices/FeaturesSlice";
import { fetchSections } from "@/lib/features/sections/slices/SectionsSlice";
import { GetFeatureDto } from "@/lib/features/features/models/Features";
import ItemCard from "./components/ItemCard";

export default function FeatureIndex() {
  const dispatch = useAppDispatch();
  const features = useAppSelector((state) => state.features.features);
  const sections = useAppSelector((state) => state.sections.sections);

  useEffect(() => {
    dispatch(fetchFeatures());
    dispatch(fetchSections());

    // Fetch features and sections
  }, []);
  useEffect(() => {
    console.log("features and sections", features, sections);
    console.log(features);
    console.log(sections);
  }, [features, sections]);
  const [filters, setFilters] = useState({
    section: "",
    tag: "",
    color: "",
    minTime: 0,
    maxTime: 20,
  });
  const [groupBy, setGroupBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndGroupedFeatures = useMemo((): [
    string,
    GetFeatureDto[]
  ][] => {

    if(!features || !sections){
      return [["All", []]];
    }

    let result = features.filter(
      
        (feature) =>
        (feature.sectionId.toString() === filters.section || filters.section === "") &&
        (feature.tags === filters.tag || filters.tag === "") &&
        (feature.color === filters.color || filters.color === "") &&
        (feature.timeBack >= filters.minTime && feature.timeBack <= filters.maxTime) &&
        (feature.timeFront >= filters.minTime && feature.timeFront <= filters.maxTime) &&
        (feature.label.toLowerCase().includes(searchTerm.toLowerCase()) || feature.description.toLowerCase().includes(searchTerm.toLowerCase()))

    );
    console.log("result FILTERR", result);

    if (groupBy) {
      const grouped = result?.reduce((acc, feature) => {
        const key =
          (groupBy === "section"
            ? sections?.find((s) => s.id === feature.sectionId)?.name
            : groupBy === "tag"
            ? feature.tags
            : groupBy === "color"
            ? feature.color
            : "All") || "All";
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(feature);

        return acc;
      }, {} as Record<string, GetFeatureDto[]>);
      console.log("result group", grouped);
      if (!grouped) {
        return [["All", []]];
      }
      return Object.entries(grouped);
    }
    console.log("result ALLLL", result);
    if (!result) {
      return [["All", []]];
    }
    return [["All", result]];
  }, [features, sections, filters, groupBy, searchTerm]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Features</h1>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/features/create">
              <Plus className="mr-2 h-4 w-4" /> Add New Feature
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
                    Customize your feature view
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="section">Section</Label>
                    <Select
                      value={filters.section}
                      onValueChange={(value) =>
                        handleFilterChange("section", value)
                      }
                    >
                      <SelectTrigger id="section" className="col-span-2 h-8">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Sections</SelectItem>
                        {sections?.map((section) => (
                          <SelectItem
                            key={section.id}
                            value={section.id.toString()}
                          >
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="tag">Tag</Label>
                    <Select
                      value={filters.tag}
                      onValueChange={(value) =>
                        handleFilterChange("tag", value)
                      }
                    >
                      <SelectTrigger id="tag" className="col-span-2 h-8">
                        <SelectValue placeholder="Select tag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Tags</SelectItem>
                        <SelectItem value="UI">UI</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      type="color"
                      value={filters.color}
                      onChange={(e) =>
                        handleFilterChange("color", e.target.value)
                      }
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time Range</Label>
                    <Slider
                      min={0}
                      max={20}
                      step={0.1}
                      value={[filters.minTime, filters.maxTime]}
                      onValueChange={([min, max]) => {
                        handleFilterChange("minTime", min);
                        handleFilterChange("maxTime", max);
                      }}
                    />
                    <div className="flex justify-between text-sm">
                      <span>{filters.minTime.toFixed(1)}h</span>
                      <span>{filters.maxTime.toFixed(1)}h</span>
                    </div>
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
          placeholder="Search features..."
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

      {filteredAndGroupedFeatures.map(([group, groupFeatures]) => (
        <div key={group} className="mb-8">
          {groupBy && <h2 className="text-2xl font-semibold mb-4">{group}</h2>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupFeatures.map((feature) => (
              (feature&&sections)  && <ItemCard key={feature.id} item={feature} sections={sections} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
