import Affiliates from "../../../layouts/AffiliatesLayout";

const Terms = () => {
  const terms = [
    {
      headline: "Terms & Conditions",
      content:
        "The following are the terms and conditions governing your (hereinafter “Publisher”) relationship with Affiliate Buddies LTD No. 515106300 (hereinafter “Affiliate Buddies LTD”) and the use of any website associated with Affiliate Buddies services (hereinafter “Site”). Publisher agrees to use the Site and any additional services offered by the company only in accordance with these Terms and Conditions. the company reserves the right to make changes to the Site and these Terms and Conditions at any time. Publisher’s continued use of the Site after any such modification and notification thereof (which may be provided by e-mail to the email address provided in the course of Publisher’s registration with AFFiliate Buddies LTD) shall constitute Publisher’s consent to such modification.",
    },
    {
      headline: "Aggreement",
      content:
        "These Terms and Conditions are deemed a binding agreement between the client and the Company By using or otherwise accessing the Services, or clicking to accept or agree to these Terms and Conditions where that option is made available, the client agrees to eligibility for use of the Services and that client has read, understood, and accepted these Terms and Conditions.",
    },
    {
      headline: "Eligibility",
      content:
        "Client is allowed to use the Services if he/she are permitted in accordance with the law of their residence and/or domicile The Company has no obligation or capability to verify whether client is eligible to use the Service and bears no responsibility for your use of the Service.",
    },
    {
      headline: "Company Responsibilities and Obligations",
      content:
        "The Company’s marketing is carried out in the best possible manner according to their ability. The Company adheres to Best Practices that the sites do not contain and will not contain any material that is discriminatory, abusive, or libelous or in any way inappropriate.",
    },
    {
      headline: "Waiver",
      content: `4.1 The Company does not define, suggest and execute any control over prices or exchange rates of third parties. The Company is not a counterparty to any deal concluded. \n
            4.2 Any dispute client has concerning a transaction client shall resolve with such third party directly without involving the Company. \n
            4.3 The Company does not regulate services of third parties and has no opportunity to affect the process of providing these services and its results.`,
    },
    {
      headline: "Indemnification",
      content:
        "Client agrees to release and to indemnify, defend and hold harmless the Company and its parents, subsidiaries, affiliates and agencies, as well as the officers, directors, employees, shareholders and representatives of any of the foregoing entities, from and against any and all losses, liabilities, expenses, damages, costs (including attorneys’ fees and court costs) claims or actions of any kind whatsoever arising or resulting from client’s use of the services of third parties and client’s violation of these Terms and Conditions. The Company reserves the right, at its own expense, to assume exclusive defense and control of any matter otherwise subject to indemnification by client and, in such case, client agrees to cooperate with the Company in the defense of such matter.",
    },

    {
      headline: "Third-Party Websites and Content",
      content:
        "The Platform may contain links to websites owned or operated by parties other than the Company. Such links are provided for client’s reference only. The Company does not monitor or control resources outside the Platform and is not responsible for their content. The inclusion of links to third party resources does not imply any endorsement of the material in the Software or, unless expressly disclosed otherwise, any sponsorship, affiliation or association with its owner, operator or sponsor, nor does such inclusion of links imply that the Company is authorized to use any trade name, trademark, logo, legal or official seal, or copyrighted symbol that may be reflected in the linked website. The Company does not control the third-party content or monitor it for compliance with any requirement (e.g. truthfulness, integrity, legality). Accordingly, the Company does not bear any liability arisen in connection with client’s access or use of the third-party content.",
    },
    {
      headline: "Risk warning",
      content:
        "By accepting these Terms and Conditions, client also acknowledge that client have been warned of the following risks:",
    },
    {
      headline: "New Technology",
      content:
        "Client understands that the service is not limited to the company platform, including other associated and related technologies that are new and untested and outside of the Company’s control and adverse changes in market forces or the technology, broadly construed, will excuse the nonperformance by the Company under this Agreement including temporary interruption or permanent termination of your access to the Software and Services. ",
    },
    {
      headline: "Unfavorable regulatory environment",
      content:
        "The service has been the subject of scrutiny by various regulatory bodies around the world. The functioning of the platform could be impacted by one or more regulatory inquiries or actions, including but not limited to restrictions of use of cryptocurrencies.",
    },
    {
      headline: "Risk of theft and hacking",
      content:
        "Hackers or other groups or organizations may attempt to steal your data and password in any number of ways.Risk of security weaknesses of the Platform. There is a risk that the Platform may unintentionally include weaknesses or bugs in the source code. ",
    },
    {
      headline: "Risk of security weaknesses of the Platform",
      content:
        "There is a risk that the Platform may unintentionally include weaknesses or bugs in the source code.",
    },
    {
      headline: "Internet transmission risks",
      content:
        "Client acknowledges that there are risks associated with using the platform and Services including, but not limited to, the failure of hardware, software, and internet connections. Client acknowledge that the Company shall not be responsible for any communication failures, disruptions, errors, distortions or delays client may experience when using the Software and Services, howsoever caused.",
    },
    {
      headline: "Warranties and Represstation",
      content:
        "By entering these Terms and Conditions client warrants and represents that:",
    },
    {
      headline: "Client has full capacity to contract under applicable law;",
      content:
        "Client will only be transacting via the Platform with legally-obtained funds that belong to client; Client will not be furthering, performing, undertaking, engaging in, aiding, or abetting any unlawful activity through your relationship with us or through your use of the Software; Client will not use the platform for illegal purposes, including money laundering of criminal proceeds, transfer or receipt of payment for planning, preparation or commitment of crime, for financing the terrorism and illegal trade; Client will not use the platform for any purpose prohibited by these Terms or in any manner that could damage, disable, overburden, or impair the Company;",
    },
    {
      headline: "Client has full capacity to contract under applicable law;",
      content:
        "Client will only be transacting via the Platform with legally-obtained funds that belong to client; Client will not be furthering, performing, undertaking, engaging in, aiding, or abetting any unlawful activity through your relationship with us or through your use of the Software; Client will not use the platform for illegal purposes, including money laundering of criminal proceeds, transfer or receipt of payment for planning, preparation or commitment of crime, for financing the terrorism and illegal trade; Client will not use the platform for any purpose prohibited by these Terms or in any manner that could damage, disable, overburden, or impair the Company;",
    },
    {
      headline: "Assignment",
      content:
        "Client may not transfer or assign these Terms and Conditions or any rights or obligations he/she has under these Terms and Conditions without our prior written consent. The Company reserves the right to freely assign or transfer these Terms and Conditions and the rights and obligations under these Terms and Conditions to any third party at any time without prior notice or consent.If client objects to such transfer or assignment, client may stop using the Platform and terminate these Terms and Conditions by contacting the Company.",
    },
  ];

  return (
    <div className="pt-5 pb-4">
      <div className="mb-5 block px-6 text-base font-medium">
        <span className="text-[#2262C6]">Dashboard</span> / Terms & Condition
      </div>

      <div className="rounded-[5px] bg-white pt-4 pl-3 pb-20 shadow-md md:mb-20 md:rounded-[15px] md:pt-7 md:pl-4">
        <ul className="mx-4 list-outside list-disc px-1 md:ml-8 md:mr-40 md:px-8">
          {terms.map((terms, index) => {
            return (
              <li
                className="list-none pt-3 pb-2 text-xl font-bold md:pt-0"
                key={index}
              >
                <h1>{terms.headline}</h1>
                <ul className="list-outside pt-2 pb-2 text-base font-normal md:pb-7 md:text-base">
                  <h2> {terms.content}</h2>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Terms;

Terms.getLayout = Affiliates;
