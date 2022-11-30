export default function ListItem({ name }: {
    name: string;
}) {
    return (
        <div className={"rounded-lg cursor-pointer hover:bg-secondary p-4"}>
            <div className={"font-medium"}>{name}</div>
        </div>
    )
}