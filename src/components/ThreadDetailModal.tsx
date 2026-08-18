import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';
import { DiscussionThread, Comment } from '../types';

interface ThreadDetailModalProps {
  thread: DiscussionThread | null;
  onClose: () => void;
  onUpvoteThread: (id: string) => void;
  onAddComment: (threadId: string, comment: Comment) => void;
  onToggleSolved: (threadId: string) => void;
}

export const ThreadDetailModal: React.FC<ThreadDetailModalProps> = ({
  thread,
  onClose,
  onUpvoteThread,
  onAddComment,
  onToggleSolved,
}) => {
  const [commentText, setCommentText] = useState('');

  if (!thread) return null;

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: 'Alex Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      content: commentText,
      createdAt: 'Just now',
      upvotes: 0,
    };

    onAddComment(thread.id, newComment);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-stone-100 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700">
              {thread.category}
            </span>
            {thread.solved && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solved
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Question Post */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3">
              {thread.title}
            </h2>

            <div className="flex items-center justify-between text-xs text-stone-500 pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2.5">
                <img
                  src={thread.avatar}
                  alt={thread.author}
                  className="w-8 h-8 rounded-full object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-semibold text-stone-800">{thread.author}</span>
                  <span className="block text-[10px] text-stone-400">{thread.createdAt}</span>
                </div>
              </div>

              <button
                onClick={() => onToggleSolved(thread.id)}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
              >
                {thread.solved ? 'Mark Unsolved' : 'Mark Solved'}
              </button>
            </div>

            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-wrap mb-4">
              {thread.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {thread.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-600">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Upvote button for thread */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpvoteThread(thread.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Upvote ({thread.upvotes})</span>
              </button>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <MessageSquare className="w-4 h-4 text-stone-400" />
                <span>{thread.comments.length} Replies</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h4 className="font-bold text-stone-900 text-base">Responses ({thread.comments.length})</h4>

            {thread.comments.length === 0 ? (
              <p className="text-sm text-stone-500 py-4 text-center bg-stone-50 rounded-xl">
                No replies yet. Be the first to share your thoughts or answer!
              </p>
            ) : (
              <div className="space-y-3">
                {thread.comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-6 h-6 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-semibold text-stone-800">{comment.author}</span>
                      </div>
                      <span className="text-[10px] text-stone-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-stone-700 pl-8">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reply Input Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 shrink-0">
          <form onSubmit={handleReplySubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a helpful reply..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" /> Reply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
