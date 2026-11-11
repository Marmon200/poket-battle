CREATE TABLE IF NOT EXISTS club_users (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL UNIQUE,
  hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  state TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 0,
  created INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS club_sessions (
  token TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL,
  expires INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS club_rooms (
  id TEXT PRIMARY KEY NOT NULL,
  host TEXT NOT NULL,
  guest TEXT,
  state TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 0,
  updated INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS club_trades (
  id TEXT PRIMARY KEY NOT NULL,
  owner TEXT NOT NULL,
  partner TEXT,
  offered TEXT NOT NULL,
  requested TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  updated INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS club_limits (
  id TEXT PRIMARY KEY NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  until INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS club_friends (
  id TEXT PRIMARY KEY NOT NULL,
  sender TEXT NOT NULL,
  receiver TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created INTEGER NOT NULL,
  updated INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS club_sessions_user_idx ON club_sessions(user_id);
CREATE INDEX IF NOT EXISTS club_rooms_host_idx ON club_rooms(host);
CREATE INDEX IF NOT EXISTS club_rooms_guest_idx ON club_rooms(guest);
CREATE INDEX IF NOT EXISTS club_trades_owner_idx ON club_trades(owner);
CREATE INDEX IF NOT EXISTS club_trades_partner_idx ON club_trades(partner);
