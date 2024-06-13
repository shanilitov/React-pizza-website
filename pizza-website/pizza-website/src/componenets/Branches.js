import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header";
import Branch from "./Branch";
import '../CSS/Branches.css'

function Branches() {
    const [branchList, setBranchList] = useState([])
    const state = []


    useEffect(() => {

        async function getAllBranches() {
            fetch('http://localhost:3600/branches/get_all_branches_data')
                .then(res => res.json())
                .then(
                    ans => {
                        console.log(ans)
                        let temp = JSON.parse(ans)
                        console.log(temp)
                        setBranchList(temp)

                    }
                )
        }
        getAllBranches()
    }, state)



    return (
        <div className="branchesdisplay">

            <Header className="header" />

            <div className="background-img"></div>

            <div className="content">
                {/* תוכן העמוד */}
                {branchList.map((v, i) => {
                    if (v !== undefined) {
                        console.log(v)
                        return (
                            <Branch data={JSON.stringify(v)} key={i} />
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>

    )
}
export default Branches;