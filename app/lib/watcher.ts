#!/usr/bin/env ts-node

import { exec } from 'child_process';
import chokidar from 'chokidar';
import path from 'path';

// Define the directory to watch
export const dataDir = path.join(process.cwd(), 'data');

// Define the command to trigger
const command = 'npm run cheerio-tree:generate';

// Watch for changes in the directory
export const watcher = chokidar.watch(dataDir, {
  persistent: true,
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../, // Ignore dot files
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

// Function to run the command
export const runCommand = () => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Command execution failed: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

export const startWatcher = () => {
  watcher
    .on('change', (path) => {
      console.log(`File ${path} has been added`);
      runCommand();
    })
    .on('unlink', (path) => {
      console.log(`File ${path} has been removed`);
      runCommand();
    });

  console.log(`Watching for changes in ${dataDir}`);
}

