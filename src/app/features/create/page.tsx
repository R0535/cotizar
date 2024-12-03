"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchSectionsEnum } from "@/lib/features/sections/slices/SectionsSlice";
import { createFeature } from "@/lib/features/features/slices/FeaturesSlice";
import Link from "next/link";
import { X } from "lucide-react";

export default function CreateFeature() {
  const dispatch = useAppDispatch();
  const sectionsEnum = useAppSelector((state) => state.sections.sectionsEnum);

  const [previews, setPreviews] = useState<string[]>([]);
  //create ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [timeBack, setTimeBack] = useState(0);
  const [timeFront, setTimeFront] = useState(0);
  const [color, setColor] = useState("");
  const [tags, setTags] = useState("");
  const [sectionId, setSectionId] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("label", label);
    formData.append("description", description);
    formData.append("timeBack", timeBack.toString());
    formData.append("timeFront", timeFront.toString());
    formData.append("color", color);
    formData.append("tags", tags);
    formData.append("sectionId", sectionId.toString());

    if(fileInputRef?.current?.files && fileInputRef.current.files[0]){
      formData.append("preview", fileInputRef.current.files[0] );
    }

    try {
      console.log("formData", formData);
      const res: any = await dispatch(createFeature(formData));
      console.log("res", res);
      // After successfully creating the feature, redirect to the feature list
      //router.push("/features");
    } catch (error) {
      console.error("Error creating feature:", error);
    }
    // After successfully creating the feature, redirect to the feature list
    //router.push("/features");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  //#region UseEffects
  useEffect(() => {
    dispatch(fetchSectionsEnum());
  }, []);
  useEffect(() => {
    console.log("sectionsEnum", sectionsEnum);
  }, [sectionsEnum]);
  //#endregion UseEffects

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Feature</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Label</Label>
              <Input
                id="label"
                placeholder="Enter item label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeBack">Time Back</Label>
                <Input
                  id="timeBack"
                  type="number"
                  value={timeBack}
                  onChange={(e) => setTimeBack(parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeFront">Time Front</Label>
                <Input
                  id="timeFront"
                  type="number"
                  value={timeFront}
                  onChange={(e) => setTimeFront(parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 p-1"
                  required
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Separate tags with commas"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500">
                Enter tags separated by commas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sectionId">Section</Label>
              <select
                id="sectionId"
                value={sectionId}
                onChange={(e) => setSectionId(parseInt(e.target.value))}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select a section
                </option>
                {sectionsEnum?.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="previews">Previews</Label>
              <Input
              ref={fileInputRef}
                id="previews"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1"
              />
              <div className="mt-2 grid grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1"
                      onClick={() => removePreview(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
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
