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
      <div className="mb-5 block px-6 text-base font-medium">
        <span className="text-[#2262C6]">Dashboard</span> / Announcements
      </div>
      <div className="mt-7 h-auto rounded-md bg-white px-4 pt-4 pb-20 shadow-md md:mb-10 md:rounded-2xl">
        {data.map((data, i) => {
          return <AnnouncementsComponent propsdata={data} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Announcements;

Announcements.getLayout = Affiliates;
