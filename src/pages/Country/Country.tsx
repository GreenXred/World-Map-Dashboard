import { useParams } from "react-router-dom";

export default function Country() {
    const { code } = useParams();

    return (
        <div className="flex items-center justify-center">
            <h1 className="text-3xl text-emerald-300 font-bold">
                Страна: {code}
            </h1>
        </div>
    );
}
