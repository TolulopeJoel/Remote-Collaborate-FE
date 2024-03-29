import React, { useState, useEffect } from "react";
import api from "../../components/Api";
import Navbar from "../../components/Navbar";
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function TeamList() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        api.get(`/teams/?page=${currentPage}`)
            .then((response) => {
                setLoading(false);
                setTeams(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10));
            }).catch(error => console.log(error));
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container">

                <h1 className="display-6 my-5">Select a team to view tasks.</h1>

                {teams.length > 0 &&
                    <div>
                        {teams && teams.map(team => (
                            <div>
                                <div className="d-flex justify-content-between border border-2 align-items-center rounded-4 my-5 p-3">
                                    <h6><a href={`/teams/${team.id}`}>{team.name}</a></h6>
                                    <div><b>{(team.assigner.username).toUpperCase()}</b></div>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {teams.length === 0 &&
                    <div>
                        <h4>You are not in a team yet.<br />Create one or ask your friends to add you to a current one.</h4>
                    </div>
                }

                <a href="/teams/new" className="btn btn-lg my-3 mx-auto add-password text-primary">Add new team +</a>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Stack spacing={2}>
                        <Pagination count={totalPages} page={currentPage} shape='rounded' onChange={handlePageChange} />
                    </Stack>
                </div>
            </div>

        </>

    );
}
