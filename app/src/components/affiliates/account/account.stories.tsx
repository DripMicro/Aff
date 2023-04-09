/* eslint-disable
       @typescript-eslint/require-await
*/

import { FormAccount } from "@/components/affiliates/account/FormAccount";
import type { AffiliateAccountType } from "@/server/db-types";
import { FormInvoice } from "./FormInvoice";
import { FormContact } from "@/components/affiliates/account/FormContact";
import { FormSignin } from "@/components/affiliates/account/FormSignin";
import { FormWebSites } from "@/components/affiliates/account/FormWebSites";
import { FormTest } from "@/components/common/forms/form-test";
import { schema as paymentDetailsSchema } from "@/shared-types/forms/payment-details";
import { schema as signupSchema } from "@/shared-types/forms/register";
import { schema as lostPasswordSchema } from "@/shared-types/forms/lost-password";
import { schema as pixelMonitorSchema } from "@/shared-types/forms/pixel-monitor";
import { schema as documentSchema } from "@/components/affiliates/documents/Documents";
import { schema as ticketSchema } from "@/components/affiliates/tickets/Tickets";
import { schema as profileSchema } from "@/components/affiliates/profiles/Profiles";

const meta = {
  component: FormAccount,
};

export default meta;

// @ts-ignore
const account: AffiliateAccountType = {};

export const Account = {
  render: () => (
    <FormAccount
      account={account}
      onSubmit={async (values: any) => {
        console.log(`muly`, { values });
      }}
    />
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=91-20396&t=iaMez9Khkj5AeV4D-4",
    },
  },
};

export const Contact = {
  render: () => (
    <FormContact
      account={account}
      onSubmit={async (values: any) => {
        console.log(`muly`, { values });
      }}
    />
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=91-21349&t=iaMez9Khkj5AeV4D-4",
    },
  },
};

export const Invoice = {
  render: () => (
    <FormInvoice
      account={account}
      onSubmit={async (values: any) => {
        console.log(`muly`, { values });
      }}
      countries={["Israel", "USA"]}
    />
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=160-21291&t=iaMez9Khkj5AeV4D-4",
    },
  },
};

export const WebSites = {
  render: () => (
    <FormWebSites
      account={account}
      onSubmit={async (values: any) => {
        console.log(`muly:v23`, { values });
      }}
    />
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=160-21064&t=iaMez9Khkj5AeV4D-4",
    },
  },
};

export const Signin = {
  render: () => <FormSignin />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=161-22164&t=iaMez9Khkj5AeV4D-4",
    },
  },
};

export const Signup = {
  ...FormTest,
  args: {
    schema: signupSchema,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=163-22872&t=iaMez9Khkj5AeV4D-4",
    },
  },
};

export const LostPassword = {
  ...FormTest,
  args: { schema: lostPasswordSchema },
};

export const PaymentDetails = {
  ...FormTest,
  args: { schema: paymentDetailsSchema },
};

export const PixelMonitor = {
  ...FormTest,
  args: { schema: pixelMonitorSchema },
};

export const Document = {
  ...FormTest,
  args: { schema: documentSchema },
};

export const Ticket = {
  ...FormTest,
  args: { schema: ticketSchema },
};

export const Profile = {
  ...FormTest,
  args: { schema: profileSchema },
};
