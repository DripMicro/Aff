import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "./tabs";

const Tab = () => (
  <div className="flex flex-col items-start gap-8">
    <Tabs>
      <TabsList className="p-0">
        <TabsTrigger value="tab1">Tab1</TabsTrigger>
        <TabsTrigger value="tab2">Tab2</TabsTrigger>
      </TabsList>
      <TabsContent className="border-0" value="tab1">
        Tab1 Content
      </TabsContent>
      <TabsContent value="tab2">
        Tab2 Content
      </TabsContent>
    </Tabs>
  </div>
);

const meta = {
  component: Tab,
};

export default meta;

export const Primary = {
  render: (args: any) => {
    return (
      <div className="mt-4 flex">
        <Tab />
      </div>
    );
  }
}
