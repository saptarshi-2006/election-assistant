import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { CheckSquare, Square } from 'lucide-react';

const BLOChecklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Verify AMF (Assured Minimum Facilities)', desc: 'Check drinking water, ramp, lighting at booth.', done: true },
    { id: 2, title: 'Distribute Voter Slips', desc: 'Cover houses in Ward 4 by end of week.', done: false },
    { id: 3, title: 'Update PwD List', desc: 'Identify and mark Persons with Disabilities.', done: false },
    { id: 4, title: 'Check EVM Connection Point', desc: 'Ensure power plug point is working.', done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    // Here we would call the backend: PATCH /blo/checklist/:id
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Task Checklist</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your booth responsibilities.</p>
      </header>

      <div className="space-y-3">
        {tasks.map(task => (
          <Card 
            key={task.id} 
            className={`flex items-start space-x-3 transition-colors ${task.done ? 'bg-slate-50 dark:bg-slate-800/50 opacity-75' : ''}`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="pt-1">
              {task.done ? (
                <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div>
              <p className={`font-medium ${task.done ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
                {task.title}
              </p>
              <p className="text-xs text-slate-500 mt-1">{task.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BLOChecklist;
