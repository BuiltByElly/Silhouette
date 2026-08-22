export type Heartbeat = {
  entity: string;
  type: string;
  time: number;
  category?: string;
  project?: string;
  project_root_count?: number;
  branch?: string;
  language?: string;
  is_write?: boolean;
  lines?: number;
  lineno?: number;
  cursorpos?: number;
  ai_line_changes?: number;
  human_line_changes?: number;
  user_agent?: string;
};
