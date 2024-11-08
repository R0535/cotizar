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
import { Feature } from "./ItemList";





export default function ItemCard(item: Feature) {

  return (
    <Card style={{ backgroundColor: item.color! }}>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={item.previews}
          alt={`${item.label} preview, ${item.description}`}
          fill
          className={`object-cover rounded-t-lg ]`}
        />
      </AspectRatio>
      <CardContent className="p-4 min-h-40">
        <Link href={`/features/${item.sectionId}`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-100">
            {item.label}
          </h3>
        </Link>
        <p className="text-sm text-gray-400 mb-4">{item.description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <div className="flex items-center">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <HardDrive className="h-4 w-4 mr-1" />
            </div>
            <span>{item.timeBack} Hs.</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <MonitorSmartphone className="h-4 w-4 mr-1" />
            <span>{item.timeFront} Hs.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
