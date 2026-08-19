import { mkdir } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"

/*
  Generating path constants for silhouette home dir.
  All Silhoutte states live inside the ~/.silhouette folder
  All internal module import this path constants to get access to the state files

*/

//Root directory in home
export const SILHOUETTE_DIR = join(homedir(), ".silhouette")

export const MIGRATIONS_DIR = join(import.meta.dir,"../asset/drizzle")

// bin dir that will house the binaries of `packages/stethoscope` as a `silhouette` command
export const BIN_DIR = join(SILHOUETTE_DIR, 'bin')

export const LOG_PATH = join(SILHOUETTE_DIR, 'silhouette.log')

export const CONFIG_PATH = join(SILHOUETTE_DIR, 'silhouette.ini')

export const DB_PATH = join(SILHOUETTE_DIR, 'silhouette.db')

export const PID_PATH = join(SILHOUETTE_DIR,'silhouette.pid')

//function to create the home directory
export async function createSilhouetteHomeDir() {
  await mkdir(BIN_DIR, { recursive: true })
}
