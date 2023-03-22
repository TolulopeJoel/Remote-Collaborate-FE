import React, { useState, useEffect } from "react";
import api from "../../components/api";
import '../../Task.css';

export default function TeamList() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        api.get('/teams/',)
            .then((response) => {
                // console.log()
                setTeams(response.data.results);
            }).catch(error => console.log(error));
    }, []);

    return (
        <>
            <div>
                <div className="container">
                    <form className="d-flex mt-5" role="search">
                        <input className="form-control form-control-lg me-2" type="search" placeholder="Search sites..." aria-label="Search" />
                        <button type="submit" className="btn btn-lg search-btn">Search</button>
                    </form>

                    <h1 className="display-6 my-5">Select a team to view tasks.</h1>
                    {teams && teams.map(team => (
                        <div>
                            <div className="border border-2 align-items-center rounded-4 my-5 p-3">
                                <h6><a href={team.name}>{team.name}</a></h6>
                            </div>
                        </div>
                    ))}
                    <a href="/teams/new" className="btn btn-lg my-3 mx-auto add-password">Add teams +</a>
                </div>
            </div>
        </>
    );
}