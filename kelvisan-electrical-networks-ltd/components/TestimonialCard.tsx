'use client';

interface TestimonialCardProps {
  name: string;
  feedback: string;
}

export const TestimonialCard = ({ name, feedback }: TestimonialCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
      <p className="text-gray-600 dark:text-gray-300 italic mb-4 leading-relaxed">
        &ldquo;{feedback}&rdquo;
      </p>
      <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400 text-right">
        — {name}
      </h3>
    </div>
  );
};
