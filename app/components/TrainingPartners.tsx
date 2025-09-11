import { Key } from "lucide-react"
import Image from "next/image"


export default function TrainingPartners() {


    const partners = [
        {
            key: 'skillinida',
            image: '/skillin.jpeg'
        }, 
        {
            Key: 'nsdc',
            image: '/nsdc.webp'
        }
    ]

    return <div className="flex flex-col items-center justify- min-h-screen">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-white">Training Partners</h1>
            <p className="mt-2 text-center max-w-xl">We collaborate with leading organizations to provide you with the best learning experience</p>
        </div>

        <div className="flex mt-36  gap-20">
            {/* partners will be here */}
            {partners.map((partner) => (
                <div key={partner.image} className="flex gap-4">
                    <Image key={partner.Key} width={500} height={500} className="h-40 w-40" src={partner.image} alt="partner image" />
                </div>
            ))}
        </div>
    </div>
}