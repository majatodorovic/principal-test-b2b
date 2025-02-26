import 'server-only';

export type Locale = 'en' | 'sr';
type JSONPath = `/${string}.json`;

export const getDictionary = async (
  locale: Locale = 'sr',
  path: JSONPath = '/data.json',
): Promise<any> =>
  import(`./${locale}${path}`).then((module) => module.default);
