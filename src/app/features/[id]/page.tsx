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
  createFeature,
  fetchFeature,
  updateFeature,
} from "@/lib/features/features/slices/FeaturesSlice";

interface PageProps {
  params: {
    id: string;
  };
}
export default function Edit({ params }: PageProps) {
  const dispatch = useAppDispatch();
  const feature = useAppSelector((state) => state.features.feature);

  const [name, setName] = useState(feature?.description || "");
  const [description, setDescription] = useState(feature?.description || "");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchFeature(parseInt(id?.toString() || "")));
  }, []);

  useEffect(() => {
    if (feature) {
      setName(feature.name);
      setDescription(feature.description);
    }
  }, [feature]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await dispatch(
        updateFeature({
          id: parseInt(id?.toString() || ""),
          name,
          description,
        })
      );
      if (res.payload.id) {
        router.push("/features");
      }
    } catch (error: any) {
      console.error("Error creating feature", error);
    }
  };

  return (
    <div className="container h-screen mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Feature</CardTitle>
          <CardDescription>Enter the Feature details</CardDescription>
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
              <Link href="/features">Cancel</Link>
            </Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
