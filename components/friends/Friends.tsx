import { MdPeopleAlt } from "react-icons/md";


export default function Wall() {
    return (
        <section className="flex flex-col">
            <div className="flex bg-gray-900 border border-gray-900 rounded-t-md p-5 mx-5 mt-5 border-b-2">
                <div className="text-sm flex-grow">Your Friends</div>
                
            </div>
            <div className="flex bg-gray-900 border border-gray-900 rounded-b-md p-5 mx-5 border-b-2">
                <div className="grid grid-cols-2 items-center">
                    <div className="flex text-6xl justify-center"><MdPeopleAlt/></div>
                    <div className="col-span-1">
                        <div className="text-lg">Add a Friend</div>
                        <div className="text-sm text-gray-500">Share your music</div>
                    </div>
                </div>
            </div>
        </section>
    )
}