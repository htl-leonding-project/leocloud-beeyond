import ListItem from "../components/ListItem";
import Image from "next/image";

export default function Home() {
    return (
        <div className={"flex h-screen p-8"}>
            <div className={"w-2/5 bg-white shadow-md rounded-lg overflow-auto"}>
                <ListItem name={"Test1"}/>
                <ListItem name={"Test2"}/>
                <ListItem name={"Test3"}/>
            </div>
            <div className={"w-1/5 flex-col h-full"}>
                <div className={"h-1/3"}></div>
                <div className={"h-1/3 flex flex-col justify-center items-center"}>
                    <div className={"cursor-pointer"}>
                        <Image src={"/assets/arrow-left.svg"} alt={"arrow-left"} width={48} height={48} priority={true}/>
                    </div>
                    <div className={"cursor-pointer"}>
                        <Image src={"/assets/arrow-right.svg"} alt={"arrow-right"} width={48} height={48}/>
                    </div>
                </div>
                <div className={"h-1/3 flex justify-center items-end"}>
                    <button className={"font-medium text-white bg-primary rounded-lg shadow-md hover:bg-secondary hover:text-black p-4"}>DOWNLOAD</button>
                </div>
            </div>
            <div className={"w-2/5 bg-white shadow-md rounded-lg overflow-auto"}>
                <ListItem name={"Test1"}/>
                <ListItem name={"Test2"}/>
                <ListItem name={"Test3"}/>
            </div>
        </div>
    )
}