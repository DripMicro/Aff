import Affiliates from "../../../layouts/AffiliatesLayout";
import Content from "./content";

const Privacy = () => {
  const privacy = [
    {
      headline: "PRIVACY POLICY",
      content: [
        "THE BELOW TERMS, CONDITIONS, PRIVACY, DATA PROTECTION & EULA ARE IN REGARD TO BEST-BROKERS-PARTNERS.COM SITE. PLEASE! READ THE BELOW CAREFULLY AND FEEL FREE TO CONTACT US REGARDING ANY INQUIRY OR FEEDBACK",
      ],
    },
    {
      headline: "Cookie Policy",
      content: [
        "What Are Cookies As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or ‘break’ certain elements of the sites functionality. For more general information on cookies, please read What Are Cookies",
      ],
    },
    {
      headline: "How We use Cookies",
      content: [
        "We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.",
      ],
    },
    {
      headline: "Disabling Cookies",
      content: [
        "You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Therefore it is recommended that you do not disable cookies.  ",
        "The Cookies We Set Account related cookiesIf you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out. The Cookies We Set Account related cookies If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.",
      ],
    },
    {
      headline: "The Cookies We Set Account related cookies",
      content: [
        "If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.",
      ],
    },
    {
      headline: "Login related cookies",
      content: [
        "We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.",
      ],
    },
    {
      headline: "Email newsletters related cookies",
      content: [
        "This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users.",
      ],
    },
    {
      headline: "Forms related cookies",
      content: [
        "When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.",
      ],
    },
    {
      headline: "Site preferences cookies",
      content: [
        "In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.",
      ],
    },
    {
      headline: "Third Party Cookies",
      content: [
        "In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.",
        "This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content For more information on Google Analytics cookies, see the official Google Analytics page. Third party analytics are used to track and measure usage of this site so that we can continue to produce engaging content. These cookies may track things such as how long you spend on the site or pages you visit which helps us to understand how we can improve the site for you.",
        "From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.",
        "Several partners advertise on our behalf and affiliate tracking cookies simply allow us to see if our customers have come to the site through one of our partner sites so that we can credit them appropriately and where applicable allow our affiliate partners to provide any bonus that they may provide you for making a purchase.",
        "We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. We will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.",
      ],
    },
    {
      headline: "More Information",
      content: [
        "Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren’t sure whether you need or not it’s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.",
        "However if you are still looking for more information then you can contact us through one of our preferred contact methods:",
      ],
    },
  ];

  return (
    <div className="pt-5 pb-4">
      <div className="mb-5 block px-6 text-base font-medium">
        <span className="text-[#2262C6]">Dashboard</span> / Privacy Policy
      </div>

      <div className="rounded-[5px] bg-white pt-7 pl-4 pb-20 shadow-md md:mb-10 md:rounded-[15px]">
        <ul className="mx-4 list-outside list-disc px-1 md:ml-8 md:mr-40 md:px-8 ">
          {privacy.map((privacy, index) => {
            return (
              <li className="text-lg font-bold md:text-3xl" key={index}>
                {privacy.headline}
                <ul className="list-outside pt-2 pb-2 text-sm font-normal md:pb-4 md:text-xl">
                  {privacy.content.map((content, index) => {
                    return <Content content={content} key={index} />;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Privacy;
// declare function Content(prop: { content: string });

Privacy.getLayout = Affiliates;
