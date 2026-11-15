CREATE TABLE IF NOT EXISTS club_live_content (
 id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK(kind IN ('event','pass')),
 data TEXT NOT NULL, starts INTEGER NOT NULL, ends INTEGER NOT NULL,
 updated INTEGER NOT NULL, version INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS club_live_dates ON club_live_content(kind,starts,ends);
CREATE TABLE IF NOT EXISTS club_bans (user_id TEXT PRIMARY KEY, reason TEXT NOT NULL, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS club_admin_audit (id TEXT PRIMARY KEY, actor TEXT NOT NULL, action TEXT NOT NULL, target TEXT NOT NULL, details TEXT NOT NULL, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS club_event_rooms (id TEXT PRIMARY KEY, event_id TEXT NOT NULL, state TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 0, updated INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS club_event_rooms_match ON club_event_rooms(event_id,updated);
