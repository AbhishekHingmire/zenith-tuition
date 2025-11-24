export const getExamTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    unit_test: 'Unit Test',
    mid_term: 'Mid-Term',
    final: 'Final Exam',
    weekly_test: 'Weekly Test',
  };
  return labels[type] || type;
};

export const getExamTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    unit_test: 'bg-blue-100 text-blue-700',
    mid_term: 'bg-purple-100 text-purple-700',
    final: 'bg-red-100 text-red-700',
    weekly_test: 'bg-amber-100 text-amber-700',
  };
  return colors[type] || 'bg-gray-100 text-gray-700';
};
