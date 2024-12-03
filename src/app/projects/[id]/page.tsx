"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import Link from "next/link";
import {
  fetchProject,
  updateProject,
} from "@/lib/features/projects/slices/ProjectsSlice";
import EstimationList from "../components/EstimationList";

interface PageProps {
  params: {
    id: string;
  };
}



const estimations = [
  {
    id: "1",
    name: "Estimation 1",
    description: "Estimation 1 description",
    createdAt: new Date(),
    createdBy: "John Doe",
    project: "Project 1",
    calendar: "Calendar 1",
    estimationExports: ["Export 1", "Export 2"],
  },
  {
    id: "2",
    name: "Estimation 2",
    description: "Estimation 2 description",
    createdAt: new Date(),
    createdBy: "Jane Doe",
    project: "Project 2",
    calendar: "Calendar 2",
    estimationExports: ["Export 3", "Export 4"],
  },
];
export default function Edit({ params }: PageProps) {
  const dispatch = useAppDispatch();
  const sectionsEnum = useAppSelector((state) => state.sections.sectionsEnum);
  const project = useAppSelector((state) => state.projects.project);

  const [preview, setPreview] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  //create ref for file input
  const logoInputRef = useRef<HTMLInputElement>(null);
  const previewInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { id } = params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [statusDesc, setStatusDesc] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);

    if (logoInputRef?.current?.files && logoInputRef.current.files[0]) {
      formData.append("logo", logoInputRef.current.files[0]);
    }
    if (previewInputRef?.current?.files && previewInputRef.current.files[0]) {
      formData.append("preview", previewInputRef.current.files[0]);
    }

    try {
      console.log("formData", formData);
      const res: any = await dispatch(updateProject(formData));
      console.log("res", res);
      if (res.payload) {
        router.push("/projects");
      }
      // After successfully creating the project, redirect to the project list
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
    console.log("file", file);
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
  //#region UseEffects
  useEffect(() => {
    dispatch(fetchProject(id || ""));
  }, []);

  useEffect(() => {
    if (project) {
      console.log("project!!!!!!!--", project);
      setName(project.name);
      setCreatedBy(project.createdBy);
      setDescription(project.description);
      setLogo(project.logo);
      setStatus(project.status || "CORRUPTED");
      setStatusDesc(project.statusDescription || "CORRUPTED");
      setPreview(project.previews);
    }
  }, [project]);

  useEffect(() => {
    console.log("sectionsEnum", sectionsEnum);
  }, [sectionsEnum]);
  //#endregion UseEffects

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Estatus</Label>
                <Input
                  id="status"
                  placeholder="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripcion del estatus</Label>
                <Textarea
                  id="statusDescription"
                  placeholder="Enter description"
                  value={statusDesc}
                  onChange={(e) => setStatusDesc(e.target.value)}
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
                    <img
                      src={logo}
                      alt={`Logo`}
                      className="w-full h-32 object-cover rounded"
                    />
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
                    <img
                      src={preview}
                      alt={`Preview of ${name}`}
                      className="w-full h-32 object-cover rounded"
                    />
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
      <EstimationList estimations={estimations || []} />
    </div>
  );
}
