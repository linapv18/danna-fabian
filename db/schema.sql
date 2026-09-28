CREATE TABLE IF NOT EXISTS rsvp_responses (
  id uuid PRIMARY KEY,
  full_name varchar(120) NOT NULL,
  email varchar(254) NOT NULL,
  attending boolean NOT NULL,
  companions jsonb NOT NULL DEFAULT '[]'::jsonb,
  party_size integer NOT NULL CHECK (party_size BETWEEN 0 AND 10),
  dietary_requirements varchar(1000) NOT NULL DEFAULT '',
  message varchar(2000) NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (jsonb_typeof(companions) = 'array'),
  CHECK ((attending AND party_size = 1 + jsonb_array_length(companions)) OR
         (NOT attending AND party_size = 0 AND jsonb_array_length(companions) = 0))
);
CREATE INDEX IF NOT EXISTS rsvp_responses_email_idx ON rsvp_responses (email);
CREATE INDEX IF NOT EXISTS rsvp_responses_created_at_idx ON rsvp_responses (created_at);
