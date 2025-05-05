import React, { useState } from "react";
import axios from "axios";

function CreateMonster() {
    const [name, setName] = useState("");
    const [level, setLevel] = useState(1);
    const [health, setHealth] = useState(100);
    const [physicalAttack, setPhysicalAttack] = useState(100);
    const [rangedAttack, setRangedAttack] = useState(100);
    const [physicalDefense, setPhysicalDefense] = useState(100);
    const [rangedDefense, setRangedDefense] = useState(100);
    const [speed, setSpeed] = useState(100);
    const [formData, setFormData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            level,
            health,
            physicalAttack,
            rangedAttack,
            physicalDefense,
            rangedDefense,
            speed,
        };
        
        setFormData(payload);

        try {
            const response = await axios.post("http://localhost:8080/monsters/create", payload);
            console.log("Monster created successfully:", response.data);
        } catch (error) {
            console.error("Error creating monster:", error);
        }
    };

    return (
        <>
        <div>
            <p>{formData ? JSON.stringify(formData, null, 2) : "No data submitted yet"}</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>  

            <div>
                <label>Level:</label>
                <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}          
                />
            </div>

            <div>
                <label>Health:</label>
                <input
                    type="number"
                    value={health}
                    onChange={(e) => setHealth(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Physical Attack:</label>
                <input
                    type="number"
                    value={physicalAttack}
                    onChange={(e) => setPhysicalAttack(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Ranged Attack:</label>
                <input
                    type="number"
                    value={rangedAttack}
                    onChange={(e) => setRangedAttack(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Physical Defense:</label>
                <input
                    type="number"
                    value={physicalDefense}
                    onChange={(e) => setPhysicalDefense(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Ranged Defense:</label>
                <input
                    type="number"
                    value={rangedDefense}
                    onChange={(e) => setRangedDefense(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Speed:</label>
                <input
                    type="number"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                />
            </div>
            <button type="submit">Create Monster</button>
        </form>
        </>
    );
}

export default CreateMonster;