ALTER TABLE club_users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS club_auth_codes (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL,
  purpose TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  expires INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  created INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS club_auth_codes_user_idx ON club_auth_codes(user_id, purpose);
