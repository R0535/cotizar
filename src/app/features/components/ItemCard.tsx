import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Clock,
  Hash,
  ChevronLeft,
  ChevronRight,
  HardDrive,
  MonitorSmartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Feature, Section } from "./ItemList";
import { GetFeatureDto } from "@/lib/features/features/models/Features";
import { useRouter } from "next/navigation";

interface ItemCardProps {
  item: GetFeatureDto;
  sections: Section[];
}

export default function ItemCard({ item, sections }: ItemCardProps) {

  const router = useRouter();
  const handleNavigation = (e: any) => {
    router.push(`/features/${item.id}`);
  }
  return (
    <Card key={item.id} className="flex flex-col">
      <div className="h-32 bg-gray-200 relative">
        {item.previews && (
          <img
            src={item.previews}
            alt={item.label}
            className="w-full h-full object-cover"
          />
        )}
        <div
          className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white"
          style={{ backgroundColor: item.color }}
        ></div>
      </div>
      <CardContent onClick={handleNavigation} className="flex-grow p-4 hover:cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Back: {item.timeBack}h</span>
          <span>Front: {item.timeFront}h</span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium">
            {sections?.find((s) => s.id === item.sectionId)?.name}
          </span>
          <span className="text-sm bg-gray-200 px-2 py-1 rounded">
            {item.tags}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
