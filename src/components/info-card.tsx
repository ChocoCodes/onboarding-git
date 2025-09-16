import type { Member } from "@/lib/types"

const InfoCard = ({ 
    name, 
    age, 
    position, 
    department, 
    reason, 
    funFact, 
    email 
}: Member) => {
    const mapColors = (department: string) => {
        const colors = {
            web: 'bg-blue-500',
            ai: 'bg-yellow-500',
            uiux: 'bg-red-500',
            game: 'bg-green-500',
            executive: 'bg-[#BF00FF]'
        }

        const deptLower = department.toLowerCase()
        for(const key in colors) {
            if(deptLower.includes(key)) return colors[key as keyof typeof colors]
        }

        return 'bg-gray-500'
    }
    return (
        <div className="flex flex-col gap-3 w-full lg:w-[48%] p-6 rounded-lg glass-card">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <h2 className="font-bold text-2xl">{ name }</h2>
                    <p className="text-md text-gray-300">{ age } years old</p>
                </div>
                <div>
                    <p className={`px-4 py-1 inline-block ${ mapColors(department) } text-background rounded-full text-sm`}>{ position } - { department }</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-xl">Why did you join GDG?</p>
                <p className="text-md text-gray-300">{ reason }</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-xl">Fun Fact!</p>
                <p className="text-md text-gray-300">{ funFact }</p>
            </div>
            <p>Contact me via: <span className="text-gray-300 underline">{ email }</span></p>
        </div>
    )
}

export { InfoCard };