import React, { useState } from 'react'
import { useUpdateRoleMutation, useDeleteUserMutation } from '../../features/User/userDataApiSlice'
import { updateOrderEmail } from '../../features/Products/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const TableData = ({ user, setStatus }) => {
    const [role, setRole] = useState(user.role)
    const [update, { status, isError, isSuccess }] = useUpdateRoleMutation()
    const [deleteuser] = useDeleteUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = '650dbef5fb1f4776ca9b58f4'

    const handleDeleteUSer = async (id) => {
        if(id == admin){
            alert('Not allowed')
        }else{
            alert('Deleting')
            try {
                const response = await deleteuser({id,email : user.email});
                // console.log(response)
                // alert('Data Deleted Successfully')
                
            } catch (err) {
                console.log(err)
                if (err.originalStatus === 405) {
                    alert('Not Allowed')
    
                } else if (err.originalStatus === 200) {
                    alert('Data deleted Successfully')
                }
            } 
        }
   
    }
    const handleRole = (e) => {
        const role = e.target.value;
        setRole(role)

    }
    const updateRole = async (id) => {
        if(id == admin){
            alert('Not allowed')
        }else{
            alert('Updating')
            try {
                const response = await update({ role, id: id }).unwrap();
                
    
            } catch (err) {
                if (err.originalStatus === 405) {
                    alert('Not Allowed')
    
                } else if (err.originalStatus === 200) {
                    alert('Data Updated Successfully')
                }
    
            }
        }
       
    }
    const handleSeeOrders = (email) =>{
        dispatch(updateOrderEmail(email));
        navigate('/home/orderspage/adminusers')
        
    }
    return (
        <tr>
            <th scope='row'>{(user._id).slice(3, 6)}</th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td><select
                value={role}
                onChange={(e) => handleRole(e)}
            >

                <option value='admin'>Admin</option>
                <option value='user'>User</option>
            </select>
            </td>
            
            <td><button className='btn btn-danger' onClick={() => handleDeleteUSer(user._id)}>Delete User</button></td>
            <td><button className='btn btn-info' onClick={()=>updateRole(user._id)}>Update Role</button></td>
            <td><button className='btn btn-info' onClick={()=>handleSeeOrders(user.email)}>See Orders</button></td>
        </tr>
    )
}

export default TableData