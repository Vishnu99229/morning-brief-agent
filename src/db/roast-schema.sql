CREATE TABLE IF NOT EXISTS roast_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_text TEXT NOT NULL,
  roast_script TEXT,
  call_id TEXT,
  ip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_roast_phone_recent ON roast_submissions (phone, created_at DESC);
CREATE INDEX idx_roast_ip_recent ON roast_submissions (ip, created_at DESC);
