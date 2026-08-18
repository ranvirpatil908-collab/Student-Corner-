import React, { useState } from 'react';
import { Search, Plus, MessageSquare, ThumbsUp, CheckCircle2, HelpCircle } from 'lucide-react';
import { DiscussionThread, Comment } from '../types';
import { CreateThreadModal } from './CreateThreadModal';
import { ThreadDetailModal } from './ThreadDetailModal';

interface DiscussionForumTabProps {
  threads: DiscussionThread[];
  onAddThread: (thread: DiscussionThread) => void;
  onUpvoteThread: (id: string) => void;
  onAddComment: (threadId: string, comment: Comment) => void;
  onToggleSolved: (threadId: string) => void;
}

export const DiscussionForumTab: React.FC<DiscussionForumTabProps> = ({
  threads,
  onAddThread,
  onUpvoteThread,
  onAddComment,
  onToggleSolved,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeThread, setActiveThread] = useState<DiscussionThread | null>(null);

  const categories = ['All', 'Computer Science', 'Mathematics', 'Physics', 'Literature', 'Economics', 'Engineering', 'Exam Help', 'Career Advice', 'Project Collab', 'General Q&A'];

  const filteredThreads = threads.filter((thread) => {
    const matchesSearch =
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || thread.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> Peer Discussion Board
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Ask Questions & Collaborate
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mb-6">
            Connect with campus peers, get homework help, find hackathon teammates, and share career tips.
          </p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Start Discussion Thread
          </button>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search discussions or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Showing <span className="font-bold text-stone-800">{filteredThreads.length}</span> active discussions
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200">
            <HelpCircle className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800">No discussions found</h3>
            <p className="text-sm text-stone-500 mt-1">Be the first to ask a question in this category!</p>
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setActiveThread(thread)}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={thread.avatar}
                  alt={thread.author}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0 mt-1"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                      {thread.category}
                    </span>
                    {thread.solved && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                    <span className="text-xs text-stone-400">• {thread.createdAt} by {thread.author}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base group-hover:text-indigo-600 transition-colors">
                    {thread.title}
                  </h3>

                  <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                    {thread.content}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {thread.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-50 text-stone-500 border border-stone-200/60">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats column */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100 gap-2 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 text-stone-700 text-xs font-semibold">
                  <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{thread.upvotes} upvotes</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50/60 text-indigo-700 text-xs font-semibold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{thread.comments.length} replies</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateThreadModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddThread={onAddThread}
      />

      <ThreadDetailModal
        thread={activeThread}
        onClose={() => setActiveThread(null)}
        onUpvoteThread={onUpvoteThread}
        onAddComment={onAddComment}
        onToggleSolved={onToggleSolved}
      />
    </div>
  );
};
