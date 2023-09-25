import { useEffect, useState } from "react";
import CoffeeHead from "@/components/CoffeeHead";
import Link from "next/link";

export default function Home() {
    const [housesData, setHousesData] = useState([]);

    const fetchData = async () => {
        const res = await fetch(
            "https://wizard-world-api.herokuapp.com/Houses"
        );
        const data = await res.json();

        setHousesData(data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <CoffeeHead
                title={"Houses of Hogwarts"}
                description={"A Next.js app to list the houses of Hogwarts"}
                image={`${process.env.NEXT_PUBLIC_SITE_URL}/Hogwarts-Houses.jpg`}
                page_url={process.env.NEXT_PUBLIC_SITE_URL}
            />
            <h1 className="text-2xl font-bold text-center my-4">
                Houses of Hogwarts
            </h1>

            <ul className="space-y-2 max-w-md m-auto">
                {housesData.map((house) => (
                    <Link
                        key={house.id}
                        href={`/houses/${house.id}`}
                        className="flex flex-col p-3 bg-white text-black border rounded"
                    >
                        <p>{house.name}</p>
                        <p className="text-sm text-gray-600">
                            Founder: {house.founder}
                        </p>
                    </Link>
                ))}
            </ul>
        </>
    );
}
