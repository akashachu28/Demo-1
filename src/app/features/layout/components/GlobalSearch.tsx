import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, Clock, Sparkles, X } from 'lucide-react';
const suggestedQueries = [
  "Licenses expiring in next 30 days",
  "Licenses expiring in Texas",
  "Non-compliant contractors in California",
  "High-risk contractors",
  "Compliance gaps in Nevada",
  "Contractors pending approval",
  "Expired licenses",
  "Contractors eligible for electrical work in Austin",
  "Insurance expiring soon",
];
export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Load recent searches from localStorage
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(recent);
  }, []);
  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = searchRef.current?.querySelector('input');
        if (input) {
          input.focus();
          setIsOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const parseQueryAndNavigate = (searchQuery: string) => {
    const query = searchQuery.toLowerCase();
    
    // Save to recent searches
    const updated = [searchQuery, ...recentSearches.filter(q => q !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    // Build URL parameters based on query
    const params = new URLSearchParams();
    params.set('q', searchQuery);
    // Detect locations/jurisdictions
    const locations = ['texas', 'california', 'nevada', 'florida', 'oregon', 'washington', 'colorado', 'utah', 'austin', 'dallas', 'houston', 'san francisco', 'los angeles', 'las vegas'];
    const foundLocation = locations.find(loc => query.includes(loc));
    if (foundLocation) {
      params.set('location', foundLocation);
    }
    // Detect status filters
    if (query.includes('expiring') || query.includes('expires')) {
      params.set('status', 'expiring');
    }
    if (query.includes('expired')) {
      params.set('status', 'expired');
    }
    if (query.includes('non-compliant') || query.includes('noncompliant')) {
      params.set('status', 'non-compliant');
    }
    if (query.includes('compliant') && !query.includes('non-compliant')) {
      params.set('status', 'compliant');
    }
    if (query.includes('pending')) {
      params.set('status', 'pending');
    }
    if (query.includes('high-risk') || query.includes('high risk')) {
      params.set('risk', 'high');
    }
    // Detect work types
    if (query.includes('electrical')) {
      params.set('workType', 'electrical');
    }
    if (query.includes('plumbing')) {
      params.set('workType', 'plumbing');
    }
    if (query.includes('hvac')) {
      params.set('workType', 'hvac');
    }
    if (query.includes('roofing')) {
      params.set('workType', 'roofing');
    }
    // Detect time periods
    if (query.includes('30 days') || query.includes('next month')) {
      params.set('period', '30');
    }
    if (query.includes('60 days')) {
      params.set('period', '60');
    }
    if (query.includes('90 days')) {
      params.set('period', '90');
    }
    // Determine which page to navigate to
    let targetPage = '/';
    
    if (query.includes('license') && !query.includes('contractor')) {
      targetPage = '/reports';
    } else if (query.includes('contractor') || query.includes('eligible')) {
      targetPage = '/contractors';
    } else if (query.includes('compliance') || query.includes('gap')) {
      targetPage = '/greenfield';
    } else if (query.includes('document')) {
      targetPage = '/documents';
    } else if (query.includes('task') || query.includes('action')) {
      targetPage = '/tasks';
    } else if (query.includes('approval')) {
      targetPage = '/contractors';
    } else if (query.includes('audit') || query.includes('trail')) {
      targetPage = '/audit';
    } else if (query.includes('renewal')) {
      targetPage = '/renewals';
    } else if (query.includes('jurisdiction')) {
      targetPage = '/jurisdictions';
    } else if (query.includes('credential')) {
      targetPage = '/credentials';
    } else if (query.includes('onboarding')) {
      targetPage = '/onboarding';
    } else if (query.includes('eligibility')) {
      targetPage = '/eligibility';
    } else if (query.includes('retainer')) {
      targetPage = '/retainer';
    } else {
      // Default: try to infer from other keywords
      if (query.includes('expiring') || query.includes('expired')) {
        targetPage = '/reports';
      } else if (query.includes('high-risk') || query.includes('pending')) {
        targetPage = '/tasks';
      }
    }
    // Navigate with query parameters
    navigate(`${targetPage}?${params.toString()}`);
    setIsOpen(false);
    setQuery('');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      parseQueryAndNavigate(query.trim());
    }
  };
  const handleSuggestedQuery = (suggestedQuery: string) => {
    setQuery(suggestedQuery);
    parseQueryAndNavigate(suggestedQuery);
  };
  const removeRecentSearch = (searchToRemove: string) => {
    const updated = recentSearches.filter(q => q !== searchToRemove);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };
  return (
    <div ref={searchRef} className="relative flex-1 max-w-2xl px-8">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Search or ask: expiring licenses, eligible contractors..."
            className="w-full pl-12 pr-20 py-2.5 border border-gray-300 rounded-lg bg-gray-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 font-mono pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </form>
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-xl z-50 max-h-[500px] overflow-auto">
          {/* Suggested Queries */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Suggested Queries</span>
            </div>
            <div className="space-y-1">
              {suggestedQueries
                .filter(sq => !query || sq.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 6)
                .map((suggestedQuery, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuery(suggestedQuery)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700 hover:text-gray-900"
                  >
                    {suggestedQuery}
                  </button>
                ))}
            </div>
          </div>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Recent Searches</span>
              </div>
              <div className="space-y-1">
                {recentSearches.map((recentQuery, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between group hover:bg-gray-50 rounded-lg transition-colors px-3 py-2"
                  >
                    <button
                      onClick={() => handleSuggestedQuery(recentQuery)}
                      className="flex-1 text-left text-sm text-gray-700 hover:text-gray-900"
                    >
                      {recentQuery}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(recentQuery);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                    >
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
 
 