import { GoogleSheet, S3 } from '@damgle/admin';
import { constant } from '@damgle/utils';

async function main() {
  const candidateData = await GoogleSheet.fetchCandidates(GoogleSheet.loadEnv());
  const s3 = S3.public();

  await s3.uploadJson(constant.s3_namepicker_candidate_path, candidateData, { ACL: 'public-read' });
  console.log('done');
}

main();
