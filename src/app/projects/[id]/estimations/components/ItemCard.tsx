import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { GetProjectDto } from "@/lib/features/projects/models/Projects";
import { Estimation } from "@prisma/client";

interface ItemCardProps {
  item: GetProjectDto;
}

export default function ItemCard({ item }: ItemCardProps) {
  const router = useRouter();
  const handleNavigation = (e: any) => {
    router.push(`/projects/${item.id}`);
  };
  return (
    <Card key={item.id} className="flex flex-col">
      <div className="h-32 bg-gray-200 relative">
        {item.previews && (
          <img
            src={item.previews}
            alt={item.description}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <CardContent
        onClick={handleNavigation}
        className="flex-grow p-4 hover:cursor-pointer"
      >
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between text-sm text-gray-500"></div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <div className="flex justify-between items-center w-full">
          <div className="inline space-x-2">
            <h3 className="text-lg font-semibold mb-2">Creador</h3>
            <span>{item.createdBy}</span>
          </div>
          <div className="inline space-x-2">
            <h3 className="text-lg font-semibold mb-2">
              Fecha de creaci&oacute;n
            </h3>

            <span>
              {new Date(item.createdAt).toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
