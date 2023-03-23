import Affiliates from "../../../layouts/AffiliatesLayout";

import AnnouncementsComponent from "./announcementsComponent";

const Announcements = () => {
  const data = [
    {
      title: "New minimum withdrawal amount for stablecoins",
      time: "2023-07-02 17:21:04",
      content:
        "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    },
    {
      title: "New minimum withdrawal amount for stablecoins",
      time: "2023-07-02 17:21:04",
      content:
        "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    },
    {
      title: "New minimum withdrawal amount for stablecoins",
      time: "2023-07-02 17:21:04",
      content:
        "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    },
  ];

  return (
    <div className="pt-5 pb-4">
      <div className="px-6 mb-5 block font-medium text-base">
        <span className="text-[#2262C6]">Dashboard</span> - Announcements
      </div>
      <div className="pt-4 mt-7 px-4 rounded-md h-auto md:rounded-2xl bg-white shadow-md pb-20 md:mb-10">
        {data.map((data, i) => {
          return <AnnouncementsComponent propsdata={data} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Announcements;

Announcements.getLayout = Affiliates;
