import { useRef, useState } from "react";
import { getColdMail } from "../shared/api/cold-mail-service";

export default function Dashboard() {
    const formRef = useRef(null);
    const [isLoading, setLoadingState] = useState<boolean>(false);
    const [result, setResult] = useState<String>('');

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const info = e.target[0].value;
        setLoadingState(true);
        const result = await getColdMail(info);
        setResult(result);
        setLoadingState(false);
    }

    const onRestart = () => {
        setResult("");
    }

    return (
        <>
            <div style={{
                minHeight: '20rem',
                width: '40rem',
                backgroundColor: 'InfoBackground',
                padding: '2rem',
                borderRadius: '2rem'
            }}>
                {result.length == 0 ?
                    <form ref={formRef} onSubmit={onSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}>
                        <h2>Enter about your buisness here</h2>
                        <textarea cols={10} rows={10}></textarea>
                        <button type="submit" disabled={isLoading}>Submit</button>
                    </form> :
                    <div>
                        <p>{result}</p>
                        <button onClick={onRestart}>Restart</button>
                    </div>}
            </div>
        </>
    );
}