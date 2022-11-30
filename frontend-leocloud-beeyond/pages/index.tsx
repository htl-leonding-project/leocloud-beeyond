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
            <div className={"w-1/5 flex items-center justify-center h-full"}>
                <div className={"flex-row"}>
                    <div className={"cursor-pointer"}>
                        <Image src={"/assets/arrow-left.svg"} alt={"arrow-left"} width={48} height={48} priority={true}/>
                    </div>
                    <div className={"cursor-pointer"}>
                        <Image src={"/assets/arrow-right.svg"} alt={"arrow-right"} width={48} height={48}/>
                    </div>
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