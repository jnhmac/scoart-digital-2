-- Scoart Digital Chatbot Database Schema
-- Run this in your Supabase SQL Editor

-- ============================================
-- INITIAL SCHEMA (run once for new setup)
-- ============================================

-- Chat conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL UNIQUE,
  started_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversation_session ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON chat_messages(created_at DESC);

-- Row Level Security Policies
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert and read their own conversations
CREATE POLICY "Allow public to insert conversations"
  ON chat_conversations FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "Allow public to read conversations"
  ON chat_conversations FOR SELECT
  TO anon USING (true);

-- Allow public to insert and read messages
CREATE POLICY "Allow public to insert messages"
  ON chat_messages FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "Allow public to read messages"
  ON chat_messages FOR SELECT
  TO anon USING (true);

-- ============================================
-- LEAD QUALIFICATION MIGRATION
-- Run this if tables already exist
-- ============================================

-- Add lead qualification columns to chat_conversations
ALTER TABLE chat_conversations
  ADD COLUMN IF NOT EXISTS visitor_name TEXT,
  ADD COLUMN IF NOT EXISTS visitor_email TEXT,
  ADD COLUMN IF NOT EXISTS visitor_need TEXT,
  ADD COLUMN IF NOT EXISTS visitor_timeline TEXT,
  ADD COLUMN IF NOT EXISTS urgency TEXT DEFAULT 'unknown',
  ADD COLUMN IF NOT EXISTS lead_status TEXT DEFAULT 'new' CHECK (lead_status IN ('new', 'in_progress', 'qualified', 'spam')),
  ADD COLUMN IF NOT EXISTS page_url TEXT,
  ADD COLUMN IF NOT EXISTS qualified_at TIMESTAMP;

-- Allow public to update conversations (for lead extraction)
CREATE POLICY "Allow public to update conversations"
  ON chat_conversations FOR UPDATE
  TO anon USING (true) WITH CHECK (true);

-- Indexes for lead queries
CREATE INDEX IF NOT EXISTS idx_conversation_lead_status ON chat_conversations(lead_status);
CREATE INDEX IF NOT EXISTS idx_conversation_email ON chat_conversations(visitor_email);
CREATE INDEX IF NOT EXISTS idx_conversation_qualified ON chat_conversations(qualified_at DESC);
