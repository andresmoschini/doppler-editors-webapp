import { timeout } from "../../utils";
import {
  CampaignDesign,
  HtmlEditorApiClient,
} from "../../abstractions/html-editor-api-client";
import { Result } from "../../abstractions/common/result-types";
import sampleUnlayerDesign from "./sample-unlayer-design.json";

export class DummyHtmlEditorApiClient implements HtmlEditorApiClient {
  public getCampaignContent: (
    campaignId: string
  ) => Promise<Result<CampaignDesign>> = async (campaignId: string) => {
    console.log("Begin getCampaignContent...", {
      campaignId,
    });
    await timeout(1000);

    const value = JSON.parse(JSON.stringify(sampleUnlayerDesign)) as any;
    //const value = sampleUnlayerDesign;
    value.body.rows[0].columns[0].contents[0].values.text = `SOY CampaignDesign #${campaignId}`;
    value.idCampaign = campaignId;

    const result: Result<CampaignDesign> = {
      success: true,
      //value: { ...sampleUnlayerDesign, idCampaign: campaignId},
      value,
    };
    console.log("End getCampaignContent", { result });
    return result;
  };
}
