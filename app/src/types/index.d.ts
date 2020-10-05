type LinksType = {
  registration: string
}

export interface Language {
  links: LinksType
}

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

interface SendMessageAction {
  type: typeof CHANGE_LANGUAGE
  payload: Language
}