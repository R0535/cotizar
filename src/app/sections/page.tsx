"use client";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  closeCreateModal,
  createSection,
  fetchSections,
  setSections,
} from "@/lib/features/sections/slices/SectionsSlice";
import { GetSectionDto } from "@/lib/features/sections/models/Sections";
import ItemList from "./components/ItemList";
const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}

const Page: React.FC = () => {
  //send initial request to get all sections
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSections());
  }, []);

  const screenVM = useAppSelector((state) => state.sections.screenVM);
  const loading = useAppSelector((state) => state.sections.loading);
  const error = useAppSelector((state) => state.sections.apiError);

  const sections = useAppSelector(
    (state) => state.sections.sections
  ) as GetSectionDto[];
  const createSectionForm = useAppSelector(
    (state) => state.sections.createSectionForm
  );
  const createSectionFormErrors = useAppSelector(
    (state) => state.sections.createSectionFormErrors
  );
  const editSectionForm = useAppSelector(
    (state) => state.sections.editSectionForm
  );
  const editSectionFormErrors = useAppSelector(
    (state) => state.sections.editSectionFormErrors
  );

  const handleSaveNewSection = () => {
    if (createSectionForm) {
      const newSection = dispatch(createSection(createSectionForm));
      newSection.then((section) => {
        if (section.payload) {
          const newSectionsList: GetSectionDto[] = [
            ...sections,
            section.payload as GetSectionDto,
          ];
          dispatch(setSections(newSectionsList));
          dispatch(closeCreateModal());
        }
      });
    }
  };
  return (
    <div className="flex flex-col ">
      {/* Header */}
      <header className="py-4 px-6 bg-background border-b w-full">
        <div className="w-full flex justify-between gap-4">
          <h1 className="text-2xl font-bold">Sections</h1>

          <Button
            onClick={() => {
              window.location.href = "/sections/create";
            }}
          >
            Create New Section
          </Button>
        </div>
      </header>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/30">
        <Input className="w-full sm:w-auto" placeholder="Search..." />

        <Select>
          <option value="">Filter by...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
        <Button variant="outline">Apply Filters</Button>
      </div>

      {/* Actions Row */}
      <div className="flex justify-between items-center px-8 ">
        <div className="flex justify-end">
          {/* <Dialog
            open={screenVM.modalCreateSectionOpen}
            onOpenChange={(isOpen) => {
              if (isOpen) dispatch(openCreateModal());
              else dispatch(closeCreateModal());
            }}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Section</DialogTitle>
                <DialogDescription>
                  Enter the details of the new section here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={createSectionForm?.name}
                    onChange={(e) =>
                      dispatch(
                        setCreateSectionForm({
                          ...createSectionForm,
                          name: e.target.value,
                        } as PostSectionRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    email
                  </Label>
                  <Input
                    id="email"
                    value={createSectionForm?.email}
                    onChange={(e) =>
                      dispatch(
                        setCreateSectionForm({
                          ...createSectionForm,
                          email: e.target.value,
                        } as PostSectionRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={createSectionForm?.phone}
                    onChange={(e) =>
                      dispatch(
                        setCreateSectionForm({
                          ...createSectionForm,
                          phone: e.target.value,
                        } as PostSectionRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={createSectionForm?.address}
                    onChange={(e) =>
                      dispatch(
                        setCreateSectionForm({
                          ...createSectionForm,
                          address: e.target.value,
                        } as PostSectionRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={createSectionForm?.city}
                    onChange={(e) =>
                      dispatch(
                        setCreateSectionForm({
                          ...createSectionForm,
                          city: e.target.value,
                        } as PostSectionRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="state" className="text-right">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={createSectionForm?.state}
                    onChange={(e) =>
                      dispatch(
                        setCreateSectionForm({
                          ...createSectionForm,
                          state: e.target.value,
                        } as PostSectionRequest)
                      )
                    }
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="zip" className="text-right">
                    Zip
                  </Label>
                  <Input
                    id="zip"
                    value={createSectionForm?.zip}
                    onChange={(e) =>
                      dispatch(
                        setCreateSectionForm({
                          ...createSectionForm,
                          zip: e.target.value,
                        } as PostSectionRequest)
                      )
                    }
                    className="col-span-3"
                  />

                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Input
                    id="country"
                    value={createSectionForm?.country}
                    onChange={(e) =>
                      dispatch(
                        setCreateSectionForm({
                          ...createSectionForm,
                          country: e.target.value,
                        } as PostSectionRequest)
                      )
                    }
                  />
                </div>


              </div>
              <DialogFooter>
                <Button onClick={handleSaveNewSection}>Add Section</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <span className="sr-only">Grid view</span>
          </Button>
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {/* Data Table Area */}
      <div className="flex-grow overflow-auto min-w-[475px]">
        {/* This is where your data table component will go */}
        <div className="h-full  flex items-center justify-center">
          {/* Add more content here to demonstrate scrolling */}
          <div className="container p-4">
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <Spinner size="medium" />
              </div>
            ) : sections?.length > 0 ? (
              <ItemList sections={sections} />
            ) : error ? (
              <div className="flex items-center justify-center w-full">
                <p>Error loading sections.</p>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <p>No sections found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="p-4 bg-muted text-muted-foreground border-t">
        <div className="flex justify-between items-center">
          <span>Total Items: 100</span>
          <span>Page 1 of 10</span>
          <span>Showing 1-10 of 100</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
