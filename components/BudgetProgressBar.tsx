"use client";


interface BudgetProgressBarProps {
  current: number; // montant dépensé
  limit: number;   // budget limite
}

export default function BudgetProgressBar({ current, limit }: BudgetProgressBarProps) {
  const percentage = Math.min((current / limit) * 100, 100);

  // Couleur adaptative
  const getColor = () => {
    if (percentage < 50) return "bg-primary";
    if (percentage < 80) return "bg-amber-500"; 
    return "bg-red-500";
  };

  return (
    <div className="w-full space-y-1">
      {/* Labels */}
      <div className="flex justify-between text-sm font-medium">
        <span>{current.toFixed(2)} FCFA</span>
        <span>{limit.toFixed(2)} FCFA</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
