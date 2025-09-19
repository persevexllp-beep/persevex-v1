"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "@/app/components/StarField";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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

      <div className=" z-10 w-full max-w-6xl mx-auto px-2 md:px-6 py- sm:py-32">
        <div className="bg-transparent backdrop-blur-xs border border-white/10 rounded-2xl p-4 md:p-12">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400 italic mt-4">
              Last updated on September 12, 2025
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6 [&>h2]:pt-6 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-white [&>h3]:pt-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white">
            <p>
              Thank you for choosing to be part of our community at PERSEVEX EDUCATION CONSULTANCY LLP ("Company," "We," "Us," "Persevex," or "Our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at <a href="mailto:support@persevex.com" className="text-orange-400 hover:text-orange-300">support@persevex.com</a>.
            </p>
            <p>
              This privacy notice describes how we might use your information if you: Visit our website at <a href="https://www.persevex.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">https://www.persevex.com</a> or Engage with us in other related ways ― including any sales, marketing, or events.
            </p>
            <p>In this privacy notice, if we refer to:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>"Website," we are referring to any website of ours that references or links to this policy</li>
              <li>The term "Platform" refers to the Website/Domain created by the Company which provides the Client to avail services of the Company through the use of the platform.</li>
              <li>"Services," we are referring to our Website, and other related services, including any sales, marketing, or events</li>
              <li>"You", "Your", "Yourself", "User", shall mean and refer to natural and legal individuals who use the Platform and who are competent to enter into binding contracts</li>
              <li>"Third Parties" refer to any Application, Company or individual apart from the User, Vendor and the creator of this Application.</li>
            </ul>
            <p>
              The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
            </p>
            <p>
              While you may be able to browse certain sections of the Platform without registering with us, however, By visiting this Platform, providing your information or availing out product/service, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws. If you do not agree please do not use or access our Platform.
            </p>
            <p>
              Please read this privacy notice carefully, as it will help you understand what we do with the information that we collect.
            </p>

            <h2>Applicability</h2>
            <p>
              This privacy policy ("Policy") describes Our policies and procedures on the collection, use, storage and disclosure of any information including, business or personal information provided by You while using Our Website.
            </p>

            <h2>What Information Do We Collect?</h2>
            <p>
              Persevex collects personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.
            </p>
            <p>
              The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following: Personal Information such as, but not limited to, Name, Email Id, Mobile number, Institution, Password, Age, Address, etc,
            </p>
            <p>
              <strong>Payment Data-</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument.
            </p>
            <p>
              All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information. If you choose to post messages on our message boards, chat rooms or other message areas or leave feedback or if you use voice commands to shop on the Platform, we will collect that information you provide to us. We retain this information as necessary to resolve disputes, provide customer support and troubleshoot problems as permitted by law.
            </p>
            <p>
              If you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities or postings on the Platform, we may collect such information into a file specific to you.
            </p>
            <p>
              We collect information that You provide to Us over telephone. We may make and keep a record of the information You share with us; Information that You provide to Us by completing surveys.
            </p>
            
            <h3>Information collected from other sources</h3>
            <p>
              In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, as well as from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behavior data), Internet Protocol (IP) addresses, social media profiles, social media URLs and custom profiles, for purposes of targeted advertising and event promotion.
            </p>

            <h2>How Do We Use Your Information?</h2>
            <p>
              We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
            </p>
            <p>We use the information we collect or receive:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li><strong>To facilitate account creation and logon process.</strong> If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract.</li>
              <li><strong>To post testimonials.</strong> We post testimonials on our Website that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and the content of the testimonial. If you wish to update or delete your testimonial, please contact us at <a href="mailto:support@persevex.com" className="text-orange-400 hover:text-orange-300">support@persevex.com</a> and be sure to include your name, testimonial location, and contact information.</li>
              <li><strong>Request feedback.</strong> We may use your information to request feedback and to contact you about your use of our Website.</li>
              <li>To monitor, improve and administer our Website.</li>
              <li>To conduct research and analysis.</li>
              <li><strong>To enable user-to-user communications.</strong> We may use your information in order to enable user-to-user communications with each user's consent.</li>
              <li><strong>To manage user accounts.</strong> We may use your information for the purposes of managing our account and keeping it in working order.</li>
              <li>To remember information to help You efficiently access the Website.</li>
              <li>To provide You with information that You request from Us.</li>
              <li><strong>To send you marketing and promotional communications.</strong> We and/or our third-party marketing partners may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences.</li>
              <li><strong>Deliver targeted advertising to you.</strong> We may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness.</li>
              <li>To carry out Our obligations arising from any contracts entered into between You and Us.</li>
              <li>To notify You about changes on Our Website.</li>
              <li>To enable Us to comply with Our legal and regulatory obligations.</li>
            </ul>
            <p>
              In our efforts to continually improve our product and service offerings, we and our affiliates collect and analyse demographic and profile data about our users' activity on our Platform. We identify and use your IP address to help diagnose problems with our server and to administer our Platform. Your IP address is also used to help identify you and to gather broad demographic information.
            </p>

            <h2>Will Your Information Be Shared With Anyone?</h2>
            <p>
              We use the information to understand Your needs and accordingly facilitate Our services and route You through the relevant information that meets Your need. We do not sell, rent, trade or exchange any personally identifying information of Our Users. We may provide the Information to Our affiliates and service providers under contract (such as customer care, data analytics) to support the operation of the Website and Our Services. To the extent we use Your personal information to market to You, we will provide You the ability to opt-out of such uses.
            </p>
            <p>
              We do not sell, rent or otherwise provide your personal or business information to third parties except as provided in this policy. We may share Your information with third parties with Your prior consent and in such an event, the third parties' use of Your information will be bound by the Policy. Your information may be stored in locations outside the direct control of Persevex (for instance, on servers or databases co-located with hosting providers).
            </p>
            <p>
              We may disclose Your information to service providers involved in operating Our business. This includes payment providers, third party servers, email service providers and professionals such as accountants and lawyers. We reserve the right to disclose your personal information in the scope and in situations as required by the law and when we believe in good faith that such disclosure is necessary to protect our rights, to report suspected illegal activity, comply with judicial proceedings, court orders or decisions, or legal process served on our website.
            </p>

            <h2>Do We Use Cookies and Other Tracking Technologies?</h2>
            <p>
              a) The User is aware that a 'Cookie' is a small piece of information stored by a web server on a web browser so it can later be traced back from that particular browser, and that cookies are useful for enabling the browser to remember information specific to a given user, including but not limited to a User's login identification, password, etc. The User is aware that the Website places both permanent and temporary cookies in the User's computer's hard drive and web browser, and does hereby expressly consent to the same.
            </p>
            <p>
              b) The User is further aware that the Website uses data collection devices such as cookies on certain pages of the Website to help analyse web page flow, measure promotional effectiveness, and promote trust and safety, and that certain features of the Website are only available through the use of such cookies. While the User is free to decline the Website's cookies if the User's browser permits, the User may consequently be unable to use certain features on the Website.
            </p>
            <p>
              c) Additionally, the User is aware that he/she might encounter cookies or other similar devices on certain pages of the Website that are placed by third parties or affiliates of the Company/Website. The User expressly agrees and acknowledges that the Company/Website does not control the use of such cookies/other devices by third parties, that the Company/Website is in no way responsible for the same, and that the User assumes any and all risks in this regard.
            </p>
            
            <h2>How Long Do We Keep Your Information?</h2>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us to keep your personal information for longer than the period of time in which users have an account with us.
            </p>
            <p>
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </p>
            
            <h2>Your Choices About Your Information</h2>
            <p>
              You may, of course, decline to submit personally identifiable information through the Website, in which case Persevex may not be able to provide certain services to you. In addition, you may update or correct your account information and email preferences at any time by logging in to your account. If you would like us to remove your personally identifiable information from our database, please send a request to <a href="mailto:support@persevex.com" className="text-orange-400 hover:text-orange-300">support@persevex.com</a>.
            </p>
            <p>
              We are not responsible for revising or removing your personally identifiable information obtained by any third party who has previously been provided your information by us in accordance with this policy or any third party to whom you have provided such information (whether by sharing your login and password, or otherwise).
            </p>

            <h2>Links to Third Party Sites</h2>
            <p>
              Our Website may, from time to time, contain links to and from the websites of Our partner networks, affiliates and other third parties. The inclusion of a link does not imply any endorsement by Us of the third party website, the website's provider, or the information on the third party website. If You follow a link to any of these websites, please note that these websites may be governed by their own privacy policies and We disclaim all responsibility or liability with respect to these policies or the websites. Please check these policies and the terms of the websites before You submit any information to these websites.
            </p>

            <h2>Security Precautions</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.
            </p>

            <h2>Children Information</h2>
            <p>
              We do not knowingly solicit or collect personal information from children under the age of 18 and use of our Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. If you are under the age of 18 years, then you must use the Platform, application or services under the supervision of your parent, legal guardian, or any responsible adult.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information in accordance with applicable laws, for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse or if required by law or for other legitimate purposes. We may continue to retain your data in anonymised form for analytical and research purposes.
            </p>

            <h2>Your Consent</h2>
            <p>
              By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information (including sensitive personal information) on the Platform in accordance with this Privacy Policy. If you disclose to us any personal information relating to other people, you represent that you have the authority to do so and to permit us to use the information in accordance with this Privacy Policy.
            </p>
            <p>
              You, while providing your personal information over the Platform or any partner platforms or establishments, consent to us (including our other corporate entities, affiliates, lending partners, technology partners, marketing channels, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy.
            </p>
            <p>
              If you have questions or comments about your privacy rights, you may email us at <a href="mailto:support@persevex.com" className="text-orange-400 hover:text-orange-300">support@persevex.com</a>.
            </p>

            <h2>Controls for Do-Not-Track Features</h2>
            <p>
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
            </p>

            <h2>Exclusion</h2>
            <p>
              This Policy does not apply to any information other than such information collected otherwise. This Policy shall not apply to any unsolicited information You provide Us through this Website or through any other means. This includes, but is not limited to, information posted to any public areas of the Website. All such unsolicited information shall be deemed to be non-confidential and Persevex shall be free to use, disclose such unsolicited information without limitation
            </p>

            <h2>Severability</h2>
            <p>
              We have made every effort to ensure that this Policy adheres with the applicable laws. The invalidity or unenforceability of any part of this Policy shall not prejudice or affect the validity or enforceability of the remainder of this Policy.
            </p>

            <h2>Governing Law and Dispute Resolution</h2>
            <p>
              This Policy shall be governed by and construed in accordance with the laws of India and the courts at Bengaluru, Karnataka shall have exclusive jurisdiction in relation to any disputes arising out of or in connection with this Policy.
            </p>

            <h2>Foreign Jurisdiction</h2>
            <p>
              Persevex makes no representation that the content contained in the Website is appropriate or to be used anywhere outside of India. The information provided on or through the contents of the Website is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject the Company to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              Please check our Privacy Policy periodically for changes. We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
            </p>

            <h2>Consent Withdrawal, Data Download & Data Removal Requests</h2>
            <p>
              To withdraw your consent, or to request the download or delete your data with us for any or all our products & services at any time, please email to <a href="mailto:support@persevex.com" className="text-orange-400 hover:text-orange-300">support@persevex.com</a>.
            </p>

            <h2>Contact Information:</h2>
            <p>
              For any questions or concerns regarding this Privacy Policy, please contact PERSEVEX EDUCATION CONSULTANCY LLP at <a href="mailto:support@persevex.com" className="text-orange-400 hover:text-orange-300">support@persevex.com</a>.
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