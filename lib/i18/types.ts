export type Term = {
  term: string;
  translation: {
    content: string;
  };
};

export type ListTermsResponse = {
  response: {
    status: string;
    message: string;
  };
  result: {
    terms: Term[];
  };
};

export type Language = {
  name: string;
  code: string;
  translations: number;
  percentage: number;
  updated: string;
};

export type ListLanguagesResponse = {
  response: {
    status: string;
    message: string;
  };
  result: { languages: Language[] };
};
