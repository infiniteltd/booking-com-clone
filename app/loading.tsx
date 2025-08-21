import { Skeleton } from "@/Components/ui/skeleton";

export default function LoadingResults() {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <p className="text-center animate-pulse font-bold text-[#013894] pt-10">
          Sit tight - we're scanning the market for the best deals!
        </p>
      </div>

      <div className="flex justify-center py-10">
        <div className="w-10 h-10 bg-[#013894] rounded-full animate-bounce"></div>
      </div>

      <div className="space-y-2 p-5">
        {[...Array(10)].map((_, i) => (
          <div>
            <Skeleton className="h-20 w-20 md:h-44 md:w-44 rounded-lg" />
            <Skeleton className="h-44 w-full rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
