import React, { useState } from "react";
import { supabase } from "../client";
import { TextField } from "@mui/material";

const AddInstructor = () => {
    const [instructorData, setInstructorData] = useState({
        name: "",
        surname: "",
        email: "",
        cnp: "",
        phone: "",
        address: "",
        password: "",
    });
    const handleChange = (event) => {
        setInstructorData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { instructorData, error } = await supabase
            .from("instructors")
            .insert([
                {
                    ...instructorData,
                }
            ]);
        if (error) {
            alert("Error adding instructor: " + error.message);
        } else {
            alert("Instructor added successfully");
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={instructorData.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Surname"
                    name="surname"
                    value={instructorData.surname}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={instructorData.email}
                    onChange={handleChange}
                />
                <TextField
                    label="CNP"
                    name="cnp"
                    value={instructorData.cnp}
                    onChange={handleChange}
                />
                <TextField
                    label="Phone"
                    name="phone"
                    value={instructorData.phone}
                    onChange={handleChange}
                />
                <TextField
                    label="Address"
                    name="address"
                    value={instructorData.address}
                    onChange={handleChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    value={instructorData.password}
                    onChange={handleChange}
                />
                <button type="submit">Add Instructor</button>
            </form>
        </div>
    );
};
export default AddInstructor;