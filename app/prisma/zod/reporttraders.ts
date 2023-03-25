import * as z from "zod"
import * as imports from "../zod-add-schema"
import { Completeaffiliates, RelatedaffiliatesModel, Completedata_reg, Relateddata_regModel } from "./index"

export const reporttradersModel = z.object({
  Date: z.date(),
  TraderID: z.string(),
  CampaignID: z.string(),
  TraderAlias: z.string(),
  Email: z.string(),
  RegistrationDate: z.string(),
  TraderStatus: z.string(),
  Country: z.string(),
  affiliate_id: z.number().int(),
  AffiliateUsername: z.string(),
  merchant_id: z.number().int(),
  MerchantName: z.string(),
  CreativeID: z.number().int().nullish(),
  CreativeName: z.string(),
  Type: z.string(),
  CreativeLanguage: z.string(),
  ProfileID: z.string(),
  ProfileName: z.string(),
  Param: z.string().nullish(),
  Param2: z.string().nullish(),
  Param3: z.string(),
  Param4: z.string(),
  Param5: z.string(),
  TransactionID: z.string(),
  FirstDeposit: z.string(),
  FTDAmount: z.string(),
  SelfDeposit: z.string(),
  TotalNextDeposits: z.string(),
  NextDeposits: z.string(),
  TotalMicroPayments: z.string(),
  MicroPaymentsAmount: z.string(),
  TotalDeposits: z.string(),
  DepositAmount: z.string(),
  Volume: z.string(),
  BonusAmount: z.string(),
  WithdrawalAmount: z.string(),
  ChargeBackAmount: z.string(),
  NetDeposit: z.string(),
  Trades: z.string(),
  QualificationDate: z.string(),
  PNL: z.string(),
  SaleStatus: z.string(),
  LastTimeActive: z.string(),
  Commission: z.string(),
  AdminNotes: z.string(),
  ClickDetails: z.string(),
})

export interface Completereporttraders extends z.infer<typeof reporttradersModel> {
  affiliate: Completeaffiliates
  data_reg: Completedata_reg[]
}

/**
 * RelatedreporttradersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedreporttradersModel: z.ZodSchema<Completereporttraders> = z.lazy(() => reporttradersModel.extend({
  affiliate: RelatedaffiliatesModel,
  data_reg: Relateddata_regModel.array(),
}))
