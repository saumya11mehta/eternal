import Text from "../../image/logo/Text"
import AvatarDefault from "../../image/avatar/AvatarDefault"
import { AiFillHome } from 'react-icons/ai';
import { IoMusicalNotes } from 'react-icons/io5';


export default function HomeNavBar() { 
    return (
        <nav className="flex justify-between border border-0 mx-5 border-b-2 border-b-gray-900">
            <div className="w-10 p-5 hover:cursor-pointer">
                <Text width="200"/>
            </div>
            <div className="flex justify-end">
                <div className="flex m-2 p-5 border border-gray-800 hover:bg-gray-800 rounded-full items-center hover:cursor-pointer"><AiFillHome className="text-3xl" /></div>
                <div className="flex m-2 p-5 border border-gray-800 hover:bg-gray-800 rounded-full items-center hover:cursor-pointer"><IoMusicalNotes  className="text-3xl"/></div>
                <div className="flex m-2 p-5 border border-gray-800 hover:bg-gray-800 rounded-full items-center hover:cursor-pointer">
                    <AvatarDefault width="30" height="30"/>
                </div>
            </div>
        </nav>
    )
}