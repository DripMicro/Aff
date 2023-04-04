import { Loading } from "./Loading";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip as TooltipC,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const meta = {
  component: Loading,
};

export default meta;

const parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/0JFoPEDsqew7pF100tiCOT/affiliate-dashboard-v2?node-id=0-1&t=mENcExO3qBpdDVj0-0",
  },
};

export const Typography = {
  render: () => (
    <div>
      <h1 className="text-2xl">H1 - Header</h1>
      <h2 className="text-xl">H2 - Header</h2>
      <h3 className="text-lg">H3 - Header</h3>
      <p>
        Paragraph <b>Bold</b> Text
      </p>
      <p className="text-sm">Small text</p>
    </div>
  ),
  parameters,
};

export const ProseTypography = {
  render: () => (
    <div className="prose">
      <h1>H1 - Header</h1>
      <h2>H2 - Header</h2>
      <h3>H3 - Header</h3>
      <h4>H4 - Header</h4>
      <p>
        Paragraph <b>Bold</b> Text
      </p>
    </div>
  ),
  parameters,
};

export const Colors = {
  render: () => (
    <>
      <div className="bg-primary-from h-20 w-20">Primary from</div>
      <div className="bg-primary-to  h-20 w-20">Primary to</div>
      <div className="h-20  w-20 bg-primary">Primary gradient</div>
      <div className="bg-secondary-from  h-20 w-20">Secondary from</div>
      <div className="bg-secondary-to  h-20 w-20">Secondary to</div>
      <div className="h-20  w-20 bg-secondary">Secondary gradient</div>
    </>
  ),
  parameters,
};

export const Tags = {
  render: () => (
    <>
      <div>Black</div>
      <div>Primary</div>
      <div>Outline</div>
    </>
  ),
  parameters,
};

export const Tooltip = {
  render: () => (
    <div className="m-12">
      <TooltipC>
        <TooltipTrigger asChild>
          <Button variant="outline" className="w-10 rounded-full p-0">
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </TooltipC>
    </div>
  ),
  parameters,
};
