import Image from "next/image";


const partnersList = [
  { src: "/nsdc.png", alt: "NSDC" },
  { src: "/skill.png", alt: "Skill India" },
  { src: "/nsdc.png", alt: "NSDC" },
  { src: "/skill.png", alt: "Skill India" },
  { src: "/nsdc.png", alt: "NSDC" },
  { src: "/skill.png", alt: "Skill India" },
  { src: "/nsdc.png", alt: "NSDC" },
  { src: "/skill.png", alt: "Skill India" },
];

export default function TrainingPartners() {
  return (
    <section className="bg- h-[80vh]  py-20 overflow-hidden">
      <div className="max-w-7xl flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
            <div className="inline-flex mb-4 items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm">
          <span className="text-orange-400 text-sm font-medium">Partners</span>
        </div>
          <h2 className="text-5xl font-bold ">
            Training Partners
          </h2>
          <p className="mt-4 max-w-2xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mx-auto ">
            We collaborate with leading organizations to provide you with the
            best learning experience.
          </p>
        </div>

        <div 
          className="w-full inline-flex flex-nowrap 
                     [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]"
        >
          <div className="flex items-center justify-center animate-scroll-partners">
            
            {partnersList.map((partner, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={160}
                  height={80}
                  className="max-h-[100px] w-auto"
                />
              </div>
            ))}
            {partnersList.map((partner, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0 mx-8" aria-hidden="true">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={160}
                  height={80}
                  className="max-h-[70px] w-auto"
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}