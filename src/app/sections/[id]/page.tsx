"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter ,useSearchParams } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createSection,
  fetchSection,
  updateSection,
} from "@/lib/features/sections/slices/SectionsSlice";

interface PageProps {
  params: {
    id: string;
  };
}
export default function Edit({ params }: PageProps) {
  const dispatch = useAppDispatch();
  const section = useAppSelector((state) => state.sections.section);

  const [name, setName] = useState(section?.description || "");
  const [description, setDescription] = useState(section?.description || "");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchSection(parseInt(id?.toString() || "")));
  }, []);

  useEffect(() => {
    if (section) {
      setName(section.name);
      setDescription(section.description);
    }
  }, [section]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await dispatch(
        updateSection({
          id: parseInt(id?.toString() || ""),
          name,
          description,
        })
      );
      if (res.payload.id) {
        router.push("/sections");
      }
    } catch (error: any) {
      console.error("Error creating section", error);
    }
  };

  return (
    <div className="container h-screen mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Section</CardTitle>
          <CardDescription>Enter the Section details</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" asChild>
              <Link href="/sections">Cancel</Link>
            </Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
