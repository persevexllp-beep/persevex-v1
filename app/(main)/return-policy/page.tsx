"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "@/app/components/StarField";
import Link from "next/link";

export default function CancellationRefundPage() {
  return (
    <main className="relative min-h-screen w-full text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <StarField hover={false} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 sm:py-32">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Cancellation & Refund Policy
            </h1>
            <p className="text-gray-400 italic mt-4">
              Last updated on September 12, 2025
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
            <p>
              PERSEVEX EDUCATION CONSULTANCY LLP believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
            </p>

            <ul className="list-disc list-outside pl-6 space-y-4">
              <li>Persevex Education Consultancy LLP does not accept returns under any circumstances for any course or service purchased via www.persevex.com.</li>
              <li>Course change is allowed only once and must be requested at least 7 days prior to the original course start date. The new course must have available seats and should be completed within 30 days of the original course’s end date.</li>
              <li>If switching to a higher-value course, the learner must pay the difference. No refund will be issued if switching to a lower-value course. A non-refundable processing fee of ₹500 must be paid within 3 days of approval, failing which the request will be canceled.</li>
              <li>To request a course change, email <a href="mailto:support@persevex.com" className="text-orange-400 hover:text-orange-300">support@persevex.com</a>. Once approved, submit the "Course Change Form" within 3 business days and pay the required fees. Confirmation will be sent within 5–7 business days.</li>
              <li>If Persevex reschedules a course due to delays or unforeseen circumstances, learners may request a full refund or enroll in a different batch/course. Reimbursements will only cover the course fee. Any personal expenses are not refundable.</li>
              <li>Learners may request rescheduling at least 10 business days before the course start date. The new course must start within 90 days and is subject to seat availability. Rescheduling does not permit course changes.</li>
              <li>A non-refundable rescheduling fee of ₹500 must be paid within 5 business days from approval. The reschedule request will be canceled if payment is not made within this period.</li>
              <li>To request rescheduling, email <a href="mailto:support@persevex.com" className="text-orange-400 hover:text-orange-300">support@persevex.com</a>. Once approved, submit the "Reschedule Course Form" and the fee payment receipt within 3 business days. Confirmation will be sent within 5–7 business days.</li>
              <li>Persevex reserves the right to cancel any session due to instructor unavailability, insufficient participants, or force majeure events (natural disasters, protests, strikes, etc.).</li>
              <li>Refunds will only be processed if Persevex fails to deliver the course within 30 days of the scheduled start date. No refunds will be provided under any other condition.</li>
              <li>All refund requests are subject to verification and approval. Refunds will be issued to the original payment method within 1–2 business days after approval.</li>
              <li>No cash refunds will be provided. Payments made via card, bank transfer, or platforms like PhonePe, Google Pay, etc., will be refunded to the same source.</li>
            </ul>
          </div>
           <div className="w-full flex items-center justify-center">
            <Link href='/?scrollTo=policy' className="bg-orange-400 hover:bg-orange-500 text-xl cursor-pointer rounded-2xl px-4 py-2 text-black mt-24">Back to policies</Link>
        </div>
        </div>
      </div>
    </main>
  );
}