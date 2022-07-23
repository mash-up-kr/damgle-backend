import { execSync } from 'child_process';

declare global {
  const SOURCE_VERSION: string;
}

export function getSourceVersion() {
  try {
    return SOURCE_VERSION; // Webpack DefinePlugin will fill it
  } catch {
    return 'local';
  }
}

export function captureSourceVersion() {
  try {
    // using in webpack
    const version = execSync('git rev-parse HEAD').toString().trim();
    return `'${version.slice(0, 7)}'`;
  } catch {
    return `'unknown'`;
  }
}
