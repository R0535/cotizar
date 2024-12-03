import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { CalendarIcon } from "lucide-react"

// This type represents the Estimation model from your Prisma schema
type Estimation = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    createdBy:   string  | null
    project:  string 
    calendar:  string  | null
    estimationExports:  string []
  }
  
  type EstimationListProps = {
    estimations: Estimation[]
  }
  
  export default function EstimationList({ estimations }: EstimationListProps) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Estimations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Calendar</TableHead>
                <TableHead>Exports</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estimations.map((estimation) => (
                <TableRow key={estimation.id}>
                  <TableCell className="font-medium">{estimation.name}</TableCell>
                  <TableCell>{estimation.project}</TableCell>
                  <TableCell>{estimation.createdBy || 'N/A'}</TableCell>
                  <TableCell>{estimation.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {estimation.calendar ? (
                      <Badge variant="secondary">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        Linked
                      </Badge>
                    ) : (
                      'No Calendar'
                    )}
                  </TableCell>
                  <TableCell>{estimation.estimationExports.length}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }