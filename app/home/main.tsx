"use client";

import LibraryWidget from "../../components/library/LibraryWidget";
import Wall from "../../components/wall/Wall";
import Friends from "../../components/friends/Friends";

const HomeMain = () => { 

    return (
        <main>
            <div></div>
            <div className="grid grid-cols-3">
                <LibraryWidget/>
                <Wall/>
                <Friends/>
            </div>
        </main>
    )
}

export default HomeMain;