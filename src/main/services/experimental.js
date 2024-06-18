import { generateStats } from '@services/generateStats';
import { deleteStats } from '@database/stats';

export async function generateTestData() {
  await deleteStats();
  await generateStats();
}
