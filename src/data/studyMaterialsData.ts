// Comprehensive Study Materials for 1 Year
import { coachingBatches } from './comprehensiveCoachingData';

export const studyMaterials = (() => {
  const materials: any[] = [];
  const materialTypes = ['Notes', 'Practice Questions', 'Formula Sheet', 'Previous Year Papers', 'Revision Notes', 'MCQ Bank', 'Theory Explanation', 'Solved Examples'];
  const fileTypes = ['pdf', 'doc', 'ppt'];
  let materialId = 1;

  coachingBatches.forEach(batch => {
    batch.subjects.forEach(subject => {
      // Generate 2-3 materials per subject per month (24-36 materials per subject per year)
      for (let month = 1; month <= 12; month++) {
        const materialsThisMonth = Math.floor(Math.random() * 2) + 2; // 2-3 materials
        
        for (let i = 0; i < materialsThisMonth; i++) {
          const uploadDay = Math.floor(Math.random() * 28) + 1;
          const materialType = materialTypes[Math.floor(Math.random() * materialTypes.length)];
          const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
          
          materials.push({
            id: `mat-${materialId}`,
            title: `${subject} - ${materialType} (Chapter ${month})`,
            subject,
            batch: batch.name,
            grade: batch.grade,
            type: fileType,
            category: materialType,
            uploadedBy: batch.teacher,
            uploadedDate: `2024-${String(month).padStart(2, '0')}-${String(uploadDay).padStart(2, '0')}`,
            size: `${Math.floor(Math.random() * 5000) + 500} KB`,
            pages: Math.floor(Math.random() * 20) + 5,
            downloads: Math.floor(Math.random() * 150),
            views: Math.floor(Math.random() * 300) + 50,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            description: `Comprehensive ${materialType.toLowerCase()} for ${subject} covering chapter ${month} topics`,
            tags: [subject, batch.grade, materialType],
            fileUrl: `/materials/${batch.id}/${subject.replace(/\s+/g, '-').toLowerCase()}/chapter-${month}.${fileType}`
          });
          
          materialId++;
        }
      }
    });
  });

  return materials.sort((a, b) => new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime());
})();

console.log(`📚 Generated ${studyMaterials.length} study materials across all subjects and batches`);
