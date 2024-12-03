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

import Link from "next/link";
import { X } from "lucide-react";
import { createProject } from "@/lib/features/projects/slices/ProjectsSlice";

export default function CreateProject() {
  const dispatch = useAppDispatch();

  const [preview, setPreview] = useState<string>("");
  const [logo, setLogo] = useState<string>("");

  //create ref for file input
  const logoInputRef = useRef<HTMLInputElement>(null);
  const previewInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("createdBy", createdBy);

    if (logoInputRef?.current?.files && logoInputRef.current.files[0]) {
      formData.append("logo", logoInputRef.current.files[0]);
    }
    if (previewInputRef?.current?.files && previewInputRef.current.files[0]) {
      formData.append("preview", previewInputRef.current.files[0]);
    }

    try {
      console.log("formData", formData);
      const res: any = await dispatch(createProject(formData));
      console.log("res", res);
      // After successfully creating the project, redirect to the project list
      if (!res.error) {
        router.push("/projects/" + res.payload);
      }
      throw new Error("Failed to create project", res.error);
      //router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
    }
    // After successfully creating the project, redirect to the project list
    //router.push("/projects");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file && file !== null) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file && file !== null) {
      setLogo(URL.createObjectURL(file));
    }
  };
  const removePreview = () => {
    setPreview("");
  };
  const removeLogo = () => {
    setLogo("");
  };

  useEffect(() => {}, [ logoInputRef, previewInputRef]);

  //#region UseEffects

  //#endregion UseEffects

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="Name"
                  placeholder="Enter item name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Creado Por</Label>
                <Input
                  id="createdBy"
                  placeholder="Enter User Name"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previews">Logo</Label>
                <Input
                  ref={logoInputRef}
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="mt-1"
                />
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <div className="relative">
                    {logo && (
                      <img
                        src={logo}
                        alt={`Logo`}
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1"
                      onClick={removeLogo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="previews">Preview</Label>
                <Input
                  ref={previewInputRef}
                  id="preview"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                />
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <div className="relative">
                    {preview && (
                      <img
                        src={preview}
                        alt={`Preview of ${name}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1"
                      onClick={removePreview}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" asChild>
              <Link href="/projects">Cancel</Link>
            </Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
