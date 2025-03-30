import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const MainBlogListSkeleton = () => {
    const counter = [0,0,0,0,0,0,0]
  return (
    <>
    {
        counter.map(() =>{
            return <div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-[5vh] w-[5vh] rounded-full" />
              <Skeleton className="h-[3vh] w-100 rounded-sm" />
            </div>
            <div className="flex h-auto mt-6">
              <div className="w-[80%] h-full flex flex-col items-start justify-start gap-4">
                <Skeleton className="h-[5vh] w-[75%]"></Skeleton>
                <Skeleton className="h-[5vh] w-[85%]"></Skeleton>
              </div>
              <div className="md:w-[20%] h-full">
                <Skeleton className="h-[13vh] w-[95%]"></Skeleton>
              </div>
            </div>
            <Separator className="my-5"/>
          </div>
        })
    }
    </>
  );
};

export default MainBlogListSkeleton;
