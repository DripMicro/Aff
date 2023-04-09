import { createTRPCRouter } from "../../trpc";
import {
  getAccount,
  recoverPassword,
  registerAccount,
  updateAccount,
} from "./account";
import { getPaymentDetails, getPaymentsPaid } from "./billing";
import { getMerchantCreative, getMerchantCreativeMeta } from "./creative";
import {
  getAllPerformanceChart,
  getConversionChart,
  getCountryReport,
  getDashboard,
  getPerformanceChart,
  getReportsHiddenCols,
  getTopMerchantCreative,
  upsertReportsField,
} from "./dashboard";
import { deleteProfile, getProfiles, upsertProfile } from "./profile";
import { getMerchantSubCreative, getMerchantSubCreativeMeta } from "./sub";
import { deleteTicket, getTickets, upsertTicket } from "./ticket";

import { getCommissions } from "./commission";
import { getDocuments } from "./document";
import {
  deletePixelMonitor,
  getPixelMonitor,
  getPixelMonitorMeta,
  upsertPixelMonitor,
} from "./pixel";
import { badQuerySample } from "@/server/api/routers/affiliates/bad-query-sample";
import { getQuickReportSummary } from "@/server/api/routers/affiliates/reports/quick-summary";
import { getInstallReport } from "@/server/api/routers/affiliates/reports/install-reports";
import {
  getAllMerchants,
  getLongCountries,
} from "@/server/api/routers/affiliates/reports";
import { getCommissionReport } from "@/server/api/routers/affiliates/reports/commission-report";
import { getClicksReport } from "@/server/api/routers/affiliates/reports/clicks-report";
import { getCreativeReport } from "@/server/api/routers/affiliates/reports/creative-report";
import { getLandingPageData } from "@/server/api/routers/affiliates/reports/landing-page";
import { getTraderReport } from "@/server/api/routers/affiliates/reports/trader-report";
import { getPixelLogReport } from "@/server/api/routers/affiliates/reports/pixel-log-report";
import { getProfileReportData } from "@/server/api/routers/affiliates/reports/profile-report";
import { getSubAffiliateReport } from "@/server/api/routers/affiliates/reports/sub-affiliate-report";

export const affiliatesRouter = createTRPCRouter({
  getDashboard,
  getTopMerchantCreative,
  getPerformanceChart,
  getAllPerformanceChart,
  getConversionChart,
  getCountryReport,
  getReportsHiddenCols,
  upsertReportsField,

  getMerchantCreativeMeta,
  getMerchantCreative,

  getMerchantSubCreativeMeta,
  getMerchantSubCreative,

  getProfiles,
  upsertProfile,
  deleteProfile,

  getAccount,
  updateAccount,
  registerAccount,
  recoverPassword,

  getPaymentsPaid,
  getPaymentDetails,

  getTickets,
  upsertTicket,
  deleteTicket,

  getQuickReportSummary,
  getInstallReport,
  getAllMerchants,

  getCommissionReport,
  getClicksReport,
  getDocuments,

  getCommissions,
  getCreativeReport,
  getLandingPageData,

  getTraderReport,
  getLongCountries,
  getPixelLogReport,

  getProfileReportData,
  getSubAffiliateReport,

  getPixelMonitorMeta,
  getPixelMonitor,
  upsertPixelMonitor,
  deletePixelMonitor,

  badQuerySample,
});
