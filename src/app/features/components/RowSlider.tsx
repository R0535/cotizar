import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ItemCard from "./ItemCard";
import Link from "next/link";
import { Section } from "./ItemList";


interface ListProps {
  section: Section;
  categoryRef: React.RefObject<HTMLDivElement>;
}

export default function RowSlider({ section, categoryRef }: ListProps) {


  const scrollRow = (
    categoryRef: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (categoryRef.current) {
      const scrollAmount =
        categoryRef.current.clientWidth * (direction === "left" ? -0.8 : 0.8);
      categoryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div
      key={section.id}
      className="mb-8 p-2 border-2 border-dashed border-muted-foreground/25  rounded-lg"
    >
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex space-x-2">
          <Link href={`/sections/${section.id}`}>
            <h2 className="text-2xl font-semibold">{section.name}</h2>
          </Link>
        </div>
        <div className="flex space-x-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => console.log("Add new item")}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => scrollRow(categoryRef, "left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => scrollRow(categoryRef, "right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={categoryRef}
        className="flex overflow-x-auto pb-4 space-x-4 px-4 scrollbar-hide"
      >
        {section?.features?.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
