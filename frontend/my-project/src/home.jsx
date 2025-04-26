import { useState } from "react"
import axios from "axios"



function Home(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState("");
    const [err, setErr] = useState("");

    const emailCheck = /^[A-Za-z0-9]+[A-Za-z0-9._%-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


    let handlesubmit=(e)=>{
        e.preventDefault();
        if(!email.match(emailCheck)){
            setErr("enter valid email");
        }
        else{
            axios.post("http://localhost:9000/done", {name, email, feedback}, {withCredentials:true})
        .then(Response=>{
            console.log(Response.data);
            if(Response.data=="success"){
                console.log(submitted)
                setSubmitted("feedback submitted Thank you")
            }
        }).catch(Error=>{
            console.log(Error);
        })
        }
    }


    return(
        <>
            <form onSubmit={(e)=>handlesubmit(e)}>
                <div className="name">
                    <input className="in-name"
                    placeholder="enter your name"
                    required
                    type="text"
                    onChange={(e)=>setName(e.target.value)}
                    >
                    </input>
                </div>
                <div className="email">
                    <input className="in-email"
                    placeholder="enter your email"
                    required
                    type="text"
                    onChange={(e)=>setEmail(e.target.value)}
                    >
                    </input>
                    <span className="in-emailspan">
                        {err}
                    </span>
                </div>
                <div className="feedback">
                    <input className="in-feedback"
                    placeholder="please give your feedback"
                    required
                    type="text"
                    onChange={(e)=>setFeedback(e.target.value)}
                    >
                    </input>
                </div>
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export default Home
