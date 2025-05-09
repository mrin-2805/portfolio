import { websiteContent } from "@/app/WebsiteContent";

export default function Career() {
    return (
        <>
            {websiteContent.careers && websiteContent.careers.length && (
                <div className="border-forground grid w-full grid-cols-10 gap-4 border-b p-2">
                    <div className="col-span-4">
                        <p><strong>Role</strong></p>
                    </div>
                    <div className="col-span-4">
                        <p><strong>Company</strong></p>
                    </div>
                    <div className="col-span-2">
                        <p><strong>Year</strong></p>
                    </div>
                </div>
            )}
            {websiteContent.careers &&
                websiteContent.careers.length &&
                websiteContent.careers.map((career) => (
                    <div key={career.company} className="border-foreground grid w-full grid-cols-10 gap-1 border-b py-6 md:gap-2 lg:gap-6 lg:px-2">
                        <div className="col-span-4">
                            <p>{career.role}</p>
                        </div>
                        <div className="col-span-4">
                            <p>{career.company}</p>
                        </div>
                        <div className="col-span-2">
                            <p>{career.duration}</p>
                        </div>
                    </div>
                ))}
        </>
    );
}
