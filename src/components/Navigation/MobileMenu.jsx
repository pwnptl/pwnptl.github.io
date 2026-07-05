import portfolio from '../../data/portfolio.json';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          id="navbar-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <nav
        id="mobile-navbar"
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white z-50 transition-transform duration-300 lg:hidden overflow-y-auto flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="p-4 border-b border-slate-700">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition text-lg"
            aria-label="Close navbar"
          >
            ◀
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-6 flex flex-col items-center border-b border-slate-700">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-slate-700 flex items-center justify-center">
            <img
              src={portfolio.profile.image}
              alt={portfolio.profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
              }}
            />
          </div>
          <h1 className="text-xl font-bold text-center">{portfolio.profile.name}</h1>
          <p className="text-sm text-slate-400 text-center mt-2">{portfolio.profile.title}</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-6 space-y-4">
          <a href="#intro" onClick={onClose} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
            <span className="text-lg">🏠</span>
            <span>Intro</span>
          </a>
          <a href="#skills" onClick={onClose} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
            <span className="text-lg">⚡</span>
            <span>Skills</span>
          </a>
          <a href="#resume" onClick={onClose} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
            <span className="text-lg">📄</span>
            <span>Resume</span>
          </a>
        </nav>

        {/* Social Links */}
        <div className="p-6 border-t border-slate-700 flex justify-center gap-4">
          {portfolio.profile.social.github && (
            <a href={portfolio.profile.social.github} target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center text-lg">
              🐙
            </a>
          )}
          {portfolio.profile.social.linkedin && (
            <a href={portfolio.profile.social.linkedin} target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center text-lg">
              💼
            </a>
          )}
          {portfolio.profile.social.twitter && (
            <a href={portfolio.profile.social.twitter} target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center text-lg">
              𝕏
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
