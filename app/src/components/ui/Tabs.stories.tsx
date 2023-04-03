import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const Tab = () => (
  <div className="flex flex-col items-start gap-8">
    <Tabs defaultValue="Performance">
          <TabsList>
            <TabsTrigger
              value="Performance"
            >
              Performace Chart
            </TabsTrigger>
            <TabsTrigger
              value="conversion"
            >
              Conversion Chart
            </TabsTrigger>
          </TabsList>
          <TabsContent className="border-0" value="Performance">
            <div className="mt-5 h-80 pb-5">
              aaa
            </div>
          </TabsContent>
          <TabsContent className="border-0" value="conversion">
            <div className="mt-5 h-80  pb-5">
              bbb
            </div>
          </TabsContent>
        </Tabs>
  </div>
);

const meta = {
  component: Tab,
};

export default meta;

export const TabsComponent = {
  render: (args: any) => {
    return (
      <div className="mt-4 flex">
        <Tab />
      </div>
    );
  },
};
