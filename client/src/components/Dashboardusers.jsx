import React, { useState, useEffect } from 'react';
import { deleteUser, getUsers, updateUser } from '../api';
import { default_album_img, default_user_img } from '../assets/img';

const Dashboardusers = () => {
    const [allusers, setallusers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(result => {
                setallusers(result.users);
            })
            .catch(error => {
                // Handle any potential errors here
                // console.error(error);
            });
    }, []);
    const [deletethisuser, setdeletethisuser] = useState(null);

    const updaterole = (user_id, value) => {
        // console.log(user_id, bodydata);
        const body = { "role": value }
        const updated = updateUser(user_id, body);
        // console.log(updated);
        window.location.reload();

    }

    const handleDelete = (userId) => {
        // Implement delete functionality here
        // You can use the usersId to delete the users from the database
        try {
            const deleted = deleteUser(userId);
            // console.log(deleted);
            window.location.reload();
            setdeletethisuser(null);
        } catch (error) {
            console.log("Not deleted");
        }

    };
    const [searchQuery, setSearchQuery] = useState('');
    const filteredusers = allusers.filter(users =>
        users?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        // allsongs
    );

    return (
        <div className='pt-7 flex flex-col items-center justify-center'>
            {/* search box */}
            <div className='w-[50%] h-auto border-solid rounded-full border-black border-2 flex overflow-auto relative'>
                <input
                    type='text'
                    placeholder='Search'
                    className='w-full h-9 p-5 outline-none hover:bg-blue-50'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            <div className='p-7 w-full flex flex-col items-center gap-5'>
                {filteredusers.length > 0 ? (
                    filteredusers.map(users => (
                        <div
                            key={users._id}
                            className='w-full text-sm flex items-center justify-center bg-blue-100 rounded-lg p-4 shadow-sm'
                        >
                            <img
                                src={users.imageURL || default_user_img}
                                className='rounded-full h-14 w-14 object-cover mr-5 shadow-md'
                                alt={"user img"}
                            />
                            <div className='flex flex-col flex-grow'>
                                <div className='text-md text-blue-800 font-bold'>{users.name}</div>
                                <div className='text-md text-blue-500'>{users.role}</div>
                            </div>

                            <button
                                onClick={() => setdeletethisuser(users)}
                                className='px-3 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 ml-auto'
                            >
                                Delete
                            </button>

                            {/* Confirmation Box */}
                            {deletethisuser && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
                                    <div className="bg-white rounded-lg p-6">
                                        <p>Are you sure you want to Delete "{deletethisuser.name}"?</p>
                                        <p>You can't undo this action</p>
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={() => setdeletethisuser(false)}
                                                className="px-3 py-1 rounded bg-gray-500 text-white font-semibold hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleDelete(deletethisuser._id)}
                                                className="ml-3 px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {users.role === "member" && (
                                <button
                                    className='ml-3 px-3 py-1 rounded bg-orange-400 text-white font-semibold hover:bg-orange-600 w-32'
                                    onClick={() => updaterole(users._id, "admin")}
                                >
                                    Make Admin
                                </button>
                            )}

                            {users.role === "admin" && (<button className='ml-3 px-3 py-1 rounded bg-orange-400 text-white font-semibold hover:bg-orange-600 w-32'
                                onClick={() => updaterole(users._id, "member")}>
                                Make Member
                            </button>)}

                        </div>
                    ))
                ) : (
                    <div className='text-blue-800 font-semibold'>Nothing to Display</div>
                )}
            </div>
        </div >
    );
};

export default Dashboardusers;
