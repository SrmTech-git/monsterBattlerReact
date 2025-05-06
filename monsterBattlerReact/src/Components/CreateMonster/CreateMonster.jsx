import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateMonster.module.css";

function CreateMonster() {
    const [monsterId, setMonsterId] = useState(""); 
    const [typeOne, setTypeOne] = useState("NORMAL"); 
    const [health, setHealth] = useState(100);
    const [physicalAttack, setPhysicalAttack] = useState(100);
    const [rangedAttack, setRangedAttack] = useState(100);
    const [physicalDefense, setPhysicalDefense] = useState(100);
    const [rangedDefense, setRangedDefense] = useState(100);
    const [speed, setSpeed] = useState(100);
    const [image, setImage] = useState("");
    const [formData, setFormData] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const payload = {
            monsterId: monsterId,
            typeOne: typeOne,
            typeTwo: null,
            base64Image: image,
            baseStats: {
                health: health,
                physicalAttack: physicalAttack,
                rangedAttack: rangedAttack,
                physicalDefense: physicalDefense,
                rangedDefense: rangedDefense,
                speed: speed
            },
            abilityPool: null,
            movePool: null
        };

        setFormData(payload);

        try {
            const response = await axios.post("http://localhost:8080/monsters/create/base", payload);
            console.log("Monster created successfully:", response.data);
            // Show success notification
            setNotification({
                show: true,
                message: `Monster ${monsterId} was created successfully!`,
                type: "success"
            });
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                setNotification({ show: false, message: "", type: "" });
            }, 3000);
        } catch (error) {
            console.error("Error creating monster:", error);
            // Show error notification
            setNotification({
                show: true,
                message: `Error creating monster: ${error.response?.data?.message || error.message}`,
                type: "error"
            });
            
            // Hide notification after 5 seconds
            setTimeout(() => {
                setNotification({ show: false, message: "", type: "" });
            }, 5000);
        }
    };

    // Custom file upload handler using FileReader API
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create Monster</h1>
            
            <div className={styles.previewContainer}>
                <h3 className={styles.previewTitle}>Preview Data:</h3>
                <pre className={styles.preview}>
                    {formData ? JSON.stringify(formData, null, 2) : "No data submitted yet"}
                </pre>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Monster ID:</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={monsterId}
                        onChange={(e) => setMonsterId(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Type:</label>
                    <select
                        className={styles.input}
                        value={typeOne}
                        onChange={(e) => setTypeOne(e.target.value)}          
                    >
                        <option value="NORMAL">NORMAL</option>
                        <option value="FIRE">FIRE</option>
                        <option value="WATER">WATER</option>
                        <option value="ELECTRIC">ELECTRIC</option>
                        <option value="GRASS">GRASS</option>
                        {/* Add more types as needed */}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Health:</label>
                    <input
                        className={styles.input}
                        type="number"
                        value={health}
                        onChange={(e) => setHealth(Number(e.target.value))}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Physical Attack:</label>
                    <input
                        className={styles.input}
                        type="number"
                        value={physicalAttack}
                        onChange={(e) => setPhysicalAttack(Number(e.target.value))}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ranged Attack:</label>
                    <input
                        className={styles.input}
                        type="number"
                        value={rangedAttack}
                        onChange={(e) => setRangedAttack(Number(e.target.value))}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Physical Defense:</label>
                    <input
                        className={styles.input}
                        type="number"
                        value={physicalDefense}
                        onChange={(e) => setPhysicalDefense(Number(e.target.value))}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ranged Defense:</label>
                    <input
                        className={styles.input}
                        type="number"
                        value={rangedDefense}
                        onChange={(e) => setRangedDefense(Number(e.target.value))}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Speed:</label>
                    <input
                        className={styles.input}
                        type="number"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Monster Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={styles.input}
                    />
                </div>

                {image && (
                    <div className={styles.imagePreview}>
                        <h4>Image Preview:</h4>
                        <img 
                            src={image} 
                            alt="Monster preview" 
                            className={styles.previewImage}
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    </div>
                )}

                <button type="submit" className={styles.button}>Create Monster</button>

                {notification.show && (
                    <div className={`${styles.notification} ${styles[notification.type]}`}>
                        {notification.message}
                    </div>
                )}
            </form>
        </div>
    );
}

export default CreateMonster;