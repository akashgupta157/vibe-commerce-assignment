import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <Skeleton className="mb-2 w-3/4 h-4" />
        <Skeleton className="w-1/2 h-3" />
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-3">
        <Skeleton className="rounded-md w-40 h-40" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="rounded-md w-full h-8" />
      </CardContent>
    </Card>
  );
}
