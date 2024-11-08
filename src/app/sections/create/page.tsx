"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useAppDispatch } from "@/lib/hooks";
import { createSection } from "@/lib/features/sections/slices/SectionsSlice";
import { Section } from "../components/ItemList";

export default function Create() {
  const dispatch = useAppDispatch();
  const createSectionResponse: any = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res:any = await dispatch( createSection({ name, description }) );
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
          <CardTitle>Add New Item</CardTitle>
          <CardDescription>Enter the details for the new item</CardDescription>
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
          <CardFooter className="flex justify-between">
            <Button type="submit">Add Item</Button>
            <Button variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
