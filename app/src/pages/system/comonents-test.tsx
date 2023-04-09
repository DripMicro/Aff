// http://localhost:3001/system/comonents-test

import type { MyPage } from "../../components/common/types";
const ComponentTest: MyPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-red-500">Sample Red Text</div>
      <div className="bg-red-500">Sample Red Text</div>
      <div className="border border-azure text-azure">Sample Azure Text</div>
      <div className="bg-azure">Sample Azure Text</div>
      <div className="border border-slate-200 text-slate-500">
        Sample Slate Text
      </div>
      <div className="bg-slate-500">Sample Slate Text</div>
    </div>
  );
};

export default ComponentTest;
ComponentTest.Layout = "NoLayout";
