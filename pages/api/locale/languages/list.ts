import axios from "axios";
import { NextApiHandler } from "next";
import getConfig from "next/config";
import { ListLanguagesResponse } from "@/lib/i18/types";

const handler: NextApiHandler<string[] | { error: string }> = async (
  req,
  res
) => {
  const api_token = getConfig().serverRuntimeConfig.POEDITOR_API_TOKEN;
  const id = getConfig().serverRuntimeConfig.POEDITOR_PROJECT_ID;
  const url = `${getConfig().serverRuntimeConfig.POEDITOR_API}/languages/list`;

  try {
    const response = await axios.post(
      url,
      {
        api_token,
        id,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data: ListLanguagesResponse = response.data;

    const languages = data.result.languages.map((lang) => lang.code);

    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get languages" });
  }
};

export default handler;
