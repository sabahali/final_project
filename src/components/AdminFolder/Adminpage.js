import { useRef, useState } from 'react'
import { useGetUsersQuery } from '../../features/User/userDataApiSlice'
import { useSelector } from 'react-redux';
import TableData from './TableData';
const Adminpage = () => {
  const { data, isLoading, isFetching } = useGetUsersQuery()
  const [status,setStatus] = useState(null);
  const statusRef = useRef(null)
  const currentUserRole = useSelector(state=>state.auth.role)
  const handleTest = () => {
    console.log(data)
  }

  return (
    <div>
      {currentUserRole == 'admin' ? <> 
      {/* <button onClick={handleTest}>TEST</button> */}
      {status ? <p> Status : {status}</p> : ''}
      {isLoading ? <p>Loading</p> : isFetching ? <p>Please Wait</p> : <>

        <div className='container mt-4 table-responsive'>
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Delete User</th>
                <th scope="col">Update Role</th>
                <th scope="col">Profile</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user)=>(
              <TableData user = {user} key= {user._id} status ={status} setStatus = {setStatus}/>
              
            ))}
            </tbody>
          </table>
        </div>



      </>}
      
      </> : <div className='d-flex align-items-center justify-content-center p-4 w-100 ' style={{width :'100vw',minHeight : '80vh'}}> 
              <p className='display-1'>You are not Authorized</p>
      
      </div>}
      



    </div>
  )
}

export default Adminpage