import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ url: "", user: "", pass: "" })
    const [data, setData] = useState([])
    const [val, setval] = useState("")
    useEffect(() => {
        let p = localStorage.getItem("passwords")
        if (p) {
            setData(JSON.parse(p))
        }
    }, [])

    const savePassword = () => {

        if (form.url.length > 2 && form.user.length > 2 && form.pass.length > 2) {
            setData([...data, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...data, { ...form, id: uuidv4() }]))
            setForm({ url: "", user: "", pass: "" })
            // console.log([...data, { ...form, id: uuidv4() }])
            toast.success('Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            let str = ''
            if (form.url.length < 2) {
                str += "{ URL Invalid } "
            }
            if (form.user.length < 2) {
                str += "{ UserName Invalid } "
            }
            if (form.pass.length < 2) {
                str += "{ Password Invalid }"
            }
            setval(str)
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setval("")
    }
    const copyText = (text) => {
        toast.success('Copied To Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }
    const del = (id) => {
        let c = confirm("Are You Sure To Delete This Password")
        if (!c) return;
        setData(data.filter(i => i.id != id))
        localStorage.setItem("passwords", JSON.stringify(data.filter(i => i.id != id)))
        toast.success('Delete Succesfull', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const edit = (id) => {
        let x = data.filter(i => i.id == id)
        // setForm({
        //     url: x[0].url,
        //     user: x[0].user,
        //     pass: x[0].pass
        // })
        setForm(x[0])
        del(id)

    }

    return (

        <main className="w-full">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <ToastContainer />
            <div className="border-[px] rounded-lg border-green-500 w-full md:w-3/4 mx-auto">
                <div className="upp flex flex-col items-center ">
                    <span className="text-lg">Password <span className="text-green-600">Manager</span></span>
                    <span className="text-lg">Your Passwords are Save With US
                    </span>
                    <span className="text-lg">        Create and Start Adding Passwords
                    </span>
                </div>
                <div className="lower flex flex-col items-center gap-2 m-3">
                    <div className="cc flex flex-col items-start gap-2 m-3 w-full ml-10">
                        <input value={form.url} onChange={handleChange} className=" p-1  border-2 border-green-600 rounded-full px-2 w-8/12 pl-3" name="url" type="text" placeholder="Web Site URl" />
                        <input value={form.user} onChange={handleChange} className=" p-1  border-2 border-green-600 rounded-full px-2 w-6/12 mr-2 pl-3" name="user" type="text" placeholder="UserName" />
                        <input value={form.pass} onChange={handleChange} className=" p-1 border-2 border-green-600 rounded-full px-2 w-6/12 pl-3" name="pass" type="password" placeholder="Password" />
                        <p className="self-center text-sm text-red-500">{val}</p>
                    </div>


                    <div className="">
                        <button onClick={savePassword} className="p-1  flex gap-4  max-w-full items-center border-2 border-green-600 rounded-full bg-green-400 text-white px-5 py-1 hover:bg-green-300">
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                            >
                            </lord-icon>
                            SAVE
                        </button>
                    </div>
                </div>
                <div className="tbl mt-10 mx-2 ">
                    <p className="text-center
                     text-lime-800">Your Passwords</p>
                    {data.length === 0 && <div className="text-center "> NO Passwords ^_____^</div>}
                    {data.length !== 0 &&
                        <table className="mx-auto w-full overflow-hidden rounded-md border-2 border-black">
                            <thead className="bg-green-700 text-white ">
                                <tr className="border-2 border-white ">
                                    <th className="border-2 border-white w-1/3">URL</th>
                                    <th className="border-2 border-white w-1/3">UserName</th>
                                    <th className="border-2 border-white w-1/3" >Password</th>
                                    <th className="border-2 border-white px-3" >Action</th>
                                </tr>

                            </thead>
                            <tbody className="bg-green-200">
                                {data.map((e, idx) => {
                                    return <tr key={idx}>
                                        <td className="text-center border-2 border-white w-1/3" ><div className="px-2 flex items-center justify-between"> {e.url} <button onClick={() => { copyText(e.url) }}><lord-icon
                                            src="https://cdn.lordicon.com/xpgofwru.json"
                                            trigger="hover"
                                            style={{ "width": "15px", "height": "15px" }}>
                                        </lord-icon></button></div></td>
                                        <td className="text-center border-2 border-white w-1/3" ><div className="px-2 flex items-center justify-between"> {e.user} <button onClick={() => { copyText(e.user) }}><lord-icon
                                            src="https://cdn.lordicon.com/xpgofwru.json"
                                            trigger="hover"
                                            style={{ "width": "15px", "height": "15px" }}>
                                        </lord-icon></button></div></td>
                                        <td className="text-center border-2 border-white w-1/3" ><div className="px-2 flex items-center justify-between"> {e.pass} <button onClick={() => { copyText(e.pass) }}><lord-icon
                                            src="https://cdn.lordicon.com/xpgofwru.json"
                                            trigger="hover"
                                            style={{ "width": "15px", "height": "15px" }}>
                                        </lord-icon></button></div></td>
                                        <td className=" border-2 border-white text-center " >
                                            <button className="mx-1" onClick={() => { edit(e.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/ifsxxxte.json"
                                                    trigger="hover"
                                                    style={{ "width": "15px", "height": "15px" }}>
                                                </lord-icon>
                                            </button>
                                        
                                            <button className="mx-1" onClick={() => { del(e.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "15px", "height": "15px" }} >
                                                </lord-icon>
                                            </button>

                                        </td>
                                    </tr>
                                })
                                }

                            </tbody>
                        </table>}
                </div>
            </div>
        </main>
    )
}

export default Manager
