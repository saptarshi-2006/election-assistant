import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNews } from '../../hooks/useNews';
import { ExternalLink } from 'lucide-react';
import heroImage from '../../assets/hero.png';
const VoterHome = () => {
  const { news, loading, error } = useNews();

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg mb-6 group">
        <img 
          src={heroImage} 
          alt="Election Hero" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">Welcome, Voter!</h1>
          <p className="text-blue-100 text-sm">Empowering your vote with Nirvachan Sahayika</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
        <h2 className="text-lg font-semibold mb-2">Next Election Day</h2>
        <div className="flex items-center space-x-2 text-2xl font-bold mb-4">
          <Calendar className="w-6 h-6" />
          <span>May 25, 2026</span>
        </div>
        <p className="text-blue-100 text-sm">Phase 6 - Your constituency is polling on this day.</p>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/voter/check">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:border-blue-500 transition-colors">
            <MapPin className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="font-medium text-slate-800 dark:text-slate-100">Find Booth</h3>
            <p className="text-xs text-slate-500 mt-1">Locate your polling station</p>
          </Card>
        </Link>
        <Link to="/voter/timeline">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:border-indigo-500 transition-colors">
            <FileText className="w-8 h-8 text-indigo-500 mb-2" />
            <h3 className="font-medium text-slate-800 dark:text-slate-100">How to Vote</h3>
            <p className="text-xs text-slate-500 mt-1">Step-by-step guide</p>
          </Card>
        </Link>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Latest Election News</h3>
        <div className="space-y-3">
          {loading ? (
            // Loading skeletons
            [...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              </Card>
            ))
          ) : error ? (
            <Card className="text-center p-4 text-red-500">
              <p className="text-sm">Could not load latest news.</p>
            </Card>
          ) : news.length > 0 ? (
            news.map((article, index) => (
              <a 
                key={index} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                <Card className="flex flex-col space-y-2 relative overflow-hidden group hover:border-blue-500">
                   {article.image_url && (
                     <div className="w-full h-32 bg-slate-200 rounded-md overflow-hidden mb-2">
                       <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                     </div>
                   )}
                   <div className="flex items-start justify-between">
                     <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 pr-4 line-clamp-2">
                       {article.title}
                     </h4>
                     <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-blue-500" />
                   </div>
                   <p className="text-xs text-slate-500 line-clamp-2">
                     {article.description}
                   </p>
                   <div className="flex items-center space-x-2 mt-2">
                     <Badge variant="info">{article.source_id}</Badge>
                     <span className="text-[10px] text-slate-400">
                       {new Date(article.pubDate).toLocaleDateString()}
                     </span>
                   </div>
                </Card>
              </a>
            ))
          ) : (
            <Card className="text-center p-4 text-slate-500">
              <p className="text-sm">No recent updates found.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoterHome;
