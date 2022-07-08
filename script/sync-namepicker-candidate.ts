import { GoogleSheet, S3 } from '@damgle/admin';
import { S3_NAMEPICKER_CANDIDATE_PATH } from '@damgle/utils';

async function main() {
  const candidateData = await GoogleSheet.fetchCandidates(GoogleSheet.loadEnv());
  const s3 = S3.public();

  await s3.uploadJson(S3_NAMEPICKER_CANDIDATE_PATH, candidateData, { ACL: 'public-read' });
  console.log('done');
}

main();
