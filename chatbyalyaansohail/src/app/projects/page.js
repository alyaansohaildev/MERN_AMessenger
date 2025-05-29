'use client';
import { useEffect,useState } from "react";
import styles from "./projects.module.css";
import Link from 'next/link';
export default function Home() {

    const [data, setData] = useState(null);
    const [loading, SetLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:5000/api/myprojects')
        .then(res => res.json())
        .then (json => {
            setData(json)
            SetLoading(false)
        })
    },[])
  
    if(loading) return <div className={styles.center_div}>Fetching Data</div>
    return (
        <div className="padding_2x">
        
        

        <h3>Projects List</h3>
        <div>
            {
            data['message'].map(projectName => (
                    <div key={projectName.id}>
                        {projectName.name}

                        <Link href={projectName.link}>
                            <button>Go to {projectName.link}</button>
                        </Link>
                    </div>
                    )
                )
            }
        </div>

            <pre>
                {JSON.stringify(data['message'])}
            </pre>
        </div>

        
    );
  }