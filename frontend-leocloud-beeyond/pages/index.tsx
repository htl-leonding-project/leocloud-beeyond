import ListItem from "../components/ListItem";

export default function Home() {
    return (
        <div className={"flex h-screen p-8"}>
            <div className={"w-2/5 bg-white shadow-md rounded-lg overflow-auto"}>
                <ListItem name={"Test1"}/>
                <ListItem name={"Test2"}/>
                <ListItem name={"Test3"}/>
            </div>
            <div className={"w-1/5"}></div>
            <div className={"w-2/5"}></div>
        </div>
    )
}
