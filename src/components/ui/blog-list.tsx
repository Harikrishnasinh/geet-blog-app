import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleBlog from "./single-blog";

const BlogList = () => {
  return (
    <div className="w-100 border-r-2 md:w-3/4">
    <div className="px-2 py-1 pb-2 block md:hidden">
      <Input type="text" placeholder="Search" />
    </div>
      <Tabs defaultValue="all">
        <TabsList className="flex align-center justify-between gap-2 p-2 w-[100vw] overflow-x-scroll md:w-[49vw] md:overflow-x-scroll removeScroll">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="javascript">Javascript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="C#">C#</TabsTrigger>
          <TabsTrigger value="machine-learning">Machine Learning</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="overflow-y-auto removeScroll p-1">
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
            <SingleBlog name="all" />
          </div>
        </TabsContent>
        <TabsContent value="javascript">
          <div className="overflow-y-auto removeScroll p-1">
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />
            <SingleBlog name="javascript" />

          </div>
        </TabsContent>
        <TabsContent value="python">
          <div className="overflow-y-auto removeScroll p-1">
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
            <SingleBlog name="python" />
          </div>
        </TabsContent>
        <TabsContent value="C#">
          <div className="overflow-y-auto removeScroll p-1">
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
            <SingleBlog name="c#" />
          </div>
        </TabsContent>
        <TabsContent value="machine-learning">
          <div className="overflow-y-auto removeScroll p-1">
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
            <SingleBlog name="machine-learning" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogList;
