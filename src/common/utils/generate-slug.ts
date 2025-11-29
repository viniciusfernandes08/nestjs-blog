import { generateRandomSuffix } from './generate-random-suffix';
import { slugify } from './slugify';

export function generateSlug(text: string) {
  const slug = slugify(text);
  return `${slug}-${generateRandomSuffix()}`;
}
