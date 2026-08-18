import React, { useState } from 'react';
import { Search, Upload, Download, ThumbsUp, Sparkles, BookOpen, FileText, Filter, CheckCircle2 } from 'lucide-react';
import { StudyMaterial, SubjectCategory, MaterialType } from '../types';
import { UploadMaterialModal } from './UploadMaterialModal';

interface StudyMaterialsTabProps {
  materials: StudyMaterial[];
  onAddMaterial: (material: StudyMaterial) => void;
  onUpvoteMaterial: (id: string) => void;
  onIncrementDownload: (id: string) => void;
  onSelectForAi: (materialTitle: string, snippet: string) => void;
}

export const StudyMaterialsTab: React.FC<StudyMaterialsTabProps> = ({
  materials,
  onAddMaterial,
  onUpvoteMaterial,
  onIncrementDownload,
  onSelectForAi,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'downloads'>('popular');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const subjects = ['All', 'Computer Science', 'Mathematics', 'Physics', 'Literature', 'Economics', 'Engineering', 'General'];
  const types = ['All', 'Lecture Notes', 'Textbook', 'Lab Manual', 'Previous Papers', 'Cheat Sheet'];

  const filteredMaterials = materials
    .filter((mat) => {
      const matchesSearch =
        mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mat.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSubject = selectedSubject === 'All' || mat.subject === selectedSubject;
      const matchesType = selectedType === 'All' || mat.type === selectedType;
      return matchesSearch && matchesSubject && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.upvotes - a.upvotes;
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    onIncrementDownload(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/20 mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Peer Resource Library
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Share & Discover Study Materials
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base mb-6">
            Access verified lecture notes, cheat sheets, past exam papers, and textbooks uploaded by fellow students and professors.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-900 font-semibold text-sm hover:bg-indigo-50 shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Upload className="w-4 h-4 text-indigo-600" /> Upload Study Material
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by keyword, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sort options */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-medium text-stone-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="popular">Most Upvoted</option>
              <option value="downloads">Most Downloaded</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 shrink-0">Subject:</span>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedSubject === sub
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Material Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-stone-100 pt-3">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 shrink-0">Type:</span>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedType === t
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-stone-200">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800">No study materials found</h3>
            <p className="text-sm text-stone-500 mt-1">Try adjusting your search terms or filters, or be the first to upload!</p>
          </div>
        ) : (
          filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                    {mat.subject}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-stone-100 text-stone-600">
                    {mat.type}
                  </span>
                </div>

                <h3 className="font-bold text-stone-900 text-base mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {mat.title}
                </h3>
                <p className="text-stone-600 text-xs line-clamp-3 mb-4 leading-relaxed">
                  {mat.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {mat.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-50 text-stone-500 border border-stone-200/60">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100 mb-3">
                  <span className="font-medium text-stone-700">{mat.author}</span>
                  <span>{mat.fileSize} • {mat.uploadDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(mat.id)}
                    disabled={downloadingId === mat.id}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                      downloadingId === mat.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                    }`}
                  >
                    {downloadingId === mat.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 animate-spin" /> Downloaded!
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" /> Download ({mat.downloads})
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onUpvoteMaterial(mat.id)}
                    title="Upvote Material"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{mat.upvotes}</span>
                  </button>

                  <button
                    onClick={() => onSelectForAi(mat.title, mat.description + ' ' + (mat.contentSnippet || ''))}
                    title="Summarize or Quiz with AI"
                    className="p-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <UploadMaterialModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddMaterial={onAddMaterial}
      />
    </div>
  );
};
