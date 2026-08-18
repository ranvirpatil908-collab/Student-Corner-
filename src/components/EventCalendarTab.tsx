import React, { useState } from 'react';
import { Calendar, Plus, MapPin, Clock, Users, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { CampusEvent, EventType } from '../types';
import { CreateEventModal } from './CreateEventModal';

interface EventCalendarTabProps {
  events: CampusEvent[];
  onAddEvent: (event: CampusEvent) => void;
  onRsvpEvent: (id: string) => void;
}

export const EventCalendarTab: React.FC<EventCalendarTabProps> = ({
  events,
  onAddEvent,
  onRsvpEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [rsvpedIds, setRsvpedIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Tech', 'Academic', 'Cultural', 'Sports', 'Exams', 'Workshop'];

  const filteredEvents = events.filter((ev) => {
    return selectedCategory === 'All' || ev.category === selectedCategory;
  });

  const handleRsvp = (id: string) => {
    setRsvpedIds((prev) => ({ ...prev, [id]: !prev[id] }));
    onRsvpEvent(id);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/20 mb-3">
            <Calendar className="w-3.5 h-3.5" /> Campus Life & Schedule
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Campus Events & Exam Calendar
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base mb-6">
            Stay up to date with hackathons, midterm prep workshops, cultural fests, and guest speaker lectures.
          </p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-950 font-semibold text-sm hover:bg-emerald-50 shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 text-emerald-700" /> Add Campus Event
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Showing <span className="font-bold text-stone-800">{filteredEvents.length}</span> upcoming events
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-stone-200">
            <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800">No events found</h3>
            <p className="text-sm text-stone-500 mt-1">Check back later or add a new campus event!</p>
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const isRsvped = rsvpedIds[ev.id];
            return (
              <div
                key={ev.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {ev.image && (
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-stone-900 shadow-sm">
                        {ev.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ev.date}</span>
                      <span className="text-stone-300">•</span>
                      <span>{ev.organizer}</span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {ev.title}
                    </h3>

                    <p className="text-stone-600 text-xs line-clamp-3 leading-relaxed mb-4">
                      {ev.description}
                    </p>

                    <div className="space-y-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <Users className="w-4 h-4 text-stone-400" />
                      <span>{ev.attendeesCount + (isRsvped ? 1 : 0)} attending</span>
                    </div>

                    <button
                      onClick={() => handleRsvp(ev.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                        isRsvped
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                    >
                      {isRsvped ? (
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> RSVP’d
                        </span>
                      ) : (
                        'RSVP Now'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <CreateEventModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddEvent={onAddEvent}
      />
    </div>
  );
};
