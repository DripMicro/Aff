import React from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
import SingleLink from "../common/menubar/SingleLink";
import DropdownLink from "../common/menubar/DropdownLink";
import NextLink from "next/link";
import { Link, Image } from "@chakra-ui/react";

interface Props {
  collapseShow: boolean;
}

export default function Sidebar({ collapseShow }: Props) {
  // const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  const [activeName, setactiveName] = React.useState("dashboard");
  const [dropdown, setdropdown] = React.useState("");

  const activeLink = (value: string) => {
    setactiveName(value);
  };

  const activeDropdown = (value: string) => {
    setdropdown(value);
  };

  return (
    <>
      <div
        className={
          (collapseShow
            ? "w-64 rounded-tr-[50px] md:rounded-none "
            : "w-0 md:w-32 ") +
          "sidebar fixed top-16 left-0 z-10 flex h-full flex-col bg-white text-white transition-all duration-300 dark:bg-gray-900 md:top-20"
        }
      >
        <div className="flex flex-grow flex-col justify-between overflow-y-auto overflow-x-hidden">
          <ul className="relative min-h-full space-y-1 overflow-y-auto py-5 md:cursor-pointer md:py-16">
            <li>
              <SingleLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                link={"dashboard"}
                linkName={"Dashboard"}
              />
            </li>

            <li>
              <DropdownLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                dropdown={dropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                linkName={[
                  { name: "Creative Materials", link: "creative" },
                  { name: "SubAffliate Creatives", link: "sub" },
                ]}
                defaultLink={"creative"}
                dropdownName={"marketing"}
                navbarName={"Marketing Tools"}
                parentLink={""}
              />
            </li>

            <li>
              <DropdownLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                dropdown={dropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                linkName={[
                  { name: "Quick Summary Report", link: "quick-summary" },
                  {
                    name: "Sub Affiliate Report",
                    link: "sub-affiliate-report",
                  },
                ]}
                defaultLink={"quick-summary"}
                dropdownName={"reports"}
                navbarName={"Reports"}
                parentLink={"reports"}
              />
            </li>

            <li>
              <SingleLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                link={"profiles"}
                linkName={"Profiles"}
              />
            </li>

            <li>
              <DropdownLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                dropdown={dropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                linkName={[
                  { name: "Account Details", link: "account" },
                  { name: "Document", link: "documents" },
                  { name: "Payment Method", link: "account-payment" },
                  { name: "Commission Structure", link: "commissions" },
                ]}
                defaultLink={"account"}
                dropdownName={"myAccount"}
                navbarName={"My Account"}
                parentLink={""}
              />
            </li>

            <li>
              <SingleLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                link={"billings"}
                linkName={"Billings"}
              />
            </li>

            <li>
              <SingleLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                link={"pixel-monitor"}
                linkName={"Pixel Monitor"}
              />
            </li>

            <li>
              <SingleLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                link={"support"}
                linkName={"Support"}
              />
            </li>

            <li>
              <SingleLink
                setactiveName={setactiveName}
                setdropdown={setdropdown}
                activeName={activeName}
                collapseShow={collapseShow}
                link={"announcements"}
                linkName={"Announcements"}
              />
            </li>

            <div className="py-16">
              <li>
                <SingleLink
                  setactiveName={setactiveName}
                  setdropdown={setdropdown}
                  activeName={activeName}
                  collapseShow={collapseShow}
                  link={"privacy"}
                  linkName={"Privacy policy"}
                />
              </li>

              <li>
                <SingleLink
                  setactiveName={setactiveName}
                  setdropdown={setdropdown}
                  activeName={activeName}
                  collapseShow={collapseShow}
                  link={"terms"}
                  linkName={"Terms & Conditions"}
                />
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
