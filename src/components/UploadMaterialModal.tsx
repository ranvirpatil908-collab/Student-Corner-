import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle } from 'lucide-react';
import { StudyMaterial, SubjectCategory, MaterialType } from '../types';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterial: (material: StudyMaterial) => void;
}

export const UploadMaterialModal: React.FC<UploadMaterialModalProps> = ({
  isOpen,
  onClose,
  onAddMaterial,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<SubjectCategory>('Computer Science');
  const [type, setType] = useState<MaterialType>('Lecture Notes');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [fileName, setFileName] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newMaterial: StudyMaterial = {
      id: `mat-${Date.now()}`,
      title,
      subject,
      type,
      author: 'Alex Student',
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0,
      upvotes: 1,
      description,
      fileSize: fileName ? '2.4 MB' : '1.5 MB',
      tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [subject],
      contentSnippet: description.substring(0, 150) + '...'
    };

    onAddMaterial(newMaterial);
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      setTitle('');
      setDescription('');
      setTags('');
      setFileName('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-stone-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-stone-900 text-lg">Share Study Material</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMessage ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
            <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h4 className="text-xl font-bold text-stone-900">Material Uploaded Successfully!</h4>
            <p className="text-sm text-stone-500">Thank you for contributing to the student community.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Document Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Advanced Algorithms Midterm Review Notes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Subject Category
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as SubjectCategory)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Literature">Literature</option>
                  <option value="Economics">Economics</option>
                  <option value="Engineering">Engineering</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Material Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as MaterialType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Lecture Notes">Lecture Notes</option>
                  <option value="Textbook">Textbook</option>
                  <option value="Lab Manual">Lab Manual</option>
                  <option value="Previous Papers">Previous Papers</option>
                  <option value="Cheat Sheet">Cheat Sheet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Description & Summary
              </label>
              <textarea
                required
                rows={3}
                placeholder="Briefly describe what topics this document covers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g., DSA, Trees, Python, Midterm"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Upload File (PDF / Doc)
              </label>
              <div className="border-2 border-dashed border-stone-200 rounded-xl p-4 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-stone-50">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <FileText className="w-8 h-8 text-indigo-500 mb-1" />
                  <span className="text-sm font-medium text-stone-700">
                    {fileName ? fileName : 'Click to browse or drag file here'}
                  </span>
                  <span className="text-xs text-stone-400 mt-0.5">PDF, DOCX up to 25MB</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all"
              >
                Publish Material
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
