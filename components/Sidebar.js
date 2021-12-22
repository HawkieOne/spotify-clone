import { 
    HomeIcon, 
    SearchIcon, 
    LibraryIcon,
    RssIcon,
    PlusCircleIcon } from '@heroicons/react/outline';
import {
    HeartIcon} from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';



function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState );

    useEffect(() => {
        console.log(spotifyApi.getAccessToken());
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                console.log(data);
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi]);    

    const getSavedTracks = () => {
        // if (spotifyApi.getAccessToken()) {
        //     spotifyApi.getMySavedTracks().then((data) => {
        //         console.log(data);
        //     })
        // }
    }

    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900
                        overflow-y-scroll scrollbar-hide h-screen 
                        sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
            <div className='space-y-4'>
                <button className='flex items-center hover:text-white space-x-3'                
                >
                    <HomeIcon className='h-5 w-5'/> 
                    <p>Home</p>
                </button>   
                <button className='flex items-center hover:text-white space-x-3'                
                >
                    <SearchIcon className='h-5 w-5'/>
                    <p>Search</p>
                </button>   
                <button className='flex items-center hover:text-white space-x-3'                
                >
                    <LibraryIcon className='h-5 w-5'/>
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-x-gray-900'/>

                <button className='flex items-center hover:text-white space-x-3'                
                >
                    <PlusCircleIcon className='h-5 w-5'/>
                    <p>Create Playlist</p>
                </button>   
                <button className='flex items-center hover:text-white space-x-3'                
                >
                    <HeartIcon className='h-5 w-5 text-blue-500'/>
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center hover:text-white space-x-3'                
                >
                    <RssIcon className='h-5 w-5 text-green-500'/>
                    <p>Your Episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-x-gray-900'/>
                {playlists.map((playlist) => (
                    <p 
                        key={playlist.id} 
                        className='cursor-pointer hover:text-white'
                        onClick={() => setPlaylistId(playlist.id)}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
