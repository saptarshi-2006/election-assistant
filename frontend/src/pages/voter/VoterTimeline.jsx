import React from 'react';
import { Card } from '../../components/ui/Card';
import { CheckCircle2, Circle } from 'lucide-react';

const VoterTimeline = () => {
  const steps = [
    { title: "Registration", desc: "Ensure your name is on the electoral roll.", completed: true },
    { title: "Verification", desc: "Check your details for any errors.", completed: true },
    { title: "Voter Slip", desc: "Receive your voter slip from your BLO.", completed: false },
    { title: "Election Day", desc: "Visit the booth with your slip and ID.", completed: false },
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your Voter Journey</h1>
        <p className="text-slate-500 dark:text-slate-400">Follow these steps to be ready for election day.</p>
      </header>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-6">
            <div className="absolute -left-[17px] top-1 bg-white dark:bg-slate-900">
              {step.completed ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <Circle className="w-8 h-8 text-slate-300 dark:text-slate-600" />
              )}
            </div>
            <Card className={step.completed ? 'opacity-70' : 'border-blue-200 dark:border-blue-900/50'}>
              <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{step.desc}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoterTimeline;
