
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TaxTable = () => {
  const taxData = [
    { state: "New York", weight: "18,001+ lbs", taxName: "NYHUT" },
    { state: "New Mexico", weight: "26,001+ lbs", taxName: "NMHUT" },
    { state: "Oregon", weight: "26,000+ lbs", taxName: "OHUT" },
    { state: "Kentucky", weight: "59,999+ lbs", taxName: "KYHUT" },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">State Taxes You May Need to File</h2>
          <p className="text-xl text-gray-600">
            Heavy vehicle use taxes vary by state and vehicle weight
          </p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Heavy Vehicle Use Tax Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg font-semibold">State</TableHead>
                  <TableHead className="text-lg font-semibold">Vehicle Weight</TableHead>
                  <TableHead className="text-lg font-semibold">Tax Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-lg">{row.state}</TableCell>
                    <TableCell className="text-lg">{row.weight}</TableCell>
                    <TableCell className="text-lg font-semibold text-blue-600">{row.taxName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TaxTable;
