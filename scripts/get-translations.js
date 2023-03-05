const fs = require("fs");
const path = require("path");
const axios = require("axios");

const PROJECT_ID = "601199";
const EXPORT_DIR = path.join(
  __dirname,
  "..",
  "public",
  "locale",
  "translations"
);

const languageCodes = ["en", "fa"];
const getTranslations = async () => {
  const API_KEY = process.env.POEDITOR_API_TOKEN;
  for (const languageCode of languageCodes) {
    try {
      const response = await axios.post(
        `https://api.poeditor.com/v2/terms/list`,
        {
          api_token: API_KEY,
          id: PROJECT_ID,
          language: languageCode,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data && response.data.result && response.data.result.terms) {
        const terms = response.data.result.terms;

        const translations = {};

        terms.forEach((term) => {
          translations[term.term] = term.translation.content;
        });

        const fileName = `${languageCode}-translations.json`;
        const filePath = path.join(EXPORT_DIR, fileName);
        fs.writeFileSync(filePath, JSON.stringify(translations));
        console.log(
          `Translations exported to ${filePath} for language code: ${languageCode}`
        );
      } else {
        console.log(`No data found for language code: ${languageCode}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

getTranslations();

//to combine all translations into a single file use this version
//not recommended though
// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");
//
// const PROJECT_ID = "601199";
// const EXPORT_DIR = path.join(
//     __dirname,
//     "..",
//     "public",
//     "locale",
//     "translations"
// );
//
// const languageCodes = ["en", "fa"];
// const getTranslations = async () => {
//   const API_KEY = process.env.POEDITOR_API_TOKEN;
//   const translations = {};
//   for (const languageCode of languageCodes) {
//     try {
//       const response = await axios.post(
//           `https://api.poeditor.com/v2/terms/list`,
//           {
//             api_token: API_KEY,
//             id: PROJECT_ID,
//             language: languageCode,
//           },
//           {
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//           }
//       );
//
//       if (response.data && response.data.result && response.data.result.terms) {
//         const terms = response.data.result.terms;
//         translations[languageCode] = { translation: {} };
//
//         terms.forEach((term) => {
//           translations[languageCode].translation[term.term] =
//               term.translation.content;
//         });
//
//         console.log(`Translations exported for language code: ${languageCode}`);
//       } else {
//         console.log(`No data found for language code: ${languageCode}`);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const fileName = `translations.json`;
//   const filePath = path.join(EXPORT_DIR, fileName);
//   fs.writeFileSync(filePath, JSON.stringify(translations));
//   console.log(`Translations exported to ${filePath}`);
// };
//
// getTranslations();
