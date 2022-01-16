import { timeout } from "../../utils";
import {
  HtmlEditorApiClient,
} from "../../abstractions/html-editor-api-client";
import { ResultWithoutExpectedErrors } from "../../abstractions/common/result-types";
import sampleUnlayerDesign from "./sample-unlayer-design.json";
import { Design } from 'react-email-editor';

export class DummyHtmlEditorApiClient implements HtmlEditorApiClient {
  public getCampaignContent: (
    campaignId: string
  ) => Promise<ResultWithoutExpectedErrors<Design>> = async (campaignId: string) => {
    console.log("Begin getCampaignContent...", {
      campaignId,
    });
    await timeout(1000);

    const value = JSON.parse(JSON.stringify(sampleUnlayerDesign)) as any;
    //const value = sampleUnlayerDesign;
    value.body.rows[0].columns[0].contents[0].values.text = `SOY CampaignDesign #${campaignId} ${new Date().getMinutes()}`;
    value.idCampaign = campaignId;

    const result: ResultWithoutExpectedErrors<Design> = {
      success: true,
      //value: { ...sampleUnlayerDesign, idCampaign: campaignId},
      value,
    };
    console.log("End getCampaignContent", { result });
    return result;
  };
}
