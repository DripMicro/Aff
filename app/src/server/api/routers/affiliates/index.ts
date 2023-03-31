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
  getMerchants,
  getPixelMonitor,
  getPixelMonitorMeta,
  upsertPixelMonitor,
} from "./pixel";
import {
  getAllMerchants,
  getClicksReport,
  getCommissionReport,
  getCreativeReport,
  getInstallReport,
  getLandingPageData,
  getLongCountries,
  getpixelLogReport,
  getProfileReportData,
  getQuickReportSummary,
  getSubAffiliateReport,
  getTraderReport,
} from "./reports";
import { badQuerySample } from "@/server/api/routers/affiliates/bad-query-sample";

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
  getpixelLogReport,

  getProfileReportData,
  getSubAffiliateReport,

  getPixelMonitorMeta,
  getPixelMonitor,
  getMerchants,
  upsertPixelMonitor,
  deletePixelMonitor,

  badQuerySample,
});
