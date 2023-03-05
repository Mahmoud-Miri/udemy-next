import { datadogLogs } from "@datadog/browser-logs";
import getConfig from "next/config";

const initDatadog = () => {
  datadogLogs.init({
    clientToken: getConfig().publicRuntimeConfig.DD_CLIENT_TOKEN,
    site: "datadoghq.eu",
    forwardErrorsToLogs: true,
  });
};

export default initDatadog;
