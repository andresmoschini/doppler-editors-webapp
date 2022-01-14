import { Design } from "react-email-editor";
import { Result } from "../common/result-types";

export interface CampaignDesign extends Design {
  idCampaign: string;
}

export interface HtmlEditorApiClient {
  getCampaignContent: (
    campaignId: string
  ) => Promise<Result<CampaignDesign, void>>;
}
