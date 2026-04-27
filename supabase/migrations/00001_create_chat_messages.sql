CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access for the demo (since it's a public homepage)
CREATE POLICY "Allow anyone to insert messages" ON chat_messages
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anyone to view messages" ON chat_messages
FOR SELECT TO anon USING (true);
