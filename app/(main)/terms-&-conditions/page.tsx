"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "@/app/components/StarField";
import Link from "next/link";

export default function TermsAndConditionsPage() {
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-2 md:px-6 py-24 sm:py-32">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-12">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-gray-400 italic mt-4">
              Last updated on September 12, 2025
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
            <p>
              These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding agreement by and between PERSEVEX EDUCATION CONSULTANCY LLP, ("Website Owner" or "we" or "us" or "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, "Services").
            </p>
            <p>
              By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.
            </p>
            <p>
              The use of this website or availing of our Services is subject to the following terms of use:
            </p>

            <ol className="list-decimal list-outside pl-6 space-y-4">
              <li>To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.</li>
              <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
              <li>Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.</li>
              <li>The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.</li>
              <li>You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.</li>
              <li>You agree to pay us the charges associated with availing the Services as per the pricing schedule indicated on our website.</li>
              <li>You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.</li>
              <li>You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.</li>
              <li>You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with us for the Services.</li>
              <li>You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, than this would make you ineligible for a refund.</li>
              <li>You are prohibited from violating or attempting to violate the security of our platform, including accessing data not intended for you, attempting to probe or test vulnerabilities, interfering with services, or engaging in any unauthorized activities.</li>
              <li>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without our express written permission.</li>
              <li>You agree not to post, upload, or transmit any content that is harmful, harassing, defamatory, obscene, invasive of privacy, hateful, or otherwise objectionable or unlawful.</li>
              <li>We reserve the right to suspend or terminate your access to our Services if you violate these Terms, provide inaccurate information, or engage in activities that may cause harm to other users or our platform.</li>
              <li>You agree to defend, indemnify and hold harmless PERSEVEX EDUCATION CONSULTANCY LLP, its employees, directors, officers, and agents against any claims, liabilities, damages, or costs arising from your use of our Services or violation of these Terms.</li>
              <li>We shall not be liable for any special, incidental, indirect, consequential or punitive damages arising from your use of our Services, even if we have been advised of the possibility of such damages.</li>
              <li>We may change, modify, or remove the contents of our website at any time without notice. We reserve the right to modify or discontinue our Services without liability to you or any third party.</li>
              <li>You consent to receive electronic communications from us, including notifications, agreements, and other important messages via our website, mobile applications, and email.</li>
              <li>We are not responsible for the availability, accuracy, or content of third-party websites or resources linked from our platform. You access such links at your own risk.</li>
              <li>All users who are minors must have permission from and be supervised by their parent or guardian to use our Services. Parents or guardians agree to be responsible for any violations of these Terms by minors.</li>
              <li>Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event including but not limited to acts of God, war, terrorism, floods, fire, strikes, epidemics, civil unrest, power outages, or severe weather.</li>
              <li>These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.</li>
              <li>All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.</li>
              <li>If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law.</li>
              <li>These Terms constitute the entire agreement between you and us regarding your use of our Services and supersede all previous agreements between the parties.</li>
            </ol>
            <p>
              All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
            </p>
          </div>
           <div className="w-full flex items-center justify-center">
            <Link href='/?scrollTo=policy'  className="bg-orange-400 hover:bg-orange-500 text-xl cursor-pointer rounded-2xl px-4 py-2 text-black mt-24">Back to policies</Link>
        </div>
        </div>
       
      </div>
    </main>
  );
}