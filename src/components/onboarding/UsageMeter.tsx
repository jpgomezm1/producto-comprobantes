import React from 'react';
import { Progress } from '@/components/ui/progress';
import { BarChart3 } from 'lucide-react';

interface UsageMeterProps {
  currentUsage: number;
  validCount: number;
  invalidCount: number;
  limit: number;
  isUnlimited?: boolean;
  planName: string;
}

export const UsageMeter = ({ 
  currentUsage, 
  validCount,
  invalidCount,
  limit, 
  isUnlimited = false, 
  planName 
}: UsageMeterProps) => {
  const usagePercentage = isUnlimited ? 0 : Math.min((currentUsage / limit) * 100, 100);
  
  return (
    <div className="p-4 bg-gradient-to-r from-purple-700/30 to-purple-600/30 rounded-xl border border-purple-600/20">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-4 w-4 text-purple-300" />
        <span className="text-sm font-medium text-purple-100">Uso mensual</span>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs text-purple-200">
          {isUnlimited ? (
            `${currentUsage} comprobantes (Ilimitado)`
          ) : (
            `${currentUsage} / ${limit} comprobantes`
          )}
        </div>
        
        {currentUsage > 0 && (
          <div className="text-xs text-purple-300 space-y-1">
            <div>✓ {validCount} válidos</div>
            <div>✗ {invalidCount} inválidos</div>
          </div>
        )}
        
        {!isUnlimited && (
          <Progress 
            value={usagePercentage} 
            className="h-2 bg-purple-800"
          />
        )}
        
        <div className="text-xs text-purple-400 capitalize">
          Plan {planName}
        </div>
      </div>
    </div>
  );
};