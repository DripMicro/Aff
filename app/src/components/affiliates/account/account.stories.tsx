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
};

export const Invoice = {
  render: () => (
    <FormInvoice
      account={account}
      onSubmit={async (values: any) => {
        console.log(`muly`, { values });
      }}
      countries={[]}
    />
  ),
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
};

export const Signin = {
  render: () => <FormSignin />,
};

export const Signup = {
  ...FormTest,
  args: {
    schema: signupSchema,
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
