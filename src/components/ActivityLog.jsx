import { Activity, Zap } from 'lucide-react';

const ActivityLog = ({ activity }) => {
  return (
    <div className="mt-4 bg-gray-900 rounded-md p-4 flex-1 overflow-y-auto">
      <h3 className="text-lg font-semibold text-white flex items-center mb-2">
        <Activity className="mr-2 text-blue-400" size={18} />
        Analysis Activity
      </h3>
      <div className="space-y-2">
        {activity.map((message, i) => (
          <div key={i} className="text-sm flex items-start">
            <Zap size={14} className="text-yellow-400 mr-2 mt-1" />
            <span className="text-gray-300">{message}</span>
          </div>
        ))}
        {activity.length === 0 && (
          <p className="text-gray-500 text-sm italic">Click "Analyze Code" to begin...</p>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;