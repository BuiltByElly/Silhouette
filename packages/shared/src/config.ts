/*
  Handles the creating, reading and updating of silhouette config (silhouette.cfg)
*/

import { CONFIG_PATH } from "./path";
import type { SilhouetteConfig } from "./types/config.types";
import * as ini from 'ini';

const DEFAULT_CONFIG: SilhouetteConfig = {
  settings: {
    port: 4110,
    theme:"dark-lime"
  }
}
export async function readConfig() {
  const file = Bun.file(CONFIG_PATH)

  if (!(await file.exists())) {
    Bun.write(CONFIG_PATH, ini.stringify(DEFAULT_CONFIG))
    return DEFAULT_CONFIG
  }

  let rawConfig = await file.text()
  return ini.parse(rawConfig) as SilhouetteConfig

}
