import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import menue from '../img/edit.jpg'

function Admin() {
    //display of the orders prices of all the branches.
    //1. fetch the branches details in an [].
    //2. for each branch to sum how much money did he make and display it.
    //3. to write the finel sum of the whole branches.
    //button to edit the menue and control the sales.

    const [branchList, setBranchList] = useState([])
    const [branchMoney, setBranchMoney] = useState([])//[sum, sum, ...]
    const [total, settotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {



        async function branchmoney(branch_id) {
            await (fetch(`http://localhost:3600/admin/get_branch_money/${branch_id}`)
                .then(res => res.json())
                //res = [price, price, ...]
                .then(
                    ans => {
                        console.log('ans' + ans)
                        let sum = 0
                        let temp = JSON.parse(ans)
                        console.log(temp)
                        temp.map(a => {
                            console.log(a)
                            sum = sum + a.price
                        })
                        console.log('sum' + sum)

                        let current = branchMoney
                        if (!(current.length > 6)) {
                            console.log('current' + current)
                            current.push(sum)
                            console.log('current' + current)
                            setBranchMoney(current)
                        }


                    }
                )
            ).then(() => {
                let temp = branchMoney
                let sum = 0
                branchMoney.map((a, i) => {
                    sum += a
                })
                console.log(sum)
                settotal(sum)
            }
            )
        }
        async function getBraches() {
            fetch(`http://localhost:3600/branches/info`)
                .then(res => res.json())
                //ans = [{branch name, branch id}]
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    setBranchList(temp)
                    console.log(temp)

                    temp.map((a, i) => {
                        console.log(a)
                        branchmoney(a.id)
                    })
                })
        }
        getBraches()



    }, [])

    return (
        <div>
            <button className="myButton" onClick={() => { navigate('/menue') }}><img src={menue} id="menueimg" /></button>
            <p className="sum">{total + '$'}</p>
            {branchList.map((a, i) => {
                console.log(branchMoney[i] + a.name)
                return (
                    <div key={i} className='branchmoney'>
                        <p className="pinadmin">{a.name}</p>
                        <p className="pinadmin">{branchMoney[i] + '$'}</p>
                    </div>
                )
            })}

        </div>
    )
}
export default Admin;