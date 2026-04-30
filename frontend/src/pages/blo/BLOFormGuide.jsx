import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Download } from 'lucide-react';

const BLOFormGuide = () => {
  const forms = [
    { id: 'Form 6', purpose: 'New voter registration', link: '#' },
    { id: 'Form 7', purpose: 'Objection/Deletion of name', link: '#' },
    { id: 'Form 8', purpose: 'Correction of entries', link: '#' },
    { id: 'Form 6B', purpose: 'Aadhaar linking', link: '#' },
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Forms Library</h1>
        <p className="text-slate-500 dark:text-slate-400">Quick access to essential election forms.</p>
      </header>

      <div className="space-y-4">
        {forms.map(form => (
          <Card key={form.id} className="flex flex-col space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white">{form.id}</h3>
                <p className="text-sm text-slate-500">{form.purpose}</p>
              </div>
            </div>
            <div className="flex space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                View Guide
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BLOFormGuide;
