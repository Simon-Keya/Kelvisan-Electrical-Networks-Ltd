'use client';

import { TestimonialCard } from './TestimonialCard';

const testimonials = [
  {
    name: 'Sarah Kimani',
    feedback: 'Kelvinsan exceeded our expectations — professional, efficient, and very responsive throughout the entire process.',
  },
  {
    name: 'Michael Otieno',
    feedback: 'Their power backup system installation was flawless. We’ve had zero downtime ever since.',
  },
  {
    name: 'Linda Achieng',
    feedback: 'From consultation to execution, the team was knowledgeable, patient, and truly customer-oriented.',
  },
];

export const Testimonials = () => {
  return (
    <section className=" bg-sky-200 py-24 px-6" id="testimonials">
      <div className="max-w-8xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-700 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-12">
          Hear from our satisfied clients who have trusted us with their homes, businesses, and technology needs.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} name={testimonial.name} feedback={testimonial.feedback} />
          ))}
        </div>

        <div className="mt-16">
          <a href="/contact">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300">
              Join Our Happy Clients
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
