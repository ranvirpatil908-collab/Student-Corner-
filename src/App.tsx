import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudyMaterialsTab } from './components/StudyMaterialsTab';
import { DiscussionForumTab } from './components/DiscussionForumTab';
import { EventCalendarTab } from './components/EventCalendarTab';
import { AiStudyAssistantTab } from './components/AiStudyAssistantTab';
import { StudyMaterial, DiscussionThread, CampusEvent, Comment } from './types';
import { INITIAL_MATERIALS, INITIAL_THREADS, INITIAL_EVENTS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'materials' | 'forum' | 'events' | 'ai'>('materials');

  // Load from localStorage or defaults
  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem('student_corner_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [threads, setThreads] = useState<DiscussionThread[]>(() => {
    const saved = localStorage.getItem('student_corner_threads');
    return saved ? JSON.parse(saved) : INITIAL_THREADS;
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem('student_corner_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [aiInitialPrompt, setAiInitialPrompt] = useState<{ title: string; text: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('student_corner_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('student_corner_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem('student_corner_events', JSON.stringify(events));
  }, [events]);

  // Handlers for Materials
  const handleAddMaterial = (newMat: StudyMaterial) => {
    setMaterials((prev) => [newMat, ...prev]);
  };

  const handleUpvoteMaterial = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, upvotes: m.upvotes + 1 } : m))
    );
  };

  const handleIncrementDownload = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, downloads: m.downloads + 1 } : m))
    );
  };

  const handleSelectForAi = (title: string, snippet: string) => {
    setAiInitialPrompt({ title, text: snippet });
    setActiveTab('ai');
  };

  // Handlers for Threads
  const handleAddThread = (newThread: DiscussionThread) => {
    setThreads((prev) => [newThread, ...prev]);
  };

  const handleUpvoteThread = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  const handleAddComment = (threadId: string, comment: Comment) => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              comments: [comment, ...t.comments],
              repliesCount: t.repliesCount + 1,
            }
          : t
      )
    );
  };

  const handleToggleSolved = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, solved: !t.solved } : t))
    );
  };

  // Handlers for Events
  const handleAddEvent = (newEv: CampusEvent) => {
    setEvents((prev) => [newEv, ...prev]);
  };

  const handleRsvpEvent = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, attendeesCount: e.attendeesCount + 1 } : e))
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'materials' && (
          <StudyMaterialsTab
            materials={materials}
            onAddMaterial={handleAddMaterial}
            onUpvoteMaterial={handleUpvoteMaterial}
            onIncrementDownload={handleIncrementDownload}
            onSelectForAi={handleSelectForAi}
          />
        )}

        {activeTab === 'forum' && (
          <DiscussionForumTab
            threads={threads}
            onAddThread={handleAddThread}
            onUpvoteThread={handleUpvoteThread}
            onAddComment={handleAddComment}
            onToggleSolved={handleToggleSolved}
          />
        )}

        {activeTab === 'events' && (
          <EventCalendarTab
            events={events}
            onAddEvent={handleAddEvent}
            onRsvpEvent={handleRsvpEvent}
          />
        )}

        {activeTab === 'ai' && (
          <AiStudyAssistantTab
            initialPrompt={aiInitialPrompt}
            onClearInitialPrompt={() => setAiInitialPrompt(null)}
          />
        )}
      </main>

      <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Student Corner Hub. Empowering collaborative peer learning.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-800 cursor-pointer" onClick={() => setActiveTab('materials')}>Study Materials</span>
            <span className="hover:text-stone-800 cursor-pointer" onClick={() => setActiveTab('forum')}>Discussion Forum</span>
            <span className="hover:text-stone-800 cursor-pointer" onClick={() => setActiveTab('events')}>Event Calendar</span>
            <span className="hover:text-stone-800 cursor-pointer" onClick={() => setActiveTab('ai')}>AI Study Assistant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
