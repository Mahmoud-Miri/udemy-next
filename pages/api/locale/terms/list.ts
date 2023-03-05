import axios from "axios";
import { NextApiHandler } from "next";
import fs from "fs";
import { ListTermsResponse } from "@/lib/i18/types";
import getConfig from "next/config";
import { datadogLogs } from "@datadog/browser-logs";

const handler: NextApiHandler = async (req, res) => {
  const { languages } = req.body;

  const api_token = getConfig().serverRuntimeConfig.POEDITOR_API_TOKEN;
  const id = getConfig().serverRuntimeConfig.POEDITOR_PROJECT_ID;
  const url = `${getConfig().serverRuntimeConfig.POEDITOR_API}/terms/list`;

  try {
    for (const language of languages) {
      const response = await axios.post(
        url,
        {
          api_token,
          id,
          language,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const data: ListTermsResponse = response.data;

      const translations: { [key: string]: string } = {};

      data.result.terms.forEach((term) => {
        translations[term.term] = term.translation.content;
      });

      fs.writeFileSync(
        `./translations/${language}.json`,
        JSON.stringify(translations)
      );
    }

    res.status(200).json({ message: "Terms translations saved" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Couldn't get latest terms to update translation files" });
  }
};

export default handler;
