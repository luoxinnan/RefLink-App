import TextInput from "../components/TextInput";
import Alert from "../components/Alert";
import { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postCandidate } from "../services/candidateServices";

export default function AddCandidateForm() {
    const [showAlertAdded, setShowAlertAdded] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { guid } = useParams();

    const candidateMutation = useMutation({
        mutationFn: postCandidate,
        onSuccess: (data) => {
            console.log("success")
        },
    });

    async function handleAdd(data) {
        console.log(data);
        const candidateRequest = {
            name: data.name,
            email: data.email,
            postingGuid: guid
        }

        console.log(candidateRequest)

        candidateMutation.mutate(candidateRequest)

        setShowAlertAdded(true);
        setTimeout(() => {
            setShowAlertAdded(false);
            navigate("/postings");
        }, 3000);
    }

    return (
        <>
            {showAlertAdded && (
                <Alert alertType="alert-success" alertContent="Email for adding referencers has been sent!" />
            )}
            <div className="text-sm breadcrumbs mb-10">
                <ul>
                    <Link to="/"><li><a>Home</a></li></Link>
                    <Link to="/postings"><li><a href="/postings">Postings</a></li></Link>

                    
                    <li className=" font-bold">Add candidate</li>
                </ul>
            </div>
            <div className="flex flex-col items-center justify-center animate-fade-up animate-duration-[400ms]">
                <h2 className="text-xl mb-8 text-center">Add a Candidate to Posting</h2>
                <form onSubmit={handleSubmit(handleAdd)} className="w-full md:w-3/4 lg:w-2/3">
                    <TextInput register={register} inputType="name" labelText="Name" placeholder="Candidate name" name="name" />
                    <TextInput register={register} inputType="email" labelText="Email" placeholder="Candidate email" name="email" />

                    <button type="submit" className='btn btn-neutral btn-sm mr-2 w-20'> Add</button>
                    <button className="btn bth-neutral btn-outline btn-sm mr-2 w-20 " onClick={() => navigate("/postings")}>Cancel</button>
                </form>
            </div>

        </>
    )
}