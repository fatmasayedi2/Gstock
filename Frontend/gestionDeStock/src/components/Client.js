import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function UserList() {

    useEffect(() => {
        getUsers(); // Appel de la fonction pour récupérer les données des utilisateurs lors du chargement du composant
    }, []);

    const [userData, setUserData] = useState([]); // Utilisation d'un état pour stocker les données des utilisateurs

    const getUsers = async () => {
        try {
            const res = await fetch("http://localhost:3001/users", { // Endpoint pour récupérer les utilisateurs
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 200) {
                console.log("User data retrieved.");
                setUserData(data);
            } else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteUser = async (userId) => {
        try {
            const res = await fetch(`http://localhost:3001/users/${userId}`, { // Endpoint pour supprimer l'utilisateur
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200) {
                console.log("User deleted successfully.");
                // Mettre à jour la liste des utilisateurs après suppression
                getUsers();
            } else {
                console.log("Failed to delete user.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container-fluid p-5'>
            <h1>User List</h1>
            <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                <table className="table table-striped table-hover mt-3 fs-5">
                    <thead>
                        <tr className="tr_color">
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            
                            <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><NavLink to={`/updateuser/${user._id}`}className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></NavLink></td>
                                    <td><button className="btn btn-danger" onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button></td>
                                   
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
