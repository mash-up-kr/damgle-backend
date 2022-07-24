import { createAuthFromTerminal, GoogleSheet, S3 } from '@damgle/admin';
import { constant, staticEnv } from '@damgle/utils';

staticEnv.require(
  's3_public_bucket',
  'aws_region',
  'gcp_oauth_client_id',
  'gcp_oauth_refresh_token',
  'gcp_oauth_client_secret',
  'namepicker_sheet_id'
);

async function main() {
  const candidateData = await fetchCandidateData();
  candidateData.adjectives = candidateData.adjectives.filter(item => item != null);
  candidateData.nouns = candidateData.nouns.filter(item => item != null);

  await S3.public().uploadJson(constant.s3_namepicker_candidate_path, candidateData, { ACL: 'public-read' });
  console.log('done');
}

async function fetchCandidateData() {
  try {
    return await GoogleSheet.fetchCandidates(GoogleSheet.loadEnv());
  } catch (e: any) {
    if (e.message.includes('invalid_grant')) {
      await createAuthFromTerminal(GoogleSheet.loadEnv());
      process.exit(0);
    }
    throw e;
  }
}

main();
