import React, { FC } from "react";
import Link from "next/link";
import AnimatedTitle from "./AnimatedTitle"; 
import { ShieldCheck, FileText, Undo2 } from 'lucide-react';

const PolicySection: FC = () => {
  return (
    <div className="flex flex-col items-center mt-20 lg:mt-0 justify-center min-h-screen pb-12 px-4 sm-px-6 lg:px-8 text-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 mb- text-center justify-center h-full items-center md:text-left">
            <h1 className="font-bold text-4xl lg:text-6xl">Privacy Policy</h1>
            <p className="text-center  text-sm lg:text-lg w-3/4">
              Important documents about our policies, terms, and procedures.
              Please review these to understand your rights and our
              responsibilities.
            </p>
          </div>

          <div className="flex flex-col mb- gap-4 lg:gap-12">
            <div className="flex border rounded-4xl items-center justify-center px-4 py-8 flex-col gap-2">
              <Link href="/privacy-policy">
                <AnimatedTitle 
                  as="h1" 
                  className="text-2xl text-start cursor-pointer"
                  icon={<ShieldCheck size={24} aria-hidden="true" />}
                >
                  Privacy Policy
                </AnimatedTitle>
              </Link>
             
            </div>

            <div className="flex items-center justify-center px-4 py-8 border rounded-4xl flex-col gap-2">
              <Link href="/terms-&-conditions">
                <AnimatedTitle 
                  as="h1" 
                  className="text-2xl text-start cursor-pointer"
                  icon={<FileText size={24} aria-hidden="true" />}
                >
                  Terms and Conditions
                </AnimatedTitle>
              </Link>
             
            </div>

            <div className="flex items-center  justify-center px-8 py-8 border rounded-4xl  flex-col gap-2">
              <Link href="/return-policy">
                <AnimatedTitle 
                  as="h1" 
                  className="text-2xl text-start cursor-pointer"
                  icon={<Undo2 size={24} aria-hidden="true" />}
                >
                  Return Policy
                </AnimatedTitle>
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicySection;