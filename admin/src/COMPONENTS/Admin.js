import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import menue from '../img/edit.jpg'

function Admin() {
    const [branches, setBranches] = useState([]); // [{branch_id, branch_name, sum}]
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getBranches();
    }, []);

    async function getBranches() {
        try {
            const res = await fetch('http://localhost:3600/branches/info');
            const ans = await res.json();

            if (ans === false) return;

            const branchDetails = JSON.parse(ans);
            const branchPromises = branchDetails.map(async (branch) => {
                const sum = await branchMoney(branch.id);
                return {
                    id: branch.id,
                    name: branch.name,
                    sum,
                };
            });

            const branchesWithMoney = await Promise.all(branchPromises);
            const totalSum = branchesWithMoney.reduce((acc, branch) => acc + branch.sum, 0);

            setBranches(branchesWithMoney);
            setTotal(totalSum);
        } catch (error) {
            console.error("Error fetching branches: ", error);
        }
    }

    async function branchMoney(branch_id) {
        try {
            const res = await fetch(`http://localhost:3600/admin/get_branch_money/${branch_id}`);
            const ans = await res.json();
            return ans ? ans : 0;
        } catch (error) {
            console.error(`Error fetching money for branch ${branch_id}: `, error);
            return 0;
        }
    }

    return (
        <div>
            <button className="myButton" onClick={() => navigate('/menu')}>
                <img src={menue} id="menueimg" alt="Edit Menu" />
            </button>
            <p className="sum">{total + '$'}</p>
            {branches.map((branch, index) => (
                <div key={index} className='branchmoney'>
                    <p className="pinadmin">{branch.name}</p>
                    <p className="pinadmin">{branch.sum + '$'}</p>
                </div>
            ))}
        </div>
    );
}

export default Admin;
