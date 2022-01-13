import { Design } from "react-email-editor";
import { ResultWithoutExpectedErrors } from "../common/result-types";

export interface CampaignDesign extends Design {
  idCampaign: string;
}

export interface HtmlEditorApiClient {
  getCampaignContent: (
    campaignId: string
  ) => Promise<ResultWithoutExpectedErrors<CampaignDesign>>;
}
